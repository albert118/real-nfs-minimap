<script setup lang="ts">
import { LMap, LIcon, LTileLayer, LMarker, LControlLayers, LTooltip, LPopup, LPolyline, LPolygon, LRectangle } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

const zoom = ref(2);
const iconWidth = ref(25);
const iconHeight = ref(40);

const iconUrl = computed(() => `https://placekitten.com/${iconWidth}/${iconHeight}`);
const iconSize = computed(() => [iconWidth, iconHeight]);

const changeIcon = () => {
  iconWidth.value += 2;
  if (iconWidth.value > iconHeight.value) {
    iconWidth.value = Math.floor(iconHeight.value / 2);
  }
};
</script>

<template>
  <div class="map">
    <l-map v-model="zoom" v-model:zoom="zoom" :center="[47.41322, -1.219482]" @move="console.log('move')">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <l-control-layers />
      <l-marker :lat-lng="[0, 0]" draggable @moveend="console.log('moveend')">
        <l-tooltip> lol </l-tooltip>
      </l-marker>

      <l-marker :lat-lng="[47.41322, -1.219482]">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
      </l-marker>

      <l-marker :lat-lng="[50, 50]" draggable @moveend="console.log('moveend')">
        <l-popup> lol </l-popup>
      </l-marker>

      <l-polyline
        :lat-lngs="[
          [47.334852, -1.509485],
          [47.342596, -1.328731],
          [47.241487, -1.190568],
          [47.234787, -1.358337],
        ]"
        color="green"
      ></l-polyline>
      <l-polygon
        :lat-lngs="[
          [46.334852, -1.509485],
          [46.342596, -1.328731],
          [46.241487, -1.190568],
          [46.234787, -1.358337],
        ]"
        color="#41b782"
        :fill="true"
        :fillOpacity="0.5"
        fillColor="#41b782"
      />
      <l-rectangle
        :lat-lngs="[
          [46.334852, -1.509485],
          [46.342596, -1.328731],
          [46.241487, -1.190568],
          [46.234787, -1.358337],
        ]"
        :fill="true"
        color="#35495d"
      />
      <l-rectangle
        :bounds="[
          [46.334852, -1.190568],
          [46.241487, -1.090357],
        ]"
      >
        <l-popup> lol </l-popup>
      </l-rectangle>
    </l-map>
    <button @click="changeIcon">New kitten icon</button>
  </div>
</template>

<style lang="css" scoped>
.map {
  height: 75vh;
  width: 50vw;
  border: 1px solid green;
}
</style>
