<template>
  <p>
    <slot />
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  xtraClass?: string,
  position?: string,
  appearance?: string,
  message: string
}>()
</script>
