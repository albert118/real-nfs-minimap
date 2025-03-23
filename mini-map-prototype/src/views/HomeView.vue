<script setup lang="ts">
import { useArcadesDemo } from '@stores/arcadeStore';
import { useSettings } from '@stores/settingsStore';
import Map from '@components/Map.vue';
import SettingsCard from '@components/SettingsCard.vue';

const settings = useSettings();
const arcadesDemo = useArcadesDemo();

const currentPosition = ref<Coordinate | undefined>();
const pointsOfInterest = ref<PointOfInterest[]>([]);

onMounted(async () => {
  // get location perms and then resolve the user's current position
  await navigator.permissions.query({ name: 'geolocation' });
  navigator.geolocation.getCurrentPosition(
    (position: GeolocationPosition) => {
      // resolve the current position
      currentPosition.value = {
        x: position.coords.latitude,
        y: position.coords.longitude,
      };
      // the create a PoI for the user's location
      pointsOfInterest.value.push({
        type: 'Feature',
        properties: {
          name: 'You are here!',
          description: 'I know where you live',
        },
        geometry: {
          type: 'Point',
          coordinates: currentPosition.value,
        },
        id: '1722312876312',
      } as PointOfInterest);
    },
    () => {
      console.warn('failed to resolve position! Will set fallback default coord for now');
      currentPosition.value = {
        x: 35.7,
        y: 139.8,
      };
    },
  );
});

// the demo centers on the continent of Japan and shows various arcardes as Points of Interest (PoI's)
const mapConfig = computed(() => {
  return settings.enableDemoMode
    ? {
        pointsOfInterest: arcadesDemo.features,
        zoom: 6,
        center: {
          x: 38,
          y: 139.69,
        },
      }
    : {
        pointsOfInterest: pointsOfInterest.value,
        zoom: 16,
        center: currentPosition.value,
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
