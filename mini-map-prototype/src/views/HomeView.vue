<script setup lang="ts">
import { useArcadesDemo } from '@stores/arcadeStore';
import { useSettings } from '@stores/settingsStore';
import Map from '@components/Map.vue';
import SettingsCard from '@components/SettingsCard.vue';
import { useGeolocation } from '@vueuse/core';
import { storeToRefs } from 'pinia';

const settings = useSettings();
const { enableDemoMode } = storeToRefs(settings);

const arcadesDemo = useArcadesDemo();

const isLoading = ref(true);

// get location perms and then resolve the user's current position
const { coords, locatedAt, error, resume, pause } = useGeolocation({
  enableHighAccuracy: true,
  // if this isn't specified, then the error handler will never be called
  timeout: 1000,
  // disable cache
  maximumAge: 0,
});

const currentPosition = computed(() => {
  return {
    x: coords.value.latitude === Infinity ? 0 : coords.value.latitude,
    y: coords.value.longitude === Infinity ? 0 : coords.value.longitude,
  };
});

const pointsOfInterest = ref<PointOfInterest[]>([]);

onMounted(async () => {
  resume();

  if (error.value) {
    console.warn('failed to resolve position!');
    console.error(error.value);
  }

  if (coords.value.latitude === Infinity || coords.value.longitude === Infinity) {
    console.error('failed to resolve position! lat/long was infinity');
  }

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
  isLoading.value = false;
});

// the demo centers on the continent of Japan and shows various arcardes as Points of Interest (PoI's)
const mapConfig = ref({
  pointsOfInterest: arcadesDemo.features,
  zoom: 6,
});

const center = computed<Coordinate>(() =>
  enableDemoMode.value
    ? {
        x: 38,
        y: 139.69,
      }
    : currentPosition.value,
);
</script>

<template>
  <main>
    <div class="stack">
      <SettingsCard :enable-demo="settings.enableDemoMode" @update:enable-demo="settings.toggleDemoMode()" />
      <Map
        v-if="!isLoading"
        :points-of-interest="mapConfig.pointsOfInterest"
        :zoom="mapConfig.zoom"
        :center="center"
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
