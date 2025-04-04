<template>
  <div class="nav-bar__container">
    <nav class="nav-bar">
      <NavBarBrand />
      <NavBarTabs />
      <NavBarButtons />
    </nav>
  </div>
</template>

<script setup lang="ts">
import NavBarBrand from '@/components/navigation/desktop/navbarBrand.vue'
import NavBarButtons from '@/components/navigation/desktop/navbarButtons.vue'
import NavBarTabs from '@/components/navigation/desktop/navbarTabs.vue'
</script>
