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

            <!-- Big Display Name, Portrait Frame & Hanko -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
              <!-- Portrait Photo Frame (Manga/Dossier style) -->
              <div class="relative flex-shrink-0">
                <div class="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-2 border-ink bg-cream-dark p-1 shadow-[4px_4px_0px_0px_#1a1a1a] relative overflow-hidden">
                  <img
                    v-if="profile.avatarUrl"
                    :src="profile.avatarUrl"
                    :alt="profile.name"
                    class="w-full h-full object-cover"
                  />
                  <!-- Editorial Placeholder -->
                  <div
                    v-else
                    class="w-full h-full border border-dashed border-stone flex flex-col items-center justify-center p-2 text-center bg-cream relative select-none"
                  >
                    <!-- Corner registration marks -->
                    <span class="absolute top-0.5 left-0.5 text-[8px] font-mono text-stone">+</span>
                    <span class="absolute top-0.5 right-0.5 text-[8px] font-mono text-stone">+</span>
                    <span class="absolute bottom-0.5 left-0.5 text-[8px] font-mono text-stone">+</span>
                    <span class="absolute bottom-0.5 right-0.5 text-[8px] font-mono text-stone">+</span>

                    <svg class="w-5 h-5 sm:w-6 sm:h-6 text-stone mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                    <span class="font-mono text-[9px] text-vermillion font-bold uppercase tracking-wider leading-tight">
                      PORTRAIT
                    </span>
                    <span class="font-mono text-[8px] text-stone leading-tight">
                      [PHOTO PENDING]
                    </span>
                  </div>
                </div>
                <!-- Small plate label under frame -->
                <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-ink text-cream text-[8px] font-mono px-1.5 py-0.2 tracking-wider uppercase font-bold whitespace-nowrap">
                  ID // 01
                </div>
              </div>

              <!-- Name & Hanko Stamp -->
              <div>
                <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
                  <h1 class="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-ink uppercase leading-none">
                    LEBRON JAMES<span class="text-vermillion">.</span>
                  </h1>
                  <div class="hanko">
                    LJ
                  </div>
                </div>
                <!-- Full Name & Subtitle -->
                <h2 class="font-heading font-bold text-lg sm:text-xl text-stone tracking-tight mt-2">
                  {{ profile.name }}
                </h2>
              </div>
            </div>

            <!-- Red Rule -->
            <div class="rule-red w-32 my-6"></div>

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
