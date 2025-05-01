<script setup lang="ts">
import { useSettings } from '@stores/settingsStore';
import Map from '@components/Map.vue';
import SettingsCard from '@components/SettingsCard.vue';
import { useGeolocation } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useArcadesDemo } from '@stores/arcadeStore';
import { useMap } from '@stores/mapStore';

const settings = useSettings();
const { enableDemoMode } = storeToRefs(settings);

// load the demo-dataset...
const arcadesDemo = useArcadesDemo();
// ... and default to it immediately
const features = ref<PointOfInterest[]>(arcadesDemo.features.slice(0, 20));

// this is contrived currently, but I want to load the map with data
// rather than get a map that figures out its data (let the map just figure out mapping and ignore data)
const map = useMap();
map.setFeatures(features.value);

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

const center = ref<Coordinate>({
  x: 38,
  y: 139.69,
});

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

  pause();
  isLoading.value = false;
});

const onToggleDemoMode = (newValue: boolean) => {
  enableDemoMode.value = newValue;
  features.value = enableDemoMode.value ? arcadesDemo.features : [];
  console.log('toggled demo mode! New features count:', features.value.length);
};

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

// private getPoiName(poi: PointOfInterest) {
//     if (poi.properties['name']) return poi.properties['name'];
//     if (poi.properties['name:en']) return poi.properties['name:en'];
//     return '<no name>';
//   }

const markersRef = useTemplateRef<HTMLInputElement[] | null>('markersRef');
</script>

<template>
  <main>
    <div class="stack">
      <SettingsCard :enable-demo="enableDemoMode" @update:enable-demo="(val) => onToggleDemoMode(val)" />
      <Map v-if="!isLoading" :zoom="6" :center="center" :markers-ref="markersRef">
        <template #markers>
          <div v-for="index in [...Array(features.length).keys()]" :key="`marker-#${index}`" :id="`marker-#${index}`" ref="markersRef" />
        </template>
      </Map>
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
