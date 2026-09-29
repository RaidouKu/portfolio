<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['complete'])

const progress = ref(0)
const statusText = ref('INITIALIZING INDEX...')
const showSkip = ref(true)
const bootContainer = ref(null)
const cardRef = ref(null)

const sequence = [
  { p: 25, text: 'CATALOGING WORKS / NCST & KICKCRAFT' },
  { p: 60, text: 'LOADING EDITORIAL ARCHIVE' },
  { p: 90, text: 'PREPARING EXHIBIT' },
  { p: 100, text: 'SYSTEM READY // LAUNCH' },
]

function skip() {
  emit('complete')
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) {
    emit('complete')
    return
  }

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(bootContainer.value, {
        opacity: 0,
        scale: 0.98,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => emit('complete'),
      })
    },
  })

  // Animate card entrance
  tl.from(cardRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power3.out',
  })

  // Progress steps
  sequence.forEach((step, i) => {
    tl.to(
      progress,
      {
        value: step.p,
        duration: 0.35,
        ease: 'power1.inOut',
        onUpdate: () => {
          statusText.value = step.text
        },
      },
      '+=0.15'
    )
  })

  tl.to({}, { duration: 0.4 })
})
</script>

<template>
  <div
    ref="bootContainer"
    class="fixed inset-0 z-50 bg-cream flex items-center justify-center p-6 paper-grain"
  >
    <div
      ref="cardRef"
      class="w-full max-w-md bg-cream-dark border-2 border-ink p-8 relative shadow-[8px_8px_0px_0px_#1a1a1a]"
    >
      <!-- Top header with stamp and edition -->
      <div class="flex items-center justify-between border-b border-stone-light pb-4 mb-6">
        <div class="font-mono text-xs text-stone tracking-[0.2em] uppercase">
          EDITION // 2026
        </div>
        <div class="hanko">KU</div>
      </div>

      <!-- Main typography -->
      <div class="mb-8">
        <div class="font-mono text-xs text-vermillion tracking-[0.25em] uppercase mb-1 font-bold">
          PORTFOLIO ARCHIVE
        </div>
        <h1 class="font-display font-extrabold text-4xl text-ink tracking-tight mb-1">
          RAIDOUKU
        </h1>
        <p class="font-mono text-xs text-stone uppercase tracking-wider">
          Lebron James Pangan &mdash; NCST
        </p>
      </div>

      <!-- Loading progress -->
      <div class="space-y-2">
        <div class="flex justify-between font-mono text-[11px] text-stone">
          <span>{{ statusText }}</span>
          <span class="font-bold text-ink">{{ Math.round(progress) }}%</span>
        </div>
        <div class="h-2 bg-stone-light overflow-hidden">
          <div
            class="h-full bg-vermillion transition-all duration-200"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
    </div>

    <button
      v-if="showSkip"
      class="absolute bottom-8 right-8 font-mono text-xs text-stone hover:text-ink transition-colors duration-200 border-b border-stone-light pb-0.5"
      @click="skip"
    >
      SKIP [ESC] &rarr;
    </button>
  </div>
</template>
