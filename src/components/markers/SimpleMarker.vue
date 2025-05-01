<script setup lang="ts">
import { mdiMapMarker } from '@mdi/js';

defineProps<Partial<FeatureMetaData>>();
</script>

<template>
    <div class="marker">
        <v-icon class="" :icon="mdiMapMarker" size="x-large" :label="name" />
        <span> {{ name }}</span>
    </div>
</template>

<style scoped lang="css">
.marker {
    --color: darkblue;

    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--color);
    font-size: 10px;

    span {
        white-space: nowrap;
        font-size: 14px;
        font-weight: bold;
        color: var(--color);
    }
}
</style>
