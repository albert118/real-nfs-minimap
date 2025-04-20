<script setup lang="ts">
import type { MapMarker } from '@components/markers/MapMarker';
import { MiniMap } from './MiniMap';

// TODO: render multiple marker variants
//   - swap to a generic pattern, there will be lots of marker variants
//   - some sort of template generic method would be good
export interface MiniMapProps {
  center: Coordinate;
  markers: Record<string, MapMarker>;
  locationPins: Record<string, MapMarker>;
  zoom: number;
}

const { center, markers, locationPins, zoom } = defineProps<MiniMapProps>();

const mapRef = useTemplateRef<HTMLElement>('mapRef');
let miniMap: MiniMap | undefined = undefined;

const instance = getCurrentInstance();

onMounted(async () => {
  console.log('mounting minimap');
  await nextTick();
  if (!assertRefsExist()) return;

  miniMap = new MiniMap(mapRef.value!, { center, zoom, verbose: true });
});

onUnmounted(() => {
  miniMap?.destroy();
});

watch(
  () => markers,
  (newValue) => {
    miniMap?.clearMarkers();
    if (!assertRefsExist()) return;
    miniMap?.addMarkers(newValue, mapRef.value!, instance!);
  },
);

watch(
  () => locationPins,
  (newValue) => {
    miniMap?.clearLocationPins();
    if (!assertRefsExist()) return;
    miniMap?.addLocationPins(newValue, mapRef.value!, instance!);
  },
);

watch([() => center, () => zoom], ([newCenter, newZoom]) => {
  miniMap?.setView(newCenter, newZoom);
});

const assertRefsExist = () => {
  if (!mapRef.value) {
    console.log('missing map ref');
    return false;
  }

  if (!instance) {
    console.log('missing instance ref');
    return false;
  }

  return true;
};
</script>

<template>
  <div style="display: flex; gap: 2rem">
    <button @click.prevent="miniMap?.clearMarkers()">Clear markers</button>
  </div>
  <div ref="mapRef" id="map">
    <div class="arrow-up" style="position: relative; top: 0; left: 48%; z-index: 999" />
  </div>
</template>

<style lang="css">
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
