<template>
  <canvas ref="bg_canvas" class="bg_canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';

const props = defineProps<{
  xtraClass: string
}>()
const bg_canvas = ref<HTMLCanvasElement | null>(null);
const canvasWidth = ref(window.innerWidth);
const canvasHeight = ref(window.innerHeight);

onMounted(() => {
  window.addEventListener('resize', updateCanvasSize);
  updateCanvasSize();
  if (bg_canvas.value) viewCanvas();
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateCanvasSize);
});

function updateCanvasSize() {
  if (bg_canvas.value) {
    canvasWidth.value = window.innerWidth;
    canvasHeight.value = window.innerHeight;
    bg_canvas.value.width = canvasWidth.value;
    bg_canvas.value.height = canvasHeight.value;
  }
}

function viewCanvas () {
  if (!bg_canvas.value) return

const c = bg_canvas.value
const ctx = c.getContext('2d')!
c.width = window.innerWidth
c.height = window.innerHeight

const cols = 40
const rows = 20
const spacing = c.width / cols
const speed = 1.5
const perspective = 1.8

let points: { x: number, y: number }[][] = []

function initPoints() {
  points = []
  for (let y = 0; y < rows; y++) {
    const row: any[] = []
    for (let x = 0; x < cols; x++) {
      row.push({
        x: x * spacing,
        y: y * spacing
      })
    }
    points.push(row)
  }
}

function update() {
  for (let y = 0; y < points.length; y++) {
    for (let x = 0; x < points[y].length; x++) {
      points[y][x].y += speed

      if (points[y][x].y > c.height) {
        points[y][x].y = 0
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height)
  ctx.strokeStyle = '#00ffe1'
  ctx.lineWidth = 1

  // Горизонтальные линии
  for (let y = 0; y < rows; y++) {
    ctx.beginPath()
    for (let x = 0; x < cols; x++) {
      const pt = project(points[y][x])
      if (x === 0) ctx.moveTo(pt.x, pt.y)
      else ctx.lineTo(pt.x, pt.y)
    }
    ctx.stroke()
  }

  // Вертикальные линии
  for (let x = 0; x < cols; x++) {
    ctx.beginPath()
    for (let y = 0; y < rows; y++) {
      const pt = project(points[y][x])
      if (y === 0) ctx.moveTo(pt.x, pt.y)
      else ctx.lineTo(pt.x, pt.y)
    }
    ctx.stroke()
  }
}

function project(p: { x: number, y: number }) {
  const dx = p.x - c.width / 2
  const dy = p.y
  const scale = 1 + dy / c.height * perspective
  return {
    x: c.width / 2 + dx * scale,
    y: dy
  }
}

function animate() {
  update()
  draw()
  requestAnimationFrame(animate)
}

initPoints()
animate()
}
</script>

<style lang="css" scoped>
.bg_canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    inset: 0;
    background: black;
}
</style>
