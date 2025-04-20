<script setup lang="ts">
import { useGlobalStore } from '@stores/globalStore';
import { RouterView } from 'vue-router';

const { init } = useGlobalStore();

onMounted(() => {
  init();
});
</script>

<template>
  <RouterView />
</template>
