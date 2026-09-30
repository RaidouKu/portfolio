<script setup>
import { ref, onMounted } from 'vue'
import { createSectionReveal } from '../../utils/animations.js'
import TechButton from '../ui/TechButton.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
  reversed: { type: Boolean, default: false },
})

const cardRef = ref(null)
const scrollContainer = ref(null)
const activeImageIndex = ref(0)

function handleScroll(e) {
  const el = e.target
  const index = Math.round(el.scrollLeft / el.clientWidth)
  if (index !== activeImageIndex.value && index >= 0) {
    activeImageIndex.value = index
  }
}

function scrollToImage(idx) {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      left: idx * scrollContainer.value.clientWidth,
      behavior: 'smooth'
    })
    activeImageIndex.value = idx
  }
}

onMounted(() => {
  createSectionReveal(cardRef.value)
})
</script>

<template>
  <div
    ref="cardRef"
    class="bg-cream-dark border-2 border-ink p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1a1a1a]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <!-- Media / Preview Frame (Manga Plate & Scrollable Browser Window) -->
      <div
        class="lg:col-span-7"
        :class="{ 'lg:order-2': reversed }"
      >
        <div class="border-2 border-ink bg-cream overflow-hidden relative shadow-[4px_4px_0px_0px_#1a1a1a]">
          <!-- Browser-style Title / Status Bar -->
          <div class="flex items-center justify-between px-3.5 py-2 border-b-2 border-ink bg-cream-dark text-[11px] font-mono font-bold">
            <div class="flex items-center gap-2">
              <span class="flex gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-vermillion border border-ink"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-stone border border-ink"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-stone-light border border-ink"></span>
              </span>
              <span class="text-stone font-bold uppercase tracking-wider ml-1">
                PLATE // 0{{ index + 1 }}
              </span>
            </div>

            <!-- Simulated Browser URL Bar -->
            <div v-if="project.demoUrl" class="hidden sm:flex items-center gap-1.5 px-3 py-0.5 bg-cream border border-stone-light text-[10px] text-stone">
              <span class="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
              <span class="truncate max-w-[200px] font-mono text-ink">
                {{ project.demoUrl.replace('https://', '') }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-vermillion font-bold uppercase tracking-wider">{{ project.status }}</span>
            </div>
          </div>

          <!-- Multiple Scrollable Images Case -->
          <div v-if="project.images && project.images.length > 0" class="relative group">
            <!-- Scrollable Viewport -->
            <div
              ref="scrollContainer"
              class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar bg-ink"
              @scroll.passive="handleScroll"
            >
              <div
                v-for="(img, imgIdx) in project.images"
                :key="imgIdx"
                class="w-full flex-shrink-0 snap-center relative aspect-video flex items-center justify-center bg-ink overflow-hidden"
              >
                <img
                  :src="img.url"
                  :alt="img.title || project.title"
                  class="w-full h-full object-cover object-top select-none"
                  loading="lazy"
                  width="1200"
                  height="675"
                />
              </div>
            </div>

            <!-- Scroll Navigation Buttons (Prev / Next) -->
            <button
              v-if="project.images.length > 1"
              type="button"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-cream border-2 border-ink text-ink font-bold font-mono text-sm flex items-center justify-center shadow-[2px_2px_0px_0px_#1a1a1a] hover:bg-vermillion hover:text-cream transition-colors z-10 cursor-pointer"
              aria-label="Previous screenshot"
              @click="scrollToImage(Math.max(0, activeImageIndex - 1))"
            >
              ←
            </button>
            <button
              v-if="project.images.length > 1"
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-cream border-2 border-ink text-ink font-bold font-mono text-sm flex items-center justify-center shadow-[2px_2px_0px_0px_#1a1a1a] hover:bg-vermillion hover:text-cream transition-colors z-10 cursor-pointer"
              aria-label="Next screenshot"
              @click="scrollToImage(Math.min(project.images.length - 1, activeImageIndex + 1))"
            >
              →
            </button>

            <!-- Bottom Gallery Bar (Pill selector & Caption) -->
            <div class="px-4 py-2.5 bg-cream-dark border-t-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <div class="flex items-center gap-2">
                <span class="text-vermillion font-bold uppercase text-[10px]">SCREEN // 0{{ activeImageIndex + 1 }}:</span>
                <span class="text-ink font-bold truncate">
                  {{ project.images[activeImageIndex]?.title || `Screen ${activeImageIndex + 1}` }}
                </span>
              </div>

              <!-- Pagination Indicator / Thumbnails -->
              <div class="flex items-center gap-1.5">
                <button
                  v-for="(img, imgIdx) in project.images"
                  :key="imgIdx"
                  type="button"
                  class="px-2.5 py-0.5 border text-[10px] font-bold transition-all cursor-pointer font-mono"
                  :class="activeImageIndex === imgIdx
                    ? 'bg-vermillion text-cream border-ink shadow-[1px_1px_0px_0px_#1a1a1a]'
                    : 'bg-cream text-stone border-stone-light hover:border-ink hover:text-ink'"
                  @click="scrollToImage(imgIdx)"
                >
                  0{{ imgIdx + 1 }}
                </button>
                <span class="text-[10px] text-stone font-mono ml-1 hidden sm:inline">
                  (SCROLL ⇄)
                </span>
              </div>
            </div>
          </div>

          <!-- Single Image Fallback -->
          <div v-else-if="project.imageUrl" class="aspect-video flex items-center justify-center bg-ink">
            <img
              :src="project.imageUrl"
              :alt="project.title"
              class="w-full h-full object-cover select-none"
              loading="lazy"
            />
          </div>

          <!-- Placeholder Fallback -->
          <div v-else class="placeholder-marker text-center w-full py-12 px-4 aspect-video flex flex-col items-center justify-center">
            <div class="font-mono text-xs uppercase tracking-widest text-ink font-bold mb-1">
              [ VISUAL ARTIFACT PENDING ]
            </div>
            <div class="font-mono text-[11px] text-stone">
              {{ project.imagePlaceholder }}
            </div>
          </div>
        </div>
      </div>

      <!-- Info Area -->
      <div
        class="lg:col-span-5"
        :class="{ 'lg:order-1': reversed }"
      >
        <div class="flex items-center gap-3 mb-2">
          <span class="font-display font-black text-2xl text-vermillion">
            0{{ index + 1 }}
          </span>
          <span class="font-mono text-xs text-stone tracking-[0.2em] uppercase font-bold">
            // {{ project.label }}
          </span>
        </div>

        <h3 class="font-display font-extrabold text-2xl sm:text-3xl text-ink tracking-tight mb-3">
          {{ project.title }}
        </h3>

        <p class="text-stone font-body text-sm leading-relaxed mb-6">
          <span v-if="project.description.startsWith('[PLACEHOLDER')" class="placeholder-marker block">
            {{ project.description }}
          </span>
          <span v-else>{{ project.description }}</span>
        </p>

        <!-- Tech Tags -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="tech in project.tech"
            :key="tech"
            class="font-mono text-[11px] font-semibold text-ink border border-ink bg-cream px-2.5 py-0.5 uppercase tracking-wider"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Metadata -->
        <div class="font-mono text-xs text-stone space-y-1 pb-6 mb-6 border-b border-stone-light">
          <div><span class="text-ink font-semibold">// ROLE:</span> {{ project.role }}</div>
          <div><span class="text-ink font-semibold">// STATUS:</span> {{ project.status }}</div>
          <div v-if="project.team"><span class="text-ink font-semibold">// SCOPE:</span> {{ project.team }}</div>
        </div>

        <!-- Action CTAs -->
        <div class="flex items-center gap-3 flex-wrap">
          <TechButton v-if="project.demoUrl" :href="project.demoUrl" variant="red">
            View Online ↗
          </TechButton>
          <TechButton v-if="project.repoUrl" :href="project.repoUrl" variant="primary">
            Source Code →
          </TechButton>
        </div>
      </div>
    </div>
  </div>
</template>
