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
  <div class="mini-map">
    <div class="arrow-container">
      <div class="arrow-up" />
    </div>
    <div ref="mapRef" id="map" />
  </div>
</template>

<style lang="css">
.mini-map {
  --border-layer: 990;
  --widget-layer: 991;

  #map {
    height: 1000px;
    width: 1000px;
    border-radius: calc(infinity * 1px);
    border: 2px solid var(--primary);

    &:after {
      --border-width: 4.5rem;
      /* this is a simpler approach than tweaking the width and height using calc like below */
      --offset: -15px;
      --blur: 40px;

      content: '';
      position: absolute;
      border-radius: calc(infinity * 1px);

      top: var(--offset);
      right: var(--offset);
      bottom: var(--offset);
      left: var(--offset);

      border: var(--border-width) solid var(--color-background);
      background-color: transparent;
      background-clip: border-box;

      /* this trick allows creating an offset border, ie. a second "ring" */
      /* absolute position offset left + right + border width */
      /* width: calc(100% - calc(2 * var(--offset) + 1px));
      height: calc(100% - calc(2 * var(--offset) + 1px)); */

      z-index: var(--border-layer);

      /* -webkit-prefixed version
       * still needed for
       * some mobile browsers 💔😭
       */
      /* -webkit-filter: blur(var(--blur)); */
      filter: blur(var(--blur)) grayscale(80%) drop-shadow(0 0 var(--blur) var(--color-background));
    }
  }

  /* this seems to be the most obvious way to create cutout elements on the map edge */
  .arrow-container {
    --width: 40px;

    width: var(--width);
    height: var(--width);
    border-radius: calc(infinity * 1px);

    display: flex;
    align-items: center;
    justify-content: center;

    /* this must match the background colour to create the desired "cutout" effect */
    background-color: var(--color-background);
    position: relative;
    top: calc(0.5 * var(--width));

    /* this is roughly the middle, we need to add an offset based on the width of the element */
    left: 47%;
    z-index: var(--widget-layer);

    .arrow-up {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 15px solid var(--primary);
    }
  }
}
</style>
