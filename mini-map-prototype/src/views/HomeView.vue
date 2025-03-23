<script setup lang="ts">
import { useArcadesDemo } from '@stores/arcadeStore';
import { useSettings } from '@stores/settingsStore';
import Map from '@components/Map.vue';
import SettingsCard from '@components/SettingsCard.vue';
import { useGeolocation } from '@vueuse/core';

const settings = useSettings();
const arcadesDemo = useArcadesDemo();

const currentPosition = ref<Coordinate | undefined>();
const pointsOfInterest = ref<PointOfInterest[]>([]);

onMounted(async () => {
  // get location perms and then resolve the user's current position
  const { coords, locatedAt, error, resume, pause } = useGeolocation({
    enableHighAccuracy: true,
    // if this isn't specified, then the error handler will never be called
    timeout: 1000,
    // disable cache
    maximumAge: 0,
  });

  resume();

  if (error.value) {
    console.warn('failed to resolve position!');
    console.error(error.value);
  }

  if (coords.value.latitude === Infinity || coords.value.longitude === Infinity) {
    console.error('failed to resolve position! lat/long was infinity');
  }

  // resolve the current position
  currentPosition.value = {
    x: coords.value.latitude,
    y: coords.value.longitude,
  };

  // the create a PoI for the user's location
  pointsOfInterest.value.push({
    type: 'Feature',
    properties: {
      name: 'You are here!',
      description: 'I know where you live',
    },
    geometry: {
      type: 'Point',
      coordinates: currentPosition.value,
    },
    id: '1722312876312',
  } as PointOfInterest);

  pause();
});

// the demo centers on the continent of Japan and shows various arcardes as Points of Interest (PoI's)
const mapConfig = computed(() => {
  return settings.enableDemoMode
    ? {
        pointsOfInterest: arcadesDemo.features,
        zoom: 6,
        center: {
          x: 38,
          y: 139.69,
        },
      }
    : {
        pointsOfInterest: pointsOfInterest.value,
        zoom: 6,
        center: currentPosition.value,
      };
});
</script>

<template>
  <main>
    <div class="stack">
      <SettingsCard :enable-demo="settings.enableDemoMode" @update:enable-demo="settings.toggleDemoMode()" />
      <Map
        :points-of-interest="mapConfig.pointsOfInterest"
        :zoom="mapConfig.zoom"
        :center="mapConfig.center"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
    </div>
  </main>
</template>

<style lang="css">
.stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
