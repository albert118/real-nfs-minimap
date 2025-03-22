<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';

export type MapProps = {
  center: Coordinate;
  pointsOfInterest: PointOfInterest[];
  verbose: boolean;
};

const props = withDefaults(defineProps<Partial<MapProps>>(), {
  // idky this won't ts validate, as it is the expected type but TS insists it's number[] not [number, number]
  // I assume this is a bug with defineProps and Vue 3
  // @ts-ignore
  center: [35.7, 139.8],
  verbose: false,
});

const map = ref();

// the zoom is enough to show a continent
const zoom = defineModel<number>('zoom', { required: false, default: 6 });

const attribution =
  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

const onMove = (event: any) => {
  // TODO: touch event handling
  const { originalEvent } = event;
  props.verbose && console.log(`[map] move: [ ${originalEvent.x}, ${originalEvent.y} ]`);
};
</script>

<template>
  <div class="map">
    <!-- :use-global-leaflet="false"  required to avoid an issue with importing -->
    <!-- see: https://github.com/vue-leaflet/vue-leaflet/issues/371 -->
    <l-map :use-global-leaflet="false" ref="map" v-model="zoom" v-model:zoom="zoom" :center="center" @move="onMove">
      <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="Stadia Maps Basemap"
        :attribution="attribution"
      />
      <l-marker v-if="pointsOfInterest" v-for="poi in pointsOfInterest" :lat-lng="poi.geometry.coordinates.reverse()" />
    </l-map>
  </div>
</template>

<style lang="css" scoped>
.map {
  height: 75vh;
  width: 75vw;
  border: 1px solid green;
}
</style>
