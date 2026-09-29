<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  lines: { type: Array, required: true },
  flicker: { type: Boolean, default: true },
})

const opacity = ref(1)
let flickerInterval = null

onMounted(() => {
  if (props.flicker) {
    flickerInterval = setInterval(() => {
      opacity.value = Math.random() > 0.9 ? 0.4 : 1
    }, 2000 + Math.random() * 3000)
  }
})

onUnmounted(() => {
  if (flickerInterval) clearInterval(flickerInterval)
})
</script>

<template>
  <div
    class="font-mono text-[10px] leading-tight text-text-muted select-none pointer-events-none transition-opacity duration-100"
    :style="{ opacity }"
    aria-hidden="true"
  >
    <div v-for="(line, i) in lines" :key="i">{{ line }}</div>
  </div>
</template>
