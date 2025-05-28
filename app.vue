<template>
  <div class="app_container">
    <!-- <NuxtRouteAnnouncer /> -->
     <NuxtLayout>
      <NuxtPage />
     </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'Aurora web 3D constructor',
    ogTitle: 'Aurora web 3D constructor',
    description: 'Browser 3D constructor and game engine based on Three.js',
    ogDescription: 'Browser 3D constructor and game engine based on Three.js',
    //todo add ogImage and twitterCard
  })

  import '~/assets/styles/app_style.scss';

</script>
