import { defineStore } from 'pinia';
import { useGeolocation } from '@vueuse/core';
import { type Ref } from 'vue';
import Logger from 'js-logger';

export interface GlobalState {
    /**
     * This should only be called off of a user interaction (ie. button click), otherwise it will throw a Violation warning and
     * fail to resolve the current location.
     */
    setCurrentLocation: () => void;
    currentLocation: Ref<Coordinate>;
    init: () => void;
}

export const useGlobal = defineStore('global', () => {
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

    return {
        setCurrentLocation,
        currentLocation,
        init,
    } as GlobalState;
});
