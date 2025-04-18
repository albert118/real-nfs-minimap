<script setup lang="ts">
import MiniMap from '@components/MiniMap.vue';
import { useArcadesDemo } from '@stores/arcadeStore';
import { VueMarker } from '@stores/VueMarker';
import { useGeolocation } from '@vueuse/core';

// load the demo-dataset...
const { features } = useArcadesDemo();

// get location perms and then resolve the user's current position
const { coords, error, resume, pause } = useGeolocation({
  enableHighAccuracy: true,
  // if this isn't specified, then the error handler will never be called
  timeout: 1000,
  // disable cache
  maximumAge: 0,
});

const center = ref<Coordinate>({
  x: 38,
  y: 139.69,
});

onMounted(async () => {
  await nextTick();
  resume();

  if (error.value) {
    console.warn('failed to resolve position!');
    console.error(error.value);
  }

  if (coords.value.latitude === Infinity || coords.value.longitude === Infinity) {
    console.error('failed to resolve position! lat/long was infinity');
  }

  center.value = {
    x: coords.value.latitude,
    y: coords.value.longitude,
  };

  pause();
});
</script>

<template>
  <main>
    <div class="stack">
      <MiniMap :center="center" :markers="Object.fromEntries(features.map((f) => [f.id, new VueMarker(f.geometry.coordinates)]))" />
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
