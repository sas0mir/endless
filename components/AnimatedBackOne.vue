<template>
  <canvas ref="bg_anim" class="{{ xtraClass }}" width="{{ window.innerWidth }}" height="{{  window.innerHeight }}"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  xtraClass: string
}>()
const bgCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  //todo get canvas ref and getContext('2d')
})
</script>
