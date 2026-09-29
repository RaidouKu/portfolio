<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { useBootSequence } from './composables/useBootSequence.js'
import { useScrollSpy } from './composables/useScrollSpy.js'
import BootSequence from './components/boot/BootSequence.vue'
import TopNav from './components/nav/TopNav.vue'
import HeroSection from './components/hero/HeroSection.vue'
import AboutSection from './components/about/AboutSection.vue'
import ProjectSection from './components/projects/ProjectSection.vue'
import ContactSection from './components/contact/ContactSection.vue'
import AppFooter from './components/footer/AppFooter.vue'

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
  <div class="relative min-h-screen bg-cream text-ink paper-grain">
    <a href="#main-content" class="skip-link">Skip to content</a>

    <BootSequence v-if="showBoot" @complete="onBootComplete" />

    <template v-if="isComplete">
      <TopNav :active-section="activeSection" />

      <main id="main-content" class="relative z-10 pt-14">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <ContactSection />
      </main>

      <AppFooter />
    </template>
  </div>
</template>
