<script setup lang="ts">
import type { FeatureMetaData } from '@domain-types/feature-types';
import { mdiHumanMaleFemaleChild } from '@mdi/js';

defineProps<Partial<FeatureMetaData>>();
</script>

<template>
    <div class="school-zone-marker">
        <v-icon :icon="mdiHumanMaleFemaleChild" size="x-large" :label="name" />
        <span> {{ name }}</span>
    </div>
</template>

<style scoped lang="css">
.school-zone-marker {
    --color: #caca11;

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
