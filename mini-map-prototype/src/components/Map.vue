<script setup lang="ts">
import L from 'leaflet';

export type MapProps = {
  center: Coordinate;
  pointsOfInterest: PointOfInterest[];
};

const props = withDefaults(defineProps<Partial<MapProps>>(), {
  // idky this won't ts validate, as it is the expected type but TS insists it's number[] not [number, number]
  // I assume this is a bug with defineProps and Vue 3
  // @ts-ignore
  center: [35.7, 139.8],
});
// the zoom is enough to show a continent
const zoom = defineModel<number>('zoom', { required: false, default: 6 });

const map = ref();

const attribution =
  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';

onMounted(() => {
  // Japan, continent centered
  const lMap = L.map('map').setView(props.center, zoom.value, {});
  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: attribution,
    maxZoom: 19,
  }).addTo(lMap);
});
</script>

<template>
  <div :ref="map" id="map" />
</template>

<style lang="css" scoped>
#map {
  height: 75vh;
  width: 75vw;
  border: 1px solid green;
}
</style>
