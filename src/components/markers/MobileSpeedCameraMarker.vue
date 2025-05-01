<script setup lang="ts">
import type { FeatureMetaData } from '@domain-types/feature-types';
import { mdiCameraEnhance } from '@mdi/js';

defineProps<Partial<FeatureMetaData>>();
</script>

<template>
    <div class="mobile-speed-camera-marker">
        <v-icon :icon="mdiCameraEnhance" size="x-large" :label="name" />
        <span> {{ name }}</span>
    </div>
</template>

<style scoped lang="css">
.mobile-speed-camera-marker {
    --color: #124783;

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
