<script setup lang="ts">
import { useGlobal } from '@stores/globalStore';

const { onClearCache, clearErrors: onClearErrors } = useGlobal();
const { loading, clear: onClearCaches } = onClearCache();
</script>

<template>
    <div class="stack-v">
        <v-btn
            outlined
            @click.prevent="onClearCaches"
            :loading="loading"
            color="orange-darken-1"
        >
            <div class="pa-2">Clear Caches</div>
        </v-btn>

        <v-btn outlined @click.prevent="onClearErrors" color="red-darken-1">
            <div class="pa-2">Clear Errors</div></v-btn
        >
    </div>
</template>
