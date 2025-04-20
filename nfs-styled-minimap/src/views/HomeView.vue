<script setup lang="ts">
import MiniMap from '@components/mini-map/MiniMap.vue';
import { useArcadesDemo } from '@stores/arcadeStore';
import { MapMarker } from '@components/markers/MapMarker';
import { useSpeedCamerasNsw } from '@stores/speedCamerasStore';
import { useGeolocation } from '@vueuse/core';

// load the datasets
const { features: arcadeFeatures } = useArcadesDemo();
const { features: speedCameraFeatures } = useSpeedCamerasNsw();

const markers = ref<Record<string, MapMarker>>({});
const locationPins = ref<Record<string, MapMarker>>({});

// get location perms and then resolve the user's current position
const { coords, error, resume, pause } = useGeolocation({
  enableHighAccuracy: true,
  // if this isn't specified, then the error handler will never be called
  timeout: 1000,
  // disable cache
  maximumAge: 0,
});

const japZoom = 6;
const japCenter: Coordinate = {
  x: 38,
  y: 139.69,
};

const center = ref<Coordinate>(japCenter);
const zoom = ref<number>(japZoom);

onMounted(async () => {
  await nextTick();

  locationPins.value = Object.fromEntries([['current-location-pin', new MapMarker(center.value)]]);
  // markers.value = Object.fromEntries(arcadeFeatures.map((f) => [f.id, new MapMarker(f.geometry.coordinates)]));
});

const getCurrentCenter = () => {
  resume();

  if (error.value) {
    console.warn('failed to resolve position!');
    console.error(error.value);
  }

  if (coords.value.latitude === Infinity || coords.value.longitude === Infinity) {
    console.error('failed to resolve position! lat/long was infinity');
  }

  pause();

  return {
    x: coords.value.latitude,
    y: coords.value.longitude,
  };
};

const selectJapData = () => {
  console.log('selecting JAP data');
  center.value = japCenter;
  zoom.value = japZoom;
  // the coordinates for points need to be in [latitude, longitude] for markers
  // however, all of the points are stored in JSON as [longitude, latitude]
  // internally the marker swaps {x,y} to fix this, but the coordinate for center is stored correctly here
  // so we double reverse it XD
  locationPins.value = Object.fromEntries([['current-location-pin', new MapMarker({ y: japCenter.x, x: japCenter.y })]]);
  markers.value = Object.fromEntries(arcadeFeatures.map((f) => [f.id, new MapMarker(f.geometry.coordinates)]));
};

const selectAusData = () => {
  console.log('selecting AUS data');
  const currentCenter = getCurrentCenter();
  center.value = currentCenter;
  zoom.value = 12;
  locationPins.value = Object.fromEntries([['current-location-pin', new MapMarker({ y: currentCenter.x, x: currentCenter.y })]]);
  markers.value = Object.fromEntries(speedCameraFeatures.map((f) => [f.id, new MapMarker(f.geometry.coordinates)]));
};
</script>

<template>
  <main>
    <div class="stack">
      <div style="display: flex; gap: 2rem">
        <button @click.prevent="selectJapData">Select Japan demo data</button>
        <button @click.prevent="selectAusData">Select Australia demo data</button>
      </div>
      <MiniMap :center="center" :markers="markers" :zoom="zoom" :location-pins="locationPins" />
    </div>
  </main>
</template>
