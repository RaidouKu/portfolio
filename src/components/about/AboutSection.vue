<script setup>
import { ref, onMounted } from 'vue'
import { profile } from '../../assets/data/profile.js'
import { createSectionReveal, createStaggerReveal } from '../../utils/animations.js'
import GlassPanel from '../ui/GlassPanel.vue'
import SystemLabel from '../ui/SystemLabel.vue'
import ProgressBar from '../ui/ProgressBar.vue'

const sectionRef = ref(null)
const skillsRef = ref(null)

const skillCategories = [
  { key: 'design', label: 'DESIGN_TOOLS', color: 'amber' },
  { key: 'frontend', label: 'FRONTEND', color: 'teal' },
  { key: 'backend', label: 'BACKEND', color: 'teal' },
  { key: 'tools', label: 'DEV_TOOLS', color: 'teal' },
]

onMounted(() => {
  createSectionReveal(sectionRef.value)
  if (skillsRef.value) {
    createStaggerReveal(skillsRef.value, '[data-skill-card]', 0.12)
  }
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="relative py-20 lg:py-28 px-4 sm:px-6"
  >
    <div class="max-w-content mx-auto">
      <!-- Section header -->
      <div class="mb-12">
        <SystemLabel text="SYS.PROFILE" color="teal" class="mb-3 block" />
        <h2 class="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-wide">
          About<span class="text-accent-teal">_</span>
        </h2>
      </div>

      <!-- Bio + Skills grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Bio panel -->
        <div class="lg:col-span-5">
          <GlassPanel>
            <SystemLabel text="BIO" color="amber" class="mb-4 block" />
            <p class="text-text-primary leading-relaxed font-body">
              <span v-if="profile.bio.startsWith('[PLACEHOLDER')" class="placeholder-marker">
                {{ profile.bio }}
              </span>
              <span v-else>{{ profile.bio }}</span>
            </p>
            <div class="mt-6 pt-4 border-t border-text-muted/20">
              <div class="font-mono text-xs text-text-muted space-y-1">
                <div>// AFFILIATION: {{ profile.school }}</div>
                <div>// STATUS: <span class="text-accent-teal">ACTIVE</span></div>
              </div>
            </div>
          </GlassPanel>
        </div>

        <!-- Skills panel -->
        <div class="lg:col-span-7" ref="skillsRef">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassPanel
              v-for="category in skillCategories"
              :key="category.key"
              data-skill-card
            >
              <SystemLabel :text="category.label" :color="category.color" class="mb-4 block" />
              <div class="space-y-3">
                <ProgressBar
                  v-for="skill in profile.skills[category.key]"
                  :key="skill.name"
                  :label="skill.name"
                  :value="skill.level"
                />
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
