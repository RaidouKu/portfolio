<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
const isModalOpen = ref(false)

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

function openModal(idx = null) {
  if (idx !== null) {
    activeImageIndex.value = idx
  }
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleKeydown)
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    closeModal()
  } else if (e.key === 'ArrowRight' && props.project.images?.length > 1) {
    activeImageIndex.value = (activeImageIndex.value + 1) % props.project.images.length
  } else if (e.key === 'ArrowLeft' && props.project.images?.length > 1) {
    activeImageIndex.value = (activeImageIndex.value - 1 + props.project.images.length) % props.project.images.length
  }
}

onMounted(() => {
  createSectionReveal(cardRef.value)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
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

            <!-- Action Controls (Maximize & Status) -->
            <div class="flex items-center gap-2">
              <button
                v-if="(project.images && project.images.length > 0) || project.imageUrl"
                type="button"
                class="flex items-center gap-1 px-2 py-0.5 bg-cream border border-ink text-[10px] font-mono font-bold text-ink hover:bg-vermillion hover:text-cream transition-colors cursor-pointer shadow-[1px_1px_0px_0px_#1a1a1a]"
                title="Maximize / Fullscreen Preview"
                @click="openModal(activeImageIndex)"
              >
                <span>⛶</span>
                <span>MAXIMIZE</span>
              </button>
              <span class="text-vermillion font-bold uppercase tracking-wider hidden sm:inline">
                {{ project.status }}
              </span>
            </div>
          </div>

          <!-- Multiple Scrollable Images Case -->
          <div v-if="project.images && project.images.length > 0" class="relative group">
            <!-- Scrollable Viewport (Fits Entire Screenshot with object-contain) -->
            <div
              ref="scrollContainer"
              class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar bg-[#0e1017]"
              @scroll.passive="handleScroll"
            >
              <div
                v-for="(img, imgIdx) in project.images"
                :key="imgIdx"
                class="w-full flex-shrink-0 snap-center relative h-64 sm:h-80 md:h-96 flex items-center justify-center bg-[#0e1017] p-2 cursor-pointer"
                @click="openModal(imgIdx)"
              >
                <img
                  :src="img.url"
                  :alt="img.title || project.title"
                  class="w-full h-full object-contain select-none transition-transform duration-200 group-hover:scale-[1.01]"
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
          <div
            v-else-if="project.imageUrl"
            class="h-64 sm:h-80 md:h-96 flex items-center justify-center bg-[#0e1017] p-2 cursor-pointer"
            @click="openModal(0)"
          >
            <img
              :src="project.imageUrl"
              :alt="project.title"
              class="w-full h-full object-contain select-none"
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

    <!-- FULLSCREEN / MAXIMIZE LIGHTBOX MODAL -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[9999] flex flex-col justify-between bg-ink/90 backdrop-blur-md p-4 sm:p-6 animate-fadeIn select-none"
        @click.self="closeModal"
      >
        <!-- Modal Top Bar -->
        <div class="w-full max-w-6xl mx-auto flex items-center justify-between pb-3 border-b border-stone text-cream font-mono">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 bg-vermillion rounded-full"></span>
            <span class="text-xs uppercase tracking-wider font-bold">
              {{ project.title }} // SCREEN 0{{ activeImageIndex + 1 }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <a
              v-if="project.demoUrl"
              :href="project.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-cream text-ink text-xs font-bold hover:bg-vermillion hover:text-cream transition-colors"
            >
              Open Live Site ↗
            </a>
            <button
              type="button"
              class="px-3 py-1 bg-vermillion text-cream font-mono text-xs font-bold hover:bg-white hover:text-ink transition-colors cursor-pointer border border-cream/20 shadow-[2px_2px_0px_0px_#1a1a1a]"
              @click="closeModal"
            >
              ✕ CLOSE [ESC]
            </button>
          </div>
        </div>

        <!-- Modal Center Image Viewport with Nav Arrows -->
        <div class="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center p-2 sm:p-4 my-auto overflow-hidden">
          <button
            v-if="project.images && project.images.length > 1"
            type="button"
            class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-cream border-2 border-ink text-ink font-mono font-bold text-lg flex items-center justify-center shadow-[3px_3px_0px_0px_#1a1a1a] hover:bg-vermillion hover:text-cream transition-colors z-20 cursor-pointer"
            aria-label="Previous image"
            @click="activeImageIndex = (activeImageIndex - 1 + project.images.length) % project.images.length"
          >
            ←
          </button>

          <img
            :src="project.images ? project.images[activeImageIndex].url : project.imageUrl"
            :alt="project.title"
            class="max-h-[75vh] w-auto max-w-full object-contain border-2 border-cream/40 shadow-2xl bg-black"
          />

          <button
            v-if="project.images && project.images.length > 1"
            type="button"
            class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-cream border-2 border-ink text-ink font-mono font-bold text-lg flex items-center justify-center shadow-[3px_3px_0px_0px_#1a1a1a] hover:bg-vermillion hover:text-cream transition-colors z-20 cursor-pointer"
            aria-label="Next image"
            @click="activeImageIndex = (activeImageIndex + 1) % project.images.length"
          >
            →
          </button>
        </div>

        <!-- Modal Bottom Bar -->
        <div class="w-full max-w-6xl mx-auto pt-3 border-t border-stone flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone gap-2">
          <div class="text-center sm:text-left text-cream font-medium">
            {{ project.images ? project.images[activeImageIndex]?.caption : project.title }}
          </div>
          <div class="flex items-center gap-3">
            <span class="text-stone">USE ← / → KEYS TO SWITCH</span>
            <div v-if="project.images && project.images.length > 1" class="flex gap-1.5">
              <button
                v-for="(img, idx) in project.images"
                :key="idx"
                type="button"
                class="w-3 h-3 rounded-full transition-all cursor-pointer"
                :class="activeImageIndex === idx ? 'bg-vermillion scale-110' : 'bg-stone/50 hover:bg-stone'"
                @click="activeImageIndex = idx"
              />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
