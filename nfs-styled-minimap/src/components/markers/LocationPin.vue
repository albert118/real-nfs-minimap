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
  <div class="location-pin">
    <span class="location-pin--label">{{ name }}</span>
  </div>
</template>

<style scoped lang="css">
.location-pin {
  border: 1px solid red;
  background-color: red;
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.location-pin--label {
  display: flex;
  font-weight: 600;
  color: darkred;
  font-size: 12px;
  margin-top: 10px;
}
</style>
