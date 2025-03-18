<script setup lang="ts">
import { useArcardes } from '@stores/arcadeStore';
// this library works - but is basically a zombie
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
// these styles need to be imported globally, so they should be shifted higher and cached
import 'leaflet/dist/leaflet.css';

const map = ref();
// the zoom is enough to show the entire continent
const zoom = ref(6);
// this is where we start for this example, continent of Japan
const center = ref([38, 139.69]);

const arcades = useArcardes();
</script>

<template>
  <div class="map">
    <!-- :use-global-leaflet="false"  required to avoid an issue with importing -->
    <!-- see: https://github.com/vue-leaflet/vue-leaflet/issues/371 -->
    <l-map :use-global-leaflet="false" ref="map" v-model="zoom" v-model:zoom="zoom" :center="center" @move="console.log('move')">
      <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="Stadia Maps Basemap"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      <l-marker v-for="arcade in arcades.features" :lat-lng="arcade.geometry.coordinates.reverse()" />
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
