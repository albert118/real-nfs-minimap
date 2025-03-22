<script setup lang="ts">
import { useArcadesDemo } from '@stores/arcadeStore';
import { useSettings } from '@stores/settingsStore';
import Map from '@components/Map.vue';
import SettingsCard from '@components/SettingsCard.vue';

const settings = useSettings();
const arcadesDemo = useArcadesDemo();

// the demo centers on the continent of Japan and shows various arcardes as Points of Interest (PoI's)
const pointsOfInterest = computed(() => (settings.enableDemoMode ? arcadesDemo.features : []));
const zoom = computed(() => (settings.enableDemoMode ? 6 : 18));
const center = computed<Coordinate>(() => (settings.enableDemoMode ? [38, 139.69] : [35.7, 139.8]));
</script>

<template>
  <main>
    <div class="stack">
      <SettingsCard :enable-demo="settings.enableDemoMode" @update:enable-demo="settings.toggleDemoMode()" />
      <Map :points-of-interest="pointsOfInterest" :zoom="zoom" :center="center" />
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
