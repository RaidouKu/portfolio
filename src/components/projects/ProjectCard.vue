<script setup>
import { ref, onMounted } from 'vue'
import { createSectionReveal } from '../../utils/animations.js'
import GlassPanel from '../ui/GlassPanel.vue'
import SystemLabel from '../ui/SystemLabel.vue'
import TechButton from '../ui/TechButton.vue'

const props = defineProps({
  project: { type: Object, required: true },
  reversed: { type: Boolean, default: false },
})

const cardRef = ref(null)

onMounted(() => {
  createSectionReveal(cardRef.value)
})
</script>

<template>
  <div ref="cardRef" class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
    <!-- Image area -->
    <div
      class="lg:col-span-7"
      :class="{ 'lg:order-2': reversed }"
    >
      <GlassPanel class="overflow-hidden">
        <div class="aspect-video bg-bg-secondary flex items-center justify-center">
          <img
            v-if="project.imageUrl"
            :src="project.imageUrl"
            :alt="project.title"
            class="w-full h-full object-cover"
            loading="lazy"
            width="800"
            height="450"
          />
          <div v-else class="placeholder-marker text-center p-8">
            [PLACEHOLDER: {{ project.imagePlaceholder }}]
          </div>
        </div>
      </GlassPanel>
    </div>

    <!-- Info area -->
    <div
      class="lg:col-span-5"
      :class="{ 'lg:order-1': reversed }"
    >
      <SystemLabel :text="project.label" color="amber" class="mb-3 block" />

      <h3 class="font-heading font-bold text-2xl sm:text-3xl text-text-primary tracking-wide mb-4">
        {{ project.title }}
      </h3>

      <p class="text-text-primary/80 leading-relaxed mb-6 font-body">
        <span v-if="project.description.startsWith('[PLACEHOLDER')" class="placeholder-marker">
          {{ project.description }}
        </span>
        <span v-else>{{ project.description }}</span>
      </p>

      <!-- Tech tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in project.tech"
          :key="tech"
          class="font-mono text-[11px] text-accent-teal border border-accent-teal/30 px-2.5 py-1 uppercase tracking-wider"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Meta -->
      <div class="font-mono text-xs text-text-muted space-y-1 mb-6">
        <div>// ROLE: {{ project.role }}</div>
        <div>// STATUS: {{ project.status }}</div>
        <div v-if="project.team">// TEAM: {{ project.team }}</div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <TechButton v-if="project.repoUrl" :href="project.repoUrl" variant="primary">
          Source Code →
        </TechButton>
        <TechButton v-if="project.demoUrl" :href="project.demoUrl" variant="amber">
          Live Demo →
        </TechButton>
      </div>
    </div>
  </div>
</template>
