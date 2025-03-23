<script setup lang="ts">
export type MapProps = {
  center: Coordinate;
  pointsOfInterest: PointOfInterest[];
  verbose: boolean;
};

const props = defineProps<Partial<MapProps>>();
</script>

<template>
  <div class="map">hello world!</div>
</template>

<style lang="css" scoped>
.map {
  height: 75vh;
  width: 75vw;
  border: 1px solid green;
}
</style>
