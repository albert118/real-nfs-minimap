<script setup lang="ts">
import { useMap } from '@stores/mapStore';
import L from 'leaflet';

export type MapProps = {
  center: Coordinate;
  features: PointOfInterest[];
};

const props = defineProps<MapProps>();
const featuresRef = toRef(props.features);

const mapRef = useTemplateRef<HTMLInputElement | null>('mapRef');
const markersRef = useTemplateRef<HTMLInputElement[] | null>('markersRef');

const map = useMap();

// the zoom is enough to show a continent
const zoom = defineModel<number>('zoom', { required: false, default: 6 });

watchEffect(() => map.setCenter(zoom.value, props.center));

watch(
  props,
  async (newVal, oldVal) => {
    console.log('old:', oldVal?.features?.length ?? 0, 'new:', newVal.features?.length ?? 0);

    // clear...
    map.clear();

    // make it obvious...
    setTimeout(() => {
      // ... before reloading
      if (markersRef.value) {
        map.setMarkers(featuresRef.value, markersRef.value);
      }
    }, 1000);
  },
  { deep: true, immediate: true },
);

// extension: given a slot with none, one, or many elements, render them as markers
// extension: unmount lifecycle

/**
 * Overrides the default implementation
 * https://leafletjs.com/reference.html#divicon
 */
function setDefaultIconOptions() {
  L.Icon.Default.prototype.options = {
    ...L.Icon.Default.prototype.options,
    iconUrl: undefined,
    iconRetinaUrl: undefined,
    shadowRetinaUrl: undefined,
    iconSize: undefined,
  };
  // console.log('default options', L.Marker.prototype.options.icon?.options);
}

setDefaultIconOptions();

onMounted(() => {
  if (mapRef.value && markersRef.value) {
    map.load(mapRef, props.features, props.center);
    map.setMarkers(featuresRef.value, markersRef.value);
  }
});
</script>

<template>
  <div ref="mapRef" id="map">
    <div v-for="index in [...Array(featuresRef.length).keys()]" :key="`marker-#${index}`" ref="markersRef"></div>
  </div>
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
