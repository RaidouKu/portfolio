<script setup>
import { ref } from 'vue'

defineProps({
  activeSection: { type: String, default: 'hero' },
})

const mobileOpen = ref(false)

const navItems = [
  { id: 'about', num: '01', label: 'PROFILE' },
  { id: 'project-enrollment', num: '02', label: 'CASE 01' },
  { id: 'project-kickcraft', num: '03', label: 'CASE 02' },
  { id: 'contact', num: '04', label: 'CONNECT' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  mobileOpen.value = false
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-sm border-b-2 border-ink"
  >
    <div class="max-w-content mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
      <!-- Logo / Monogram -->
      <button
        class="flex items-center gap-2 group cursor-pointer"
        @click="scrollTo('hero')"
      >
        <span class="w-6 h-6 border-2 border-vermillion rounded-full flex items-center justify-center font-display font-extrabold text-[10px] text-vermillion group-hover:bg-vermillion group-hover:text-cream transition-colors">
          KU
        </span>
        <span class="font-display font-extrabold text-sm tracking-tight text-ink group-hover:text-vermillion transition-colors">
          RAIDOUKU
        </span>
      </button>

      <!-- Desktop Nav tabs -->
      <div class="hidden md:flex items-center gap-6">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="relative py-4 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer"
          :class="
            activeSection === item.id
              ? 'text-vermillion font-bold'
              : 'text-stone hover:text-ink'
          "
          @click="scrollTo(item.id)"
        >
          <span class="text-stone/60 mr-1">{{ item.num }}</span>
          {{ item.label }}

          <!-- Active bottom indicator bar -->
          <span
            v-if="activeSection === item.id"
            class="absolute bottom-0 left-0 right-0 h-[2px] bg-vermillion"
          />
        </button>
      </div>

      <!-- Mobile menu toggle -->
      <button
        class="md:hidden font-mono text-xs font-bold text-ink hover:text-vermillion transition-colors px-2 py-1 border border-ink"
        @click="mobileOpen = !mobileOpen"
      >
        {{ mobileOpen ? 'CLOSE' : 'MENU' }}
      </button>
    </div>

    <!-- Mobile Dropdown -->
    <div
      v-if="mobileOpen"
      class="md:hidden bg-cream-dark border-b-2 border-ink px-4 py-4 space-y-3"
    >
      <button
        v-for="item in navItems"
        :key="item.id"
        class="block w-full text-left font-mono text-xs uppercase tracking-[0.15em] py-2 border-b border-stone-light"
        :class="
          activeSection === item.id
            ? 'text-vermillion font-bold'
            : 'text-stone hover:text-ink'
        "
        @click="scrollTo(item.id)"
      >
        <span class="text-stone/60 mr-2">{{ item.num }}</span>
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>
