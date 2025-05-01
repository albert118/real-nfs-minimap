<script setup lang="ts">
import { useGlobal } from '@stores/globalStore';

const { onClearCache, clearErrors: onClearErrors } = useGlobal();
const { loading, clear: onClearCaches } = onClearCache();
</script>

<template>
    <div class="stack-v">
        <v-card>
            <template v-slot:title>Developer Settings</template>

            <div class="stack-v pa-4">
                <div
                    class="stack-h"
                    style="width: 100%; justify-content: space-between"
                >
                    <div class="text-caption">
                        Clear all app and web worker caches
                    </div>
                    <v-btn
                        outlined
                        @click.prevent="onClearCaches"
                        :loading="loading"
                        color="orange-darken-1"
                    >
                        <div class="pa-2">Clear Caches</div>
                    </v-btn>
                </div>

                <div
                    class="stack-h"
                    style="width: 100%; justify-content: space-between"
                >
                    <div class="text-caption">Clear all tracked errors</div>
                    <v-btn
                        outlined
                        @click.prevent="onClearErrors"
                        color="red-darken-1"
                    >
                        <div class="pa-2">Clear Errors</div>
                    </v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>
