<script setup lang="ts">
import { mdiCameraRearVariant } from '@mdi/js';

defineProps<Partial<FeatureMetaData>>();
</script>

<template>
    <div class="red-light-marker">
        <v-icon :icon="mdiCameraRearVariant" size="x-large" :label="name" />
        <span> {{ name }}</span>
    </div>
</template>

<style scoped lang="css">
.red-light-marker {
    --color: #cb3636;

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
