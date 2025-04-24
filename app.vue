<template>
  <div class="app_container">
    <!-- <NuxtRouteAnnouncer /> -->
     <NuxtLayout>
      <NuxtPage />
     </NuxtLayout>
  </div>
</template>

<script setup lang="ts">

  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  console.log('RUNTIME-CONFIG->', runtimeConfig, '/nAPP-CONFIG->', appConfig)
</script>
