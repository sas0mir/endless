<template>
  <div class="page-layout">
    <NavbarComponent />
    <div class="page-layout__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavbarComponent from '@/components/navigation/navbarComponent.vue'
</script>
