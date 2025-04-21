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
  <div class="marker">
    <span class="marker--label">{{ name }}</span>
  </div>
</template>

<style scoped lang="css">
.marker {
  border: 1px solid black;
  width: 10px;
  height: 10px;
}

.marker--label {
  display: flex;
  font-weight: 600;
  color: darkblue;
  font-size: 12px;
  margin-top: 10px;
}
</style>
