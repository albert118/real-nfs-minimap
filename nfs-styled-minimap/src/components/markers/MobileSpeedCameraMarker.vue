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
  <div class="mobile-speed-camera-marker">
    <div class="marker-label" style="color: #124783">{{ name }}</div>
  </div>
</template>

<style scoped lang="css">
.mobile-speed-camera-marker {
  border: 1px solid #124783;
  width: 10px;
  height: 10px;
  border-radius: 999px;
}
</style>
