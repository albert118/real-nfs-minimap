<script setup lang="ts">
import { MiniMap } from './MiniMap';
import Logger from 'js-logger';

const logger = Logger.get('MiniMap');

export interface MiniMapProps {
  center: Coordinate;
  zoom: number;
  markerFeatures: Set<MarkerFeature>;
}

const { center, zoom, markerFeatures } = defineProps<MiniMapProps>();

const mapRef = useTemplateRef<HTMLElement>('mapRef');
let miniMap: MiniMap | undefined = undefined;

const instance = getCurrentInstance();

onMounted(async () => {
  logger.time('mounting minimap');

  await nextTick();
  if (!assertRefsExist()) return;

  miniMap = new MiniMap(mapRef.value!, { center, zoom });

  logger.timeEnd('mounting minimap');
});

onUnmounted(() => {
  miniMap?.destroy();
});

watch(
  () => markerFeatures,
  (newMarkerFeatures, oldMarkerFeatures) => {
    if (!assertRefsExist()) return;
    if (newMarkerFeatures === oldMarkerFeatures) {
      logger.warn('no marker features have changed but the watcher fired, no changes will be evaluated');
      return;
    }

    miniMap?.removeMarkers(oldMarkerFeatures);
    miniMap?.addMarkers(newMarkerFeatures, mapRef.value!, instance!);
  },
);

watch([() => center, () => zoom], ([newCenter, newZoom]) => {
  miniMap?.setView(newCenter, newZoom);
});

const clearAllMarkers = () => {
  if (!assertRefsExist()) return;
  logger.info('clearing all markers');
  miniMap?.removeMarkers(markerFeatures);
};

const assertRefsExist = () => {
  if (!mapRef.value) {
    logger.error('missing map ref');
    return false;
  }

  if (!instance) {
    logger.error('missing instance ref');
    return false;
  }

  return true;
};
</script>

<template>
  <div style="display: flex; gap: 2rem">
    <button @click.prevent="clearAllMarkers()">Clear markers</button>
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
