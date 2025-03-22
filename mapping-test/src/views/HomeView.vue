<script setup lang="ts">
import { useArcadesDemo } from '@stores/arcadeStore';
import { useSettings } from '@stores/settingsStore';

const settings = useSettings();
const arcadesDemo = useArcadesDemo();

const pointsOfInterest = computed(() => (settings.enableDemoMode ? arcadesDemo.features : []));
</script>

<template>
  <main>
    <Map :points-of-interest="pointsOfInterest" />
  </main>
</template>
