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
        <!-- Main Column (Left) -->
        <div class="lg:col-span-7">
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

            <!-- Big Display Name & Hanko Stamp -->
            <div class="flex items-center gap-4 sm:gap-6 flex-wrap mb-4">
              <h1 class="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-ink uppercase leading-none">
                LEBRON JAMES<span class="text-vermillion">.</span>
              </h1>
              <div class="hanko hanko--lg">
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

        <!-- Right Side: Portrait Frame & Index Data (Same Height & Placement) -->
        <div class="lg:col-span-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            <!-- Portrait Photo Card -->
            <div class="bg-cream-dark border-2 border-ink p-4 sm:p-5 shadow-[6px_6px_0px_0px_#1a1a1a] flex flex-col justify-between min-h-[290px]">
              <div>
                <div class="flex items-center justify-between border-b border-stone-light pb-2 mb-3">
                  <span class="font-mono text-[10px] font-bold text-ink uppercase tracking-wider">PORTRAIT</span>
                  <span class="font-mono text-[9px] text-vermillion font-bold">ID // 01</span>
                </div>

                <!-- Photo Frame -->
                <div class="w-full aspect-[4/5] border-2 border-ink bg-cream overflow-hidden relative flex items-center justify-center">
                  <img
                    v-if="profile.avatarUrl"
                    :src="profile.avatarUrl"
                    :alt="profile.name"
                    class="w-full h-full object-cover"
                  />
                  <!-- Editorial Placeholder -->
                  <div
                    v-else
                    class="w-full h-full border border-dashed border-stone flex flex-col items-center justify-center p-3 text-center bg-cream relative select-none"
                  >
                    <!-- Corner registration marks -->
                    <span class="absolute top-1 left-1 text-[8px] font-mono text-stone">+</span>
                    <span class="absolute top-1 right-1 text-[8px] font-mono text-stone">+</span>
                    <span class="absolute bottom-1 left-1 text-[8px] font-mono text-stone">+</span>
                    <span class="absolute bottom-1 right-1 text-[8px] font-mono text-stone">+</span>

                    <svg class="w-7 h-7 text-stone mb-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                    <span class="font-mono text-[9px] text-vermillion font-bold uppercase tracking-wider leading-tight">
                      PORTRAIT
                    </span>
                    <span class="font-mono text-[8px] text-stone leading-tight mt-0.5">
                      [PHOTO PENDING]
                    </span>
                  </div>
                </div>
              </div>

              <!-- Footer of portrait card -->
              <div class="pt-2 border-t border-stone-light flex justify-between font-mono text-[9px] text-stone">
                <span>FORMAT: 4:5</span>
                <span>STATUS: ARCHIVED</span>
              </div>
            </div>

            <!-- INDEX_DATA Card (Matching Height & Placement) -->
            <div class="bg-cream-dark border-2 border-ink p-5 shadow-[6px_6px_0px_0px_#1a1a1a] flex flex-col justify-between min-h-[290px]">
              <div>
                <div class="flex items-center justify-between border-b border-stone-light pb-2 mb-3">
                  <span class="font-mono text-[10px] font-bold text-ink uppercase tracking-wider">INDEX_DATA</span>
                  <span class="w-2 h-2 bg-vermillion rounded-full"></span>
                </div>
                <div class="font-mono text-xs text-stone space-y-2.5">
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
                </div>
              </div>

              <div class="pt-2 border-t border-stone-light flex justify-between font-mono text-xs">
                <span class="text-stone">AVAILABILITY:</span>
                <span class="text-vermillion font-bold">OPEN FOR ROLES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
