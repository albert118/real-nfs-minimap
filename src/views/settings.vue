<script setup lang="ts">
import { useGlobal } from '@stores/globalStore';

const { onClearCaches } = useGlobal();
const { loading, clear } = onClearCaches();
</script>

<template>
    <v-btn outlined @click.prevent="clear" :loading="loading">
        Clear Caches
    </v-btn>
</template>
