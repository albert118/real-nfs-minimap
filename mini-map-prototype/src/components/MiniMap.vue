<script setup lang="ts">
import { MiniMap } from '@stores/MiniMap';
import type { VueMarker } from '@stores/VueMarker';

export interface MiniMapProps {
  center: Coordinate;
  markers?: Record<string, VueMarker>;
}

const { center, markers = {} } = defineProps<MiniMapProps>();

const mapRef = useTemplateRef<HTMLElement>('mapRef');
let miniMap: MiniMap | undefined = undefined;

const instance = getCurrentInstance();

onMounted(async () => {
  console.log('mouting minimap');
  await nextTick();

  if (!mapRef.value) {
    console.log('missing map ref');
    return;
  }

  if (!instance) {
    console.log('missing instance ref');
    return;
  }

  miniMap = new MiniMap(mapRef.value, instance, { center, zoom: 6, markers, verbose: true });
});

onUnmounted(() => {
  miniMap?.destroy();
});

const clearMarkers = () => {
  miniMap?.clearMarkers();
};

const addMarkers = () => {
  if (!mapRef.value) {
    console.log('missing map ref');
    return;
  }

  if (!instance) {
    console.log('missing instance ref');
    return;
  }

  miniMap?.addMarkers(mapRef.value, instance);
};
</script>

<template>
  <div style="display: flex; gap: 2rem">
    <button @click.prevent="clearMarkers">Clear markers</button>
    <button @click.prevent="addMarkers">Add markers</button>
  </div>
  <div ref="mapRef" id="map" />
</template>

<style lang="css">
button {
  width: fit-content;
  display: flex;
  gap: 8px;
  border: 1px solid red;
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 6px;
  color: chartreuse;
}

button:hover {
  background-color: chartreuse;
  color: var(--color-background);
  border: 1px solid chartreuse;
}

#map {
  height: 75vh;
  width: 75vw;
  border-radius: calc(infinity * 1px);
  border: 1px solid lightseagreen;
}
</style>
