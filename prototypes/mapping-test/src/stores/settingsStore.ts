import { defineStore } from 'pinia';

export const useSettings = defineStore('settings', () => {
  const enableDemoMode = ref<boolean>(true);

  const toggleDemoMode = () => (enableDemoMode.value = !enableDemoMode.value);

  return {
    enableDemoMode,
    toggleDemoMode,
  };
});
