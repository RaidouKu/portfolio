<script setup>
import { ref, onMounted } from 'vue'
import { profile } from '../../assets/data/profile.js'
import { createSectionReveal, createStaggerReveal } from '../../utils/animations.js'
import ProgressBar from '../ui/ProgressBar.vue'

const sectionRef = ref(null)
const skillsRef = ref(null)

const skillCategories = [
  { key: 'design', num: '01', label: 'DESIGN & UI/UX' },
  { key: 'frontend', num: '02', label: 'FRONTEND STACK' },
  { key: 'backend', num: '03', label: 'BACKEND SYSTEMS' },
  { key: 'tools', num: '04', label: 'TOOLING & WORKFLOW' },
]

onMounted(() => {
  createSectionReveal(sectionRef.value)
  if (skillsRef.value) {
    createStaggerReveal(skillsRef.value, '[data-skill-card]', 0.1)
  }
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="relative py-24 px-4 sm:px-6 lg:px-12 border-t-2 border-ink overflow-hidden"
  >
    <!-- Background Watermark -->
    <div class="absolute right-6 top-12 section-number">
      01
    </div>

    <div class="max-w-content mx-auto relative z-10">
      <!-- Section Header -->
      <div class="mb-14">
        <div class="flex items-center gap-3 mb-2">
          <span class="px-2 py-0.5 bg-vermillion text-cream font-mono text-[10px] uppercase tracking-wider font-bold">
            SECTION 01
          </span>
          <span class="font-mono text-xs text-stone tracking-[0.2em] uppercase">
            PROFILE &amp; DIAGNOSTICS
          </span>
        </div>
        <h2 class="font-display font-black text-4xl sm:text-5xl text-ink tracking-tight">
          ABOUT &amp; CAPABILITIES<span class="text-vermillion">.</span>
        </h2>
        <div class="rule-red w-20 mt-4"></div>
      </div>

      <!-- Bio + Skills Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Bio Card (Editorial Dossier) -->
        <div class="lg:col-span-5">
          <div class="bg-cream-dark border-2 border-ink p-7 shadow-[6px_6px_0px_0px_#1a1a1a]">
            <div class="flex items-center justify-between border-b border-stone-light pb-3 mb-5">
              <span class="font-mono text-xs font-bold text-vermillion tracking-widest uppercase">
                DOSSIER // BIO
              </span>
              <span class="font-mono text-[11px] text-stone">NCST-PH</span>
            </div>

            <p class="text-ink leading-relaxed font-body text-sm sm:text-base mb-6">
              <span v-if="profile.bio.startsWith('[PLACEHOLDER')" class="placeholder-marker block">
                {{ profile.bio }}
              </span>
              <span v-else>{{ profile.bio }}</span>
            </p>

            <div class="pt-4 border-t border-stone-light">
              <div class="font-mono text-xs text-stone space-y-1.5">
                <div><span class="text-ink font-semibold">SUBJECT:</span> {{ profile.name }}</div>
                <div><span class="text-ink font-semibold">AFFILIATION:</span> {{ profile.school }}</div>
                <div><span class="text-ink font-semibold">ACADEMIC:</span> B.S. Information Technology</div>
                <div><span class="text-ink font-semibold">FOCUS:</span> Interface Ergonomics &amp; Web Architectures</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Panels -->
        <div class="lg:col-span-7" ref="skillsRef">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="category in skillCategories"
              :key="category.key"
              data-skill-card
              class="bg-cream-dark border border-stone-light hover:border-vermillion transition-colors p-5"
            >
              <div class="flex items-center justify-between mb-4 border-b border-stone-light pb-2">
                <span class="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                  {{ category.label }}
                </span>
                <span class="font-mono text-[10px] text-vermillion font-bold">
                  {{ category.num }}
                </span>
              </div>

              <div class="space-y-3.5">
                <ProgressBar
                  v-for="skill in profile.skills[category.key]"
                  :key="skill.name"
                  :label="skill.name"
                  :value="skill.level"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GitHub Contributions & Code Activity Card -->
      <div class="mt-8 bg-cream-dark border-2 border-ink p-7 shadow-[6px_6px_0px_0px_#1a1a1a]">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-stone-light gap-2">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 bg-vermillion rounded-full"></span>
            <div>
              <span class="font-mono text-xs font-bold text-vermillion tracking-widest uppercase block">
                ACTIVITY ARCHIVE
              </span>
              <h3 class="font-display font-extrabold text-lg text-ink">
                GITHUB CODE COMMITS &amp; CONTRIBUTIONS
              </h3>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a
              :href="profile.github"
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-xs text-ink hover:text-vermillion font-bold underline underline-offset-4 decoration-vermillion/40 transition-colors"
            >
              @{{ profile.githubUsername }} on GitHub &rarr;
            </a>
          </div>
        </div>

        <!-- Heatmap Container -->
        <div class="bg-cream border border-stone-light p-4 overflow-x-auto">
          <img
            :src="`https://ghchart.rshah.org/c0392b/${profile.githubUsername}`"
            :alt="`${profile.name}'s GitHub Contributions`"
            class="w-full min-w-[650px] h-auto block select-none"
            loading="lazy"
          />
        </div>

        <!-- Footer / Metadata for activity -->
        <div class="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between font-mono text-[11px] text-stone gap-2 pt-2">
          <div>
            // SOURCE: LIVE GITHUB COMMITS MATRIX (AUTO-SYNCED)
          </div>
          <div class="flex items-center gap-3">
            <span>LESS</span>
            <div class="flex items-center gap-1">
              <span class="w-2.5 h-2.5 bg-[#eeeeee] border border-stone-light"></span>
              <span class="w-2.5 h-2.5 bg-[#eec8c4]"></span>
              <span class="w-2.5 h-2.5 bg-[#df7d74]"></span>
              <span class="w-2.5 h-2.5 bg-[#c0392b]"></span>
            </div>
            <span>MORE</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
