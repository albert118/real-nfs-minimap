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
  <div ref="mapRef" id="map">
    <div class="arrow-up" style="position: relative; top: 0; left: 48%; z-index: 999" />
  </div>
</template>

<style lang="css">
button {
  width: fit-content;
  display: flex;
  gap: 8px;
  border: 1px solid var(--secondary);
  background-color: var(--color-background);
  border-radius: 8px;
  padding: 6px;
  color: var(--primary);
}

button:hover {
  background-color: var(--primary);
  color: var(--color-background);
  border: 1px solid var(--primary);
}

#map {
  height: 75vh;
  width: 75vw;
  border-radius: calc(infinity * 1px);
  border: 1px solid var(--primary);
}

#map:after {
  --offset: 6px;

  content: '';
  position: absolute;
  border-radius: calc(infinity * 1px);
  top: var(--offset);
  left: var(--offset);
  border: 1px solid var(--secondary);

  /* absolute position offset left + right + border width */
  width: calc(100% - calc(2 * var(--offset) + 1px));
  height: calc(100% - calc(2 * var(--offset) + 1px));

  z-index: 999;
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid red;
}
</style>
