<script setup lang="ts">
import L from 'leaflet';
import MapMarker from './MapMarker.vue';
import { type AppContext } from 'vue';
import renderComponent, { destroyComponent } from '@utils/render';

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

const lMap = ref<L.Map | undefined>();

interface MarkerReference {
  lMarker: L.Marker;
  el: HTMLElement;
}

const markers = ref<MarkerReference[]>([]);

watchEffect(() => {
  if (!lMap.value) return;
  // TODO: fix order of these two variables and improve usage + deconstruction + naming
  const { x, y } = props.center ?? { x: 0, y: 0 };
  lMap.value.setView([x, y], zoom.value);
});

const pointsOfInterest = ref(props.pointsOfInterest);

watchEffect(() => {
  if (!lMap.value) return;

  // clear the existing markers
  markers.value.forEach((marker) => {
    marker.lMarker.removeFrom(lMap.value!);
    // TODO: this doesn't destroy the component!
    destroyComponent(marker.el);
  });
  markers.value = [];

  // add the new markers if they exist
  pointsOfInterest.value && pointsOfInterest.value.map((poi) => addMarker(poi));
  if (markers.value.length === 1) console.log(markers.value);
});

// WATCH OUT FOR MAKING THIS ASYNC IN CASE WE LOSE APP CONTEXT!!
onMounted(() => {
  // Store the current app context
  const instance = getCurrentInstance();
  if (instance) {
    appContext = instance.appContext;
  }

  if (!map.value) return undefined;

  // init here, and then use update methods to avoid massive re-renders
  lMap.value = L.map(map.value);
  L.tileLayer(stadiaMapUrlTemplate, { attribution: props.attribution }).addTo(lMap.value);
});

const addMarker = (poi: PointOfInterest) => {
  if (!lMap.value) return;

  // add a fake div marker to remove the default marker
  // TODO: can we just unset the marker icon here? - no default is provided by Icon.Default implementation
  // TODO: override Icon.Default.prototype.options.icon with undefined URL and hidden class
  const fakeDivIcon = L.divIcon({
    className: 'map--marker-icon',
  });

  try {
    const { x, y } = poi.geometry.coordinates;
    const lMarker = L.marker([y, x], {
      icon: fakeDivIcon,
    }).addTo(lMap.value!);

    // TODO: track these popups and destroy them too
    // const name = getPoiName(poi);
    // name && lMarker.bindPopup(name);
    const el = createMarkerIcon(lMarker, `${x}-${y}`);

    if (!el) throw new Error('Fuck the thing did not render');

    // track both the marker leaflet and Vue component references for lifecycle management
    markers.value.push({ lMarker, el });
  } catch (error) {
    console.log(error);
  }
};

const createMarkerIcon = (lMarker: L.Marker, key: string) => {
  if (!appContext) throw new Error('no app context exists!');

  const el = lMarker.getElement();
  if (!el) return;

  return renderComponent(el, MapMarker, key, appContext);
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
