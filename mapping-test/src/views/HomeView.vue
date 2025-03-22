<script setup lang="ts">
import { useArcadesDemo } from '@stores/arcadeStore';
import { useSettings } from '@stores/settingsStore';
import Map from '@components/Map.vue';
import SettingsCard from '@components/SettingsCard.vue';

const settings = useSettings();
const arcadesDemo = useArcadesDemo();

// the demo centers on the continent of Japan and shows various arcardes as Points of Interest (PoI's)
const mapConfig = computed(() => {
  return settings.enableDemoMode
    ? {
        pointsOfInterest: arcadesDemo.features,
        zoom: 6,
        center: [38, 139.69] as Coordinate,
      }
    : {
        pointsOfInterest: [] as PointOfInterest[],
        zoom: 18,
        center: [35.7, 139.8] as Coordinate,
      };
});
</script>

<template>
  <main>
    <div class="stack">
      <SettingsCard :enable-demo="settings.enableDemoMode" @update:enable-demo="settings.toggleDemoMode()" />
      <Map :points-of-interest="mapConfig.pointsOfInterest" :zoom="mapConfig.zoom" :center="mapConfig.center" />
    </div>
  </main>
</template>

<style lang="css">
.stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
