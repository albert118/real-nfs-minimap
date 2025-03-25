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

const currentPosition = ref<Coordinate>({ x: 0, y: 0 });
const currentPositionPoi = ref<PointOfInterest>();
const pointsOfInterest = computed<PointOfInterest[]>(() => (enableDemoMode.value ? arcadesDemo.features : [currentPositionPoi.value]));

const center = computed<Coordinate>(() =>
  enableDemoMode.value
    ? {
        x: 38,
        y: 139.69,
      }
    : currentPosition.value,
);

watch(coords, () => {
  isLoading.value = true;

  resume();

  currentPosition.value = {
    x: coords.value.latitude === Infinity ? 0 : coords.value.latitude,
    y: coords.value.longitude === Infinity ? 0 : coords.value.longitude,
  };

  currentPositionPoi.value = {
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
  };

  // console.log('currentPositionPoi.value', currentPositionPoi.value.geometry.coordinates);

  pause();
  isLoading.value = false;
});

onMounted(async () => {
  if (error.value) {
    console.warn('failed to resolve position!');
    console.error(error.value);
  }

  if (coords.value.latitude === Infinity || coords.value.longitude === Infinity) {
    console.error('failed to resolve position! lat/long was infinity');
  }

  isLoading.value = false;
});
</script>

<template>
  <main>
    <div class="stack">
      <SettingsCard :enable-demo="settings.enableDemoMode" @update:enable-demo="settings.toggleDemoMode()" />
      <Map
        v-if="!isLoading"
        :points-of-interest="pointsOfInterest"
        :zoom="6"
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
