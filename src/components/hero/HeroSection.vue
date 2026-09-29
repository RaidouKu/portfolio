<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { profile } from '../../assets/data/profile.js'
import TechButton from '../ui/TechButton.vue'

const heroRef = ref(null)
const titleRef = ref(null)
const metaRef = ref(null)
const ctaRef = ref(null)

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) return

  const tl = gsap.timeline({ delay: 0.2 })

  tl.from(titleRef.value, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power3.out',
  })
  tl.from(
    metaRef.value,
    {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
    },
    '-=0.3'
  )
  tl.from(
    ctaRef.value,
    {
      opacity: 0,
      y: 20,
      duration: 0.4,
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
    class="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 lg:px-12 pt-20 pb-16 overflow-hidden"
  >
    <!-- Background Watermark -->
    <div class="absolute right-4 lg:right-16 top-1/2 -translate-y-1/2 section-number">
      00
    </div>

    <!-- Left Vertical Text Rail (Desktop) -->
    <div class="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-stone font-mono text-[11px] tracking-[0.25em] uppercase select-none">
      <span class="vertical-text">DESIGN &amp; CODE ARCHIVE</span>
      <div class="w-px h-12 bg-stone-light"></div>
      <span class="vertical-text text-vermillion font-bold">2026 ED.</span>
    </div>

    <!-- Main Editorial Content Block -->
    <div class="max-w-content mx-auto w-full relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <!-- Main Column -->
        <div class="lg:col-span-8">
          <div ref="titleRef">
            <!-- Metadata top bar -->
            <div class="flex items-center gap-3 mb-6">
              <span class="px-2 py-0.5 bg-ink text-cream font-mono text-[11px] uppercase tracking-wider font-bold">
                VOL. 01
              </span>
              <span class="font-mono text-xs text-stone tracking-[0.15em] uppercase">
                MANILA / NCST CHAPTER
              </span>
            </div>

            <!-- Big Display Name & Hanko -->
            <div class="flex items-start gap-4 sm:gap-6 flex-wrap mb-4">
              <h1 class="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-ink uppercase leading-none">
                LEBRON JAMES<span class="text-vermillion">.</span>
              </h1>
              <div class="hanko hanko--lg mt-1 sm:mt-2">
                LJ
              </div>
            </div>

            <!-- Red Rule -->
            <div class="rule-red w-32 my-6"></div>

            <!-- Full Name & Subtitle -->
            <h2 class="font-heading font-bold text-xl sm:text-2xl text-stone tracking-tight mb-2">
              {{ profile.name }}
            </h2>
            <p class="font-mono text-sm sm:text-base text-vermillion font-bold tracking-widest uppercase mb-4">
              {{ profile.tagline }}
            </p>
          </div>

          <div ref="metaRef">
            <p class="text-stone font-body text-base max-w-xl leading-relaxed mb-8">
              Undergraduate at {{ profile.school }}. Crafting high-impact UI/UX design systems and full-stack web applications with rigorous editorial discipline.
            </p>

            <div ref="ctaRef" class="flex items-center gap-4 flex-wrap">
              <TechButton
                variant="primary"
                @click="document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })"
              >
                Explore Works ↓
              </TechButton>
              <TechButton
                :href="profile.github"
                variant="red"
              >
                GitHub Profile →
              </TechButton>
            </div>
          </div>
        </div>

        <!-- Right Side Diagnostic Card (Brutalist Manga Box) -->
        <div class="lg:col-span-4">
          <div class="bg-cream-dark border-2 border-ink p-6 shadow-[6px_6px_0px_0px_#1a1a1a]">
            <div class="flex items-center justify-between border-b border-stone-light pb-3 mb-4">
              <span class="font-mono text-[11px] font-bold text-ink uppercase tracking-wider">INDEX_DATA</span>
              <span class="w-2.5 h-2.5 bg-vermillion rounded-full"></span>
            </div>
            <div class="font-mono text-xs text-stone space-y-2">
              <div class="flex justify-between">
                <span>NAME:</span>
                <span class="text-ink font-bold">{{ profile.name }}</span>
              </div>
              <div class="flex justify-between">
                <span>GITHUB:</span>
                <span class="text-ink font-bold">@{{ profile.githubUsername }}</span>
              </div>
              <div class="flex justify-between">
                <span>DISCIPLINE:</span>
                <span class="text-ink font-bold">HYBRID UI/DEV</span>
              </div>
              <div class="flex justify-between">
                <span>AFFILIATION:</span>
                <span class="text-ink font-bold">NCST</span>
              </div>
              <div class="flex justify-between">
                <span>LOCATION:</span>
                <span class="text-ink font-bold">CAVITE, PH</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-stone-light">
                <span>AVAILABILITY:</span>
                <span class="text-vermillion font-bold">OPEN FOR ROLES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
