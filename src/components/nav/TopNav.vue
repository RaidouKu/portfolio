<script setup>
import SystemLabel from '../ui/SystemLabel.vue'

defineProps({
  activeSection: { type: String, default: 'hero' },
})

const navItems = [
  { id: 'about', label: 'SYS.PROFILE' },
  { id: 'project-enrollment', label: 'CASE_01' },
  { id: 'project-kickcraft', label: 'CASE_02' },
  { id: 'contact', label: 'CONNECT' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-accent-teal/10"
  >
    <div class="max-w-content mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
      <!-- Logo / Name -->
      <button
        class="font-mono text-xs text-text-primary hover:text-accent-teal transition-colors duration-200"
        @click="scrollTo('hero')"
      >
        RaidouKu<span class="text-accent-teal">_</span>
      </button>

      <!-- Nav tabs -->
      <div class="hidden md:flex items-center gap-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="relative px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200"
          :class="
            activeSection === item.id
              ? 'text-accent-teal'
              : 'text-text-muted hover:text-text-primary'
          "
          @click="scrollTo(item.id)"
        >
          <span class="text-text-muted/50">[</span>
          {{ item.label }}
          <span class="text-text-muted/50">]</span>

          <!-- Active indicator -->
          <span
            v-if="activeSection === item.id"
            class="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-teal shadow-glow-teal-sm transition-all duration-300"
          />
        </button>
      </div>

      <!-- Mobile menu toggle -->
      <button
        class="md:hidden font-mono text-xs text-text-muted hover:text-accent-teal transition-colors"
        @click="$emit('toggleMobile')"
      >
        [MENU]
      </button>
    </div>
  </nav>
</template>
