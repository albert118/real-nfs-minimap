<script setup lang="ts">
import MiniMap from '@components/mini-map/MiniMap.vue';
import { useArcadesDemo } from '@stores/arcadeStore';
import { MapMarker } from '@components/markers/MapMarker';
import { useSpeedCamerasNsw } from '@stores/speedCamerasStore';
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@stores/globalStore';
import Logger from 'js-logger';
import { FeatureType } from '@stores/feature-types';

const logger = Logger.get('Home View');

const globalStore = useGlobalStore();
const { currentLocation } = storeToRefs(globalStore);

const japZoom = 6;
const japCenter: Coordinate = {
  x: 38,
  y: 139.69,
};

// default to JAP data
const center = ref<Coordinate>(japCenter);
const zoom = ref<number>(japZoom);
const markerFeatures = ref<Set<MarkerFeature>>(new Set());

// load the datasets
const { features: arcadeFeatures } = useArcadesDemo();
const { features: speedCameraFeatures } = useSpeedCamerasNsw();

onMounted(async () => {});

const createMarkerFeatures = (features: Feature[]) => {
  return features.map((f) => ({
    type: f.type,
    props: f.properties,
    marker: new MapMarker(f.geometry.coordinates),
  }));
};

const selectJapData = () => {
  logger.log('selecting JAP data');

  center.value = japCenter;
  zoom.value = japZoom;
  markerFeatures.value = new Set(createMarkerFeatures(arcadeFeatures));
  markerFeatures.value.add({
    type: FeatureType.CurrentLocation,
    props: { name: 'Current Location' },
    marker: new MapMarker(japCenter),
  });
};

const selectAusData = () => {
  globalStore.setCurrentLocation();

  if (!currentLocation.value) return;

  logger.log('selecting AUS data');

  center.value = { y: 151.02, x: -33.81 };
  zoom.value = 12;
  markerFeatures.value = new Set(createMarkerFeatures(speedCameraFeatures));
  markerFeatures.value.add({
    type: FeatureType.CurrentLocation,
    props: { name: 'Current Location' },
    marker: new MapMarker(currentLocation.value),
  });
};
</script>

<template>
  <main>
    <div class="stack">
      <div style="display: flex; gap: 2rem">
        <button @click.prevent="selectJapData">Select Japan demo data</button>
        <button @click.prevent="selectAusData">Select Australia demo data</button>
      </div>
      <MiniMap :zoom="zoom" :center="center" :marker-features="markerFeatures" />
    </div>
  </main>
</template>
