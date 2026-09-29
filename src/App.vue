<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { useBootSequence } from './composables/useBootSequence.js'
import { useScrollSpy } from './composables/useScrollSpy.js'
import BootSequence from './components/boot/BootSequence.vue'
import TopNav from './components/nav/TopNav.vue'
import HeroSection from './components/hero/HeroSection.vue'
import AboutSection from './components/about/AboutSection.vue'

const { showBoot, isComplete, completeBoot } = useBootSequence()

const sectionIds = ['hero', 'about', 'project-enrollment', 'project-kickcraft', 'contact']
const { activeSection } = useScrollSpy(sectionIds)

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

    <BootSequence v-if="showBoot" @complete="onBootComplete" />

    <template v-if="isComplete">
      <div class="scanlines" aria-hidden="true"></div>
      <div class="scanline-sweep" aria-hidden="true"></div>
      <div class="noise-overlay" aria-hidden="true"></div>

      <TopNav :active-section="activeSection" />

      <main id="main-content" class="relative z-10 pt-12">
        <!-- Section components will be added in Tasks 6-8 -->
        <HeroSection />
        <AboutSection />
        <section id="project-enrollment" class="min-h-screen flex items-center justify-center">
          <p class="text-accent-teal font-mono">[PROJECT 01]</p>
        </section>
        <section id="project-kickcraft" class="min-h-screen flex items-center justify-center">
          <p class="text-accent-teal font-mono">[PROJECT 02]</p>
        </section>
        <section id="contact" class="min-h-screen flex items-center justify-center">
          <p class="text-accent-teal font-mono">[CONTACT]</p>
        </section>
      </main>
    </template>
  </div>
</template>
