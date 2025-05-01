<script setup lang="ts">
import MiniMap from '@components/mini-map/MiniMap.vue';
import { useArcadesDemo } from '@stores/arcadeStore';
import { MapMarker } from '@components/markers/MapMarker';
import { useSpeedCamerasNsw } from '@stores/speedCamerasStore';
import { storeToRefs } from 'pinia';
import { useGlobal } from '@stores/globalStore';
import Logger from 'js-logger';
import { FeatureType } from '@stores/feature-types';
import { VCheckbox } from 'vuetify/components';

const logger = Logger.get('Home View');

const global = useGlobal();
const { currentLocation } = storeToRefs(global);

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

// form data
const allFeatureTypes = [...Object.values(FeatureType)];
const selectedOptions = ref<FeatureType[]>([]);

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

    selectedOptions.value = [FeatureType.CurrentLocation, FeatureType.Feature];
};

const selectAusData = () => {
    global.setCurrentLocation();

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

    selectedOptions.value = allFeatureTypes;
};

const clearAllMarkers = () => {
    logger.info('clearing all markers');
    markerFeatures.value = new Set();
};

const clearFilters = () => {
    selectedOptions.value = [];
};

watch(selectedOptions, () => {
    // this won't allow resetting the filters, as we'd need the original marker data too
    markerFeatures.value = new Set(
        [...markerFeatures.value.values()].filter((f) =>
            selectedOptions.value.includes(f.type),
        ),
    );
});
</script>

<template>
    <main>
        <div class="stack-v">
            <div class="stack-h">
                <button @click.prevent="selectJapData">
                    Select Japan demo data
                </button>
                <button @click.prevent="selectAusData">
                    Select Australia demo data
                </button>
                <button @click.prevent="clearAllMarkers">Clear markers</button>
                <button @click.prevent="clearFilters">Clear filters</button>
            </div>
            <div class="stack-h">
                <v-checkbox
                    v-for="option in allFeatureTypes"
                    :label="option"
                    :value="option"
                    v-model="selectedOptions"
                ></v-checkbox>
            </div>
        </div>
        <MiniMap
            :zoom="zoom"
            :center="center"
            :marker-features="markerFeatures"
        />
    </main>
</template>
