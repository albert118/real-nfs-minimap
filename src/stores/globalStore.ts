import { defineStore } from 'pinia';
import { useGeolocation } from '@vueuse/core';
import Logger from 'js-logger';
import { useDebounceFn } from '@vueuse/core';
import { GlobalError } from '@domain-types/errors';
import type { Coordinate } from '@domain-types/map-types';

export interface GlobalState {
    /**
     * This should only be called off of a user interaction (ie. button click), otherwise it will throw a Violation warning and
     * fail to resolve the current location.
     */
    setCurrentLocation: () => void;

    currentLocation: Ref<Coordinate>;

    init: () => void;

    /**
     * Clears the current application and web worker caches.
     *
     * @returns a hook to clear the caches and a loading ref
     */
    onClearCache: () => {
        clear: () => Promise<void>;
        loading: Ref<boolean>;
    };

    errors: Ref<GlobalError[]>;
    hasErrored: Ref<boolean>;
    clearErrors: () => void;
}

export const useGlobal = defineStore('global', () => {
    const errors = ref<GlobalError[]>([]);

    const hasErrored = computed(() => errors.value.length > 0);

    const clearErrors = useDebounceFn(
        () => {
            Logger.debug('Clearing errors...');
            errors.value = [];
        },
        500,
        { maxWait: 1000 },
    );

    const currentLocation = ref<Coordinate>();

    // get location perms and then resolve the user's current position
    const { coords, error, resume, pause } = useGeolocation({
        enableHighAccuracy: true,
        // if this isn't specified, then the error handler will never be called
        timeout: 1000,
        // disable cache
        maximumAge: 0,
    });

    const setCurrentLocation = () => {
        resume();

        if (error.value) {
            Logger.warn('Failed to resolve the current location!');
            Logger.error(error.value);
        }

        if (
            coords.value.latitude === Infinity ||
            coords.value.longitude === Infinity
        ) {
            Logger.error('Failed to resolve position! lat/long was infinity');
        }

        pause();

        currentLocation.value = {
            x: coords.value.latitude,
            y: coords.value.longitude,
        };
    };

    function init() {
        Logger.useDefaults();
        Logger.setLevel(Logger.DEBUG);
        Logger.time('Global store initialised');

        Logger.timeEnd('Global store initialised');
    }

    function onClearCache() {
        const loading = ref<boolean>(false);

        const clear = async () => {
            loading.value = true;
            Logger.debug('Clearing caches...');

            try {
                // clear web worker caches
                const cacheKeys = await caches.keys();
                cacheKeys.forEach(l => caches.delete(l));
            } catch (error: any) {
                errors.value.push(new GlobalError(error as Error));
            }

            loading.value = false;
        };

        return {
            clear: useDebounceFn(clear, 200),
            loading,
        };
    }

    return {
        setCurrentLocation,
        currentLocation,
        init,
        onClearCache,
        errors,
        hasErrored,
        clearErrors,
    } as GlobalState;
});
