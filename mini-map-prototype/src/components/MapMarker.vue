<script setup lang="ts">
// import IMdiMapMarker from '~icons/mdi/map-marker';
// import { VIcon } from 'vuetify/components';
// TODO: fix the Vuetify import bullshit
// "Vuetify Could not find defaults instance"
export interface MapMarkerProps {
  label: string;
}

defineProps<MapMarkerProps>();
</script>

<template>
  <!-- <v-icon :icon="IMdiMapMarker" color="info" />
  <v-icon icon="mdi:map-marker" color="info" /> -->
  <div style="border: 1px solid red; width: 10px; height: 10px">
    <span style="display: flex; font-weight: 600; color: chartreuse; font-size: 12px; margin-top: 10px">{{ label }}</span>
  </div>
</template>
