<script setup lang="ts">
import L from 'leaflet';
import MapMarker from './MapMarker.vue';
import { render, type AppContext } from 'vue';
import renderComponent from '@utils/render';

export type MapProps = {
  center: Coordinate;
  pointsOfInterest: PointOfInterest[];
  attribution: string;
};

const props = defineProps<Partial<MapProps>>();

// the zoom is enough to show a continent
const zoom = defineModel<number>('zoom', { required: false, default: 6 });

const map = useTemplateRef<HTMLInputElement>('map');

let appContext: AppContext | undefined;

const stadiaMapUrlTemplate = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';

// WATCH OUT FOR MAKING THIS ASYNC IN CASE WE LOSE APP CONTEXT!!
onMounted(() => {
  // Store the current app context
  const instance = getCurrentInstance();
  if (instance) {
    appContext = instance.appContext;
  }

  // TODO: fix order of these two variables and improve usage + deconstruction + naming
  if (map.value) {
    // TODO: default
    const { x, y } = props.center ?? { x: 0, y: 0 };
    const lMap = L.map(map.value).setView([x, y], zoom.value);
    L.tileLayer(stadiaMapUrlTemplate, { attribution: props.attribution }).addTo(lMap);
    props.pointsOfInterest && props.pointsOfInterest.map((poi) => addMarker(poi, lMap));
  }
});

const addMarker = (poi: PointOfInterest, map: L.Map) => {
  const { x, y } = poi.geometry.coordinates;

  // add a fake div marker to remove the default marker
  // TODO: can we just unset the marker icon here? - no default is provided by Icon.Default implementation
  // TODO: override Icon.Default.prototype.options.icon with undefined URL and hidden class
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

const createMarkerIcon = (lMarker: L.Marker) => {
  if (!appContext) throw new Error('no app context exists!');

  const el = lMarker.getElement();
  if (!el) return;

  renderComponent(el, MapMarker, appContext);
};

const getPoiName = (poi: PointOfInterest) => {
  if (poi.properties['name']) return poi.properties['name'];
  if (poi.properties['name:en']) return poi.properties['name:en'];
};
</script>

<template>
  <div ref="map" id="map" />
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
}
</style>
