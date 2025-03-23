<script setup lang="ts">
import L from 'leaflet';
import MapMarker from './MapMarker.vue';
import { render, type AppContext } from 'vue';

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

let appContext: AppContext | undefined;

// WATCH OUT FOR MAKING THIS ASYNC IN CASE WE LOSE APP CONTEXT!!
onMounted(() => {
  // Store the current app context
  const instance = getCurrentInstance();
  if (instance) {
    appContext = instance.appContext;
  }

  // Japan, continent centered
  const { x, y } = props.center;
  // TODO: fix order of these two variables and improve usage + deconstruction + naming
  const lMap = L.map('map').setView([x, y], zoom.value);

  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: attribution,
    maxZoom: 19,
  }).addTo(lMap);

  props.pointsOfInterest.map((poi) => addMarker(poi, lMap));
});

const addMarker = (poi: PointOfInterest, map: L.Map) => {
  const { x, y } = poi.geometry.coordinates;

  const fakeDivIcon = L.divIcon({
    className: 'map--marker-icon',
  });

  try {
    const lMarker = L.marker([y, x], {
      icon: fakeDivIcon,
    }).addTo(map);
    const name = getPoiName(poi);
    name && lMarker.bindPopup(name);
    createMarkerIcon(lMarker);
  } catch (error) {
    console.log(error);
  }
};

// dynamically mount the component we want here by using Vue's hyperscript function (h) and the render API
const createMarkerIcon = (lMarker: L.Marker) => {
  if (!appContext) return;

  const el = lMarker.getElement();

  if (!el) return;

  const vNode = h(MapMarker);
  vNode.appContext = appContext;
  render(vNode, el);
};

const getPoiName = (poi: PointOfInterest) => {
  if (poi.properties['name']) return poi.properties['name'];
  if (poi.properties['name:en']) return poi.properties['name:en'];
};
</script>

<template>
  <div :ref="map" id="map" />
</template>

<style lang="css">
#map {
  height: 75vh;
  width: 75vw;
  border: 1px solid green;
}

.map--marker-icon {
  width: 0;
  height: 0;
  /* border: 1px solid red; */
}
</style>
