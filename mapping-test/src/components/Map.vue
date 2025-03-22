<script setup lang="ts">
import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from '@vue-leaflet/vue-leaflet';
import IMdiMapMarker from '~icons/mdi/map-marker';

// LIcon is a convoluted to add an icon - as a heading tag... There is no need for this to be part of the vue-leaflet library
// as it has no reference to any leaflet objects
// https://github.com/vue-leaflet/vue-leaflet/blob/master/src/components/LIcon.vue#L126
// we can avoid this and just use the vuetify icon component instead (v-icon)
// but... the implementation will blank anything passed to l-marker that isn't l-icon
// https://github.com/vue-leaflet/vue-leaflet/blob/master/src/components/LMarker.vue#L77-L80
// and leave an empty div in it's place (not good)
// but other things MIGHT work, see the example here:
// https://github.com/vue-leaflet/vue3-demo-project/blob/master/src/App.vue#L13-L27
// all in all, if I can't customize something as simple as an icon then this library is dead to me

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
      <l-marker v-if="pointsOfInterest" v-for="poi in pointsOfInterest" :lat-lng="poi.geometry.coordinates.reverse()" :key="poi.id">
        <v-icon :icon="IMdiMapMarker" color="info" />
      </l-marker>
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
