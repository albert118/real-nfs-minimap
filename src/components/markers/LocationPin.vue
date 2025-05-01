<script setup lang="ts">
import { mdiPin } from '@mdi/js';

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
    <v-icon :icon="mdiPin" size="x-large" :label="name" />
    <span> {{ name }}</span>
  </div>
</template>

<style scoped lang="css">
.location-pin {
  --color: red;

  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--color);
  font-size: 16px;

  span {
    white-space: nowrap;
    font-size: 14px;
    font-weight: bold;
    color: var(--color);
  }
}
</style>
