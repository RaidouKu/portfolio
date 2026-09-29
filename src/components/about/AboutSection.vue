<script setup>
import { ref, onMounted } from 'vue'
import { profile } from '../../assets/data/profile.js'
import { createSectionReveal } from '../../utils/animations.js'
import Keycap3D from '../ui/Keycap3D.vue'

const sectionRef = ref(null)
const soundEnabled = ref(true)
const clickCount = ref(0)

// Assemble 4x3 mechanical macropad skills with 3D colorway variants
const allSkills = [
  // Row 1: Design & Creative (Vermillion Artisan Novelty Caps)
  { ...profile.skills.design[0], category: 'DESIGN & UI/UX', variant: 'vermillion' },
  { ...profile.skills.design[1], category: 'DESIGN & UI/UX', variant: 'vermillion' },
  { ...profile.skills.design[2], category: 'DESIGN & UI/UX', variant: 'vermillion' },
  { ...profile.skills.tools[0], category: 'DESIGN & UI/UX', variant: 'vermillion' },

  // Row 2: Frontend Engineering (Cream Alphas + Vue Accent)
  { ...profile.skills.frontend[0], category: 'FRONTEND STACK', variant: 'default' },
  { ...profile.skills.frontend[1], category: 'FRONTEND STACK', variant: 'default' },
  { ...profile.skills.frontend[2], category: 'FRONTEND STACK', variant: 'vermillion' },
  { ...profile.skills.frontend[3], category: 'FRONTEND STACK', variant: 'default' },

  // Row 3: Systems & Tooling (Dark & Ochre Modifiers)
  { ...profile.skills.backend[0], category: 'BACKEND SYSTEMS', variant: 'ink' },
  { ...profile.skills.backend[1], category: 'BACKEND SYSTEMS', variant: 'ink' },
  { ...profile.skills.tools[1], category: 'TOOLING & GIT', variant: 'ochre' },
  { ...profile.skills.tools[2], category: 'TOOLING & DEV', variant: 'ochre' },
]

// Default selected skill is Vue.js
const selectedSkill = ref(allSkills[6])

function playSwitchSound() {
  clickCount.value++
  if (!soundEnabled.value) return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(170, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.045)
  } catch (e) {
    // Audio context may require prior user interaction
  }
}

function handleKeySelect(skill) {
  selectedSkill.value = skill
  playSwitchSound()
}

onMounted(() => {
  createSectionReveal(sectionRef.value)
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
            PROFILE &amp; 3D KEYCAP SWITCHBOARD
          </span>
        </div>
        <h2 class="font-display font-black text-4xl sm:text-5xl text-ink tracking-tight">
          ABOUT &amp; CAPABILITIES<span class="text-vermillion">.</span>
        </h2>
        <div class="rule-red w-20 mt-4"></div>
      </div>

      <!-- Bio + 3D Keycap Switchboard Grid -->
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

            <div class="text-ink leading-relaxed font-body text-sm sm:text-base mb-6 space-y-3">
              <span v-if="profile.bio.startsWith('[PLACEHOLDER')" class="placeholder-marker block">
                {{ profile.bio }}
              </span>
              <template v-else>
                <p v-for="(paragraph, idx) in profile.bio.split('\n\n')" :key="idx">
                  {{ paragraph }}
                </p>
              </template>
            </div>

            <div class="pt-4 border-t border-stone-light">
              <div class="font-mono text-xs text-stone space-y-1.5">
                <div><span class="text-ink font-semibold">SUBJECT:</span> {{ profile.name }}</div>
                <div><span class="text-ink font-semibold">AFFILIATION:</span> {{ profile.school }}</div>
                <div><span class="text-ink font-semibold">YEAR LEVEL:</span> 3rd Year Undergraduate</div>
                <div><span class="text-ink font-semibold">PROGRAM:</span> B.S. Information Technology (BSIT)</div>
                <div><span class="text-ink font-semibold">DISCIPLINE:</span> Frontend &amp; Backend Engineering</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3D Interactive Mechanical Keycaps Switchboard -->
        <div class="lg:col-span-7">
          <div class="bg-cream-dark border-2 border-ink p-6 sm:p-7 shadow-[6px_6px_0px_0px_#1a1a1a]">
            <!-- Deck Control Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-stone-light gap-2">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 bg-vermillion rounded-full animate-pulse" />
                <span class="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                  3D KEYCAP MACROPAD // SKILL MATRIX
                </span>
              </div>

              <!-- Sound Toggle & Click Counter -->
              <div class="flex items-center gap-3 font-mono text-[11px]">
                <button
                  type="button"
                  class="px-2 py-0.5 border border-ink text-ink font-bold hover:bg-ink hover:text-cream transition-colors cursor-pointer"
                  @click="soundEnabled = !soundEnabled"
                >
                  {{ soundEnabled ? '🔊 SFX: ON' : '🔇 SFX: OFF' }}
                </button>
                <span class="text-stone">
                  CLICKS: <strong class="text-vermillion">{{ clickCount }}</strong>
                </span>
              </div>
            </div>

            <!-- The 3D Keycap Grid (4x3 Macropad) -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-4">
              <Keycap3D
                v-for="skill in allSkills"
                :key="skill.name"
                :skill="skill"
                :variant="skill.variant"
                :active="selectedSkill?.name === skill.name"
                @click="handleKeySelect"
              />
            </div>

            <!-- Interactive HUD Inspector Plate for Pressed Keycap -->
            <div
              v-if="selectedSkill"
              class="mt-4 p-4 sm:p-5 bg-cream border-2 border-ink flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="px-2 py-0.5 bg-vermillion text-cream font-mono text-[10px] font-bold uppercase tracking-wider">
                    KEY [ {{ selectedSkill.key }} ]
                  </span>
                  <span class="font-mono text-[10px] text-stone font-bold uppercase">
                    // {{ selectedSkill.category }}
                  </span>
                  <span class="font-mono text-xs text-vermillion font-bold">
                    {{ selectedSkill.jp }}
                  </span>
                </div>
                <h4 class="font-display font-extrabold text-lg text-ink">
                  {{ selectedSkill.name }}
                </h4>
                <p class="font-body text-xs text-stone max-w-md leading-relaxed">
                  {{ selectedSkill.desc }}
                </p>
              </div>

              <!-- Proficiency Gauge -->
              <div class="flex-shrink-0 text-left sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-light">
                <div class="font-mono text-[10px] text-stone uppercase tracking-wider">
                  PROFICIENCY
                </div>
                <div class="font-display font-black text-2xl text-vermillion">
                  {{ selectedSkill.level }}%
                </div>
                <!-- Mini Bar -->
                <div class="w-28 sm:w-28 h-1.5 bg-stone-light mt-1 overflow-hidden">
                  <div
                    class="h-full bg-vermillion transition-all duration-300"
                    :style="{ width: `${selectedSkill.level}%` }"
                  />
                </div>
              </div>
            </div>

            <!-- Keycap Colorway Legend -->
            <div class="mt-4 pt-3 border-t border-stone-light flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-stone">
              <div class="flex items-center gap-4 flex-wrap">
                <span class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 bg-vermillion border border-ink"></span>
                  DESIGN &amp; NOVELTY
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 bg-cream border border-ink"></span>
                  FRONTEND ALPHAS
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 bg-indigo border border-ink"></span>
                  BACKEND
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 bg-ochre border border-ink"></span>
                  DEV TOOLS
                </span>
              </div>
              <div>
                * PRESS ANY KEYCAP FOR TACTILE SFX
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
