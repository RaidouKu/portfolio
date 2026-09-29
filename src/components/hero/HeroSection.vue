<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { profile } from '../../assets/data/profile.js'
import GlowText from '../ui/GlowText.vue'
import DataReadout from '../ui/DataReadout.vue'
import SystemLabel from '../ui/SystemLabel.vue'
import TechButton from '../ui/TechButton.vue'

const heroRef = ref(null)
const nameRef = ref(null)
const taglineRef = ref(null)
const ctaRef = ref(null)

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) return

  const tl = gsap.timeline({ delay: 0.3 })

  tl.from(nameRef.value, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
  })
  tl.from(
    taglineRef.value,
    {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    },
    '-=0.3'
  )
  tl.from(
    ctaRef.value,
    {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
    },
    '-=0.2'
  )
})
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
  >
    <!-- Decorative data readouts -->
    <div class="absolute top-24 left-6 hidden lg:block">
      <DataReadout
        :lines="[
          'SYS.TIME: ' + new Date().toISOString().slice(0, 19),
          'LOC: MANILA, PH',
          'STATUS: ACTIVE ●',
        ]"
      />
    </div>
    <div class="absolute bottom-16 right-6 hidden lg:block">
      <DataReadout
        :lines="[
          'CONN: SECURE',
          'PROTO: HTTPS/2',
          'NODE: PORTFOLIO_v1.0',
        ]"
      />
    </div>

    <!-- Main content -->
    <div class="text-center max-w-3xl mx-auto">
      <SystemLabel text="SYSTEM ONLINE" color="teal" class="mb-6 block" />

      <h1
        ref="nameRef"
        class="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-wider text-text-primary mb-4"
      >
        <GlowText color="teal">{{ profile.alias }}</GlowText>
      </h1>

      <p
        ref="taglineRef"
        class="font-heading text-xl sm:text-2xl text-text-muted tracking-wide mb-2"
      >
        {{ profile.name }}
      </p>

      <p class="font-mono text-sm text-accent-amber tracking-widest uppercase mb-10">
        {{ profile.tagline }}
      </p>

      <div ref="ctaRef" class="flex items-center justify-center gap-4 flex-wrap">
        <TechButton
          variant="primary"
          @click="document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })"
        >
          Explore //
        </TechButton>
        <TechButton
          :href="profile.github"
          variant="amber"
        >
          GitHub →
        </TechButton>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span class="font-mono text-[10px] text-text-muted tracking-widest uppercase">Scroll</span>
      <div class="w-px h-8 bg-gradient-to-b from-accent-teal/50 to-transparent animate-pulse" />
    </div>
  </section>
</template>
