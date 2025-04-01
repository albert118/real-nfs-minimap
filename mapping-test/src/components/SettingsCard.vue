<script setup lang="ts">
const enableDemo = defineModel('enableDemo', { required: true, default: true });
</script>

<template>
  <v-card title="settings" max-width="400">
    <v-divider />
    <v-switch v-model="enableDemo" color="primary" label="Enable Demo" />
  </v-card>
</template>
