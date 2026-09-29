<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['complete'])

const bootLines = ref([])
const showSkip = ref(true)
const bootContainer = ref(null)

const BOOT_TEXT = [
  '> INITIALIZING SYSTEM...',
  '> LOADING CORE MODULES...',
  '> USER: LEBRON_JAMES_PANGAN',
  '> ALIAS: RAIDOU_KU',
  '> ROLE: UI/UX_DESIGNER && DEVELOPER',
  '> AFFILIATION: NCST',
  '> STATUS: ONLINE',
  '> PORTFOLIO_SYSTEM v1.0 READY',
  '',
  '> LAUNCHING INTERFACE...',
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
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => emit('complete'),
      })
    },
  })

  BOOT_TEXT.forEach((line, i) => {
    tl.call(
      () => {
        bootLines.value.push(line)
      },
      null,
      i * 0.18
    )
  })

  tl.to({}, { duration: 0.6 })
})
</script>

<template>
  <div
    ref="bootContainer"
    class="fixed inset-0 z-50 bg-bg-primary flex items-center justify-center p-4"
  >
    <div class="w-full max-w-xl px-6">
      <div class="font-mono text-sm text-accent-teal space-y-1">
        <div
          v-for="(line, i) in bootLines"
          :key="i"
          class="whitespace-pre min-h-[1.25rem]"
        >
          {{ line }}
        </div>
        <span class="inline-block w-2 h-4 bg-accent-teal animate-pulse" />
      </div>
    </div>

    <button
      v-if="showSkip"
      class="absolute bottom-8 right-8 font-mono text-xs text-text-muted hover:text-text-primary transition-colors duration-200"
      @click="skip"
    >
      SKIP [ESC]
    </button>
  </div>
</template>
