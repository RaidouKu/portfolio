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
      <!-- Media / Preview Frame (Manga Plate) -->
      <div
        class="lg:col-span-7"
        :class="{ 'lg:order-2': reversed }"
      >
        <div class="border-2 border-ink bg-cream overflow-hidden relative">
          <!-- Top plate label -->
          <div class="flex items-center justify-between px-3 py-1.5 border-b border-ink bg-cream-dark text-[10px] font-mono text-stone font-bold uppercase tracking-wider">
            <span>PLATE // 0{{ index + 1 }}</span>
            <span class="text-vermillion">{{ project.status }}</span>
          </div>

          <div class="aspect-video flex items-center justify-center p-4">
            <img
              v-if="project.imageUrl"
              :src="project.imageUrl"
              :alt="project.title"
              class="w-full h-full object-cover"
              loading="lazy"
              width="800"
              height="450"
            />
            <div v-else class="placeholder-marker text-center w-full py-12 px-4">
              <div class="font-mono text-xs uppercase tracking-widest text-ink font-bold mb-1">
                [ VISUAL ARTIFACT PENDING ]
              </div>
              <div class="font-mono text-[11px] text-stone">
                {{ project.imagePlaceholder }}
              </div>
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
          <TechButton v-if="project.repoUrl" :href="project.repoUrl" variant="primary">
            Source Code →
          </TechButton>
          <TechButton v-if="project.demoUrl" :href="project.demoUrl" variant="red">
            Live Preview →
          </TechButton>
        </div>
      </div>
    </div>
  </div>
</template>
