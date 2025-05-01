<script setup lang="ts">
import { mdiPin } from '@mdi/js';

defineProps<Partial<FeatureMetaData>>();
</script>

<template>
    <div class="location-pin">
        <v-icon :icon="mdiPin" size="x-large" :label="name" />
        <span> {{ name }}</span>
    </div>
</template>

<style scoped lang="css">
.location-pin {
    --color: red;

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
