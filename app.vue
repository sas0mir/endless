<template>
  <div>
    <NuxtRouteAnnouncer />
    <AppAlert>Hello bitch</AppAlert>
  </div>
</template>

<script setup lang="ts">
//import AppAlert from './components/AppAlert.vue';

  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  console.log('RUNTIME-CONFIG->', runtimeConfig, '/nAPP-CONFIG->', appConfig)
</script>
