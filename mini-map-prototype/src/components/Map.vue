<script setup lang="ts">
import { useMap } from '@stores/mapStore';
import L from 'leaflet';

export type MapProps = {
  center: Coordinate;
};

const props = defineProps<MapProps>();

const mapRef = useTemplateRef<HTMLInputElement | null>('mapRef');

const map = useMap();

// the zoom is enough to show a continent
const zoom = defineModel<number>('zoom', { required: false, default: 6 });

// provide a ref model for the markers
const markersRef = defineModel<HTMLInputElement[] | null | undefined>('markersRef', { required: false, default: undefined });

watchEffect(() => map.setCenter(zoom.value, props.center));

// TODO: DX!
// watching the ref has drawbacks
// - ref isn't populated until after mounting, so it always triggers "immediately"
// - the ref doesn't directly reflect changes in the markers - it's a side affect
// - the DX is now fiddly, have to fill out a slot and provide a ref as a model
watch(
  markersRef,
  () => {
    // clear...
    // map.clear();

    // make it obvious before reloading
    setTimeout(() => {
      if (markersRef.value) map.setMarkers(markersRef.value);
    }, 1000);
  },
  { deep: true },
);

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

onMounted(async () => {
  await nextTick();
  // app context will be lost at this point

  setDefaultIconOptions();
  if (mapRef.value) map.load(mapRef, props.center);

  // TODO: performance!
  // we shouldn't need to render the markers directly onMounted here, as this becomes render blocking
  // calling set markers with > 20 markers fails to load
  // this is because we are generating N nodes in the DOM in the slot
  // then cutting them and re-inserting them within the map (or rather Leaflet does once provided the HTML)
  // if (markersRef.value) map.setMarkers(markersRef.value);
});
</script>

<template>
  <div ref="mapRef" id="map">
    <slot name="markers" ref="markersRef" />
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
