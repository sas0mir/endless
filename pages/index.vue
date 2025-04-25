<template>
  <h1>dashboard</h1>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  pageTransition: {
    name: 'rotate'
  }
})
</script>
