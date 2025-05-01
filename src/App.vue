<script setup lang="ts">
import { useGlobalStore } from '@stores/globalStore';
import { RouterView } from 'vue-router';

const router = useRouter();
const { init } = useGlobalStore();

onMounted(async () => {
    await router.isReady();
    init();
});
</script>

<template>
    <RouterView />
</template>
