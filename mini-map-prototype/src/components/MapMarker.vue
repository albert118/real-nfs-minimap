<script setup lang="ts">
export interface MapMarkerProps {
  label: string;
}

defineProps<MapMarkerProps>();
</script>

<template>
  <div class="marker">
    <span class="marker--label">{{ label }}</span>
  </div>
</template>

<style lang="css">
.marker {
  border: 1px solid var(--primary);
  width: 10px;
  height: 10px;
}

.marker--label {
  display: flex;
  font-weight: 600;
  color: var(--secondary);
  font-size: 12px;
  margin-top: 10px;
}
</style>
