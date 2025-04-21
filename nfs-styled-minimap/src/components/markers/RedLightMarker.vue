<script setup lang="ts">
// this shoudl be resolved from the global type declarations but isn't recognised for some reason
// global typing seems broken in this prototype
export interface FeatureMetaData {
  name: string;
  description: string;
  accreditation: string;
  source: URL;
  lastUpdated: Date;
  createdOn: Date;
}

defineProps<Partial<FeatureMetaData>>();
</script>

<template>
  <div class="red-light-marker">
    <div class="marker-label" style="color: red">{{ name }}</div>
  </div>
</template>

<style scoped lang="css">
.red-light-marker {
  border: 1px solid red;
  width: 10px;
  height: 10px;
  border-radius: 999px;
}
</style>
