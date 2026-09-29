<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { useBootSequence } from './composables/useBootSequence.js'
import BootSequence from './components/boot/BootSequence.vue'

const { showBoot, isComplete, completeBoot } = useBootSequence()

const activeSection = ref('hero')

provide('bootComplete', isComplete)
provide('activeSection', activeSection)

function onBootComplete() {
  completeBoot()
}

function handleKeydown(e) {
  if (e.key === 'Escape' && showBoot.value) {
    onBootComplete()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative min-h-screen grid-bg">
    <a href="#main-content" class="skip-link">Skip to content</a>

    <!-- Boot sequence overlay -->
    <BootSequence v-if="showBoot" @complete="onBootComplete" />

    <!-- Global overlays -->
    <div v-if="isComplete" class="scanlines" aria-hidden="true"></div>
    <div v-if="isComplete" class="scanline-sweep" aria-hidden="true"></div>
    <div class="noise-overlay" aria-hidden="true"></div>

    <!-- Main content -->
    <main v-if="isComplete" id="main-content" class="relative z-10">
      <p class="text-accent-teal font-mono text-center pt-20">
        [SYSTEM ONLINE — Sections loading...]
      </p>
    </main>
  </div>
</template>
