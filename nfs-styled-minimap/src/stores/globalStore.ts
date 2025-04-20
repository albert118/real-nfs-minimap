import { defineStore } from 'pinia';
import { useGeolocation } from '@vueuse/core';
import { type Ref } from 'vue';

export interface GlobalStoreState {
  logger: Logger;
  currentLocation: Ref<Coordinate>;
  init: () => void;
}

export const useGlobalStore = defineStore('globalStore', () => {
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
      console.warn('failed to resolve position!');
      console.error(error.value);
    }

    if (coords.value.latitude === Infinity || coords.value.longitude === Infinity) {
      console.error('failed to resolve position! lat/long was infinity');
    }

    pause();

    currentLocation.value = {
      x: coords.value.latitude,
      y: coords.value.longitude,
    };
  };

  function init() {
    setCurrentLocation();
  }

  return {
    currentLocation,
    init,
  } as GlobalStoreState;
});
