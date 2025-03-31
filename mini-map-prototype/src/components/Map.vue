<script setup lang="ts">
import { useMap } from '@stores/mapStore';

export type MapProps = {
  center: Coordinate;
  features: PointOfInterest[];
};

const props = defineProps<MapProps>();
const featuresRef = toRef(props.features);

const mapRef = useTemplateRef<HTMLInputElement | null>('mapRef');

const map = useMap();

// the zoom is enough to show a continent
const zoom = defineModel<number>('zoom', { required: false, default: 6 });

watchEffect(() => map.setCenter(zoom.value, props.center));

watch(
  featuresRef,
  () => {
    console.log('watching');

    map.clear();
  },
  { immediate: true },
);

onMounted(() => {
  console.log('loading...');
  if (mapRef.value) {
    map.load(mapRef, props.features, props.center);
    map.setMarkers(featuresRef.value);
  }
});
</script>

<template>
  <div ref="mapRef" id="map" />
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
