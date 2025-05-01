<script setup lang="ts">
import { useGlobal } from '@stores/globalStore';
import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router';

const router = useRouter();
const global = useGlobal();
const { init } = global;
const { errors, hasErrored } = storeToRefs(global);

onMounted(async () => {
    await router.isReady();
    init();
});
</script>

<template>
    <div v-if="hasErrored" class="stack-v">
        <v-snackbar
            v-for="error in errors"
            :v-model="error"
            :timeout="1000"
            variant="tonal"
            color="red-lighten-1"
        >
            <div class="text-subtitle-1 pa-2 red-darken-4">
                An error occurred.
            </div>
            <div class="text-subtitle-1 pa-2 red-lighten-3">
                {{ error.message }}
            </div>
        </v-snackbar>
    </div>

    <RouterView />
</template>
