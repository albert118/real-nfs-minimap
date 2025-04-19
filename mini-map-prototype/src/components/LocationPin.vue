<script setup lang="ts">
export interface MapMarkerProps {
  label: string;
}

// TODO: this doesnt appear to render as expected?
defineProps<MapMarkerProps>();
</script>

<template>
  <div class="location-pin">
    <span class="location-pin--label">{{ label }}</span>
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
  color: var(--secondary);
  font-size: 12px;
  margin-top: 10px;
}
</style>
