<template>
  <div class="nav-bar__container">
    <nav class="nav-bar">
      <NavbarBrand />
      <NavbarTabs />
      <NavbarButtons />
    </nav>
  </div>
</template>

<script setup lang="ts">
import NavbarBrand from '@components/navigation/NavbarBrand.vue'
import NavbarButtons from '@components/navigation/NavbarButtons.vue'
import NavbarTabs from '@/components/navigation/NavbarTabs.vue'
</script>
