<script setup>
import { ref, provide } from 'vue'

const bootComplete = ref(false)
const activeSection = ref('hero')

provide('bootComplete', bootComplete)
provide('activeSection', activeSection)
</script>

<template>
  <div class="relative min-h-screen grid-bg">
    <!-- Skip to content -->
    <a href="#main-content" class="skip-link">Skip to content</a>

    <!-- Global overlays -->
    <div class="scanlines" aria-hidden="true"></div>
    <div class="scanline-sweep" aria-hidden="true"></div>
    <div class="noise-overlay" aria-hidden="true"></div>

    <!-- Main content placeholder -->
    <main id="main-content" class="relative z-10">
      <p class="text-accent-teal font-mono text-center pt-20">
        [SYSTEM ONLINE — Components loading...]
      </p>
    </main>
  </div>
</template>
