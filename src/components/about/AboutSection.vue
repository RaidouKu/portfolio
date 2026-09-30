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
            PROFILE &amp; CAPABILITIES ARCHIVE
          </span>
        </div>
        <h2 class="font-display font-black text-4xl sm:text-5xl text-ink tracking-tight">
          ABOUT &amp; CAPABILITIES<span class="text-vermillion">.</span>
        </h2>
        <div class="rule-red w-20 mt-4"></div>
      </div>

      <!-- 1. FULL-WIDTH EDITORIAL DOSSIER (Bio on Left, Registration Data on Right) -->
      <div class="bg-cream-dark border-2 border-ink p-7 sm:p-9 shadow-[8px_8px_0px_0px_#1a1a1a] mb-12">
        <div class="flex items-center justify-between border-b-2 border-ink pb-4 mb-8">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 bg-vermillion rounded-full"></span>
            <div>
              <span class="font-mono text-xs font-bold text-vermillion tracking-widest uppercase block">
                DOSSIER // BIO
              </span>
              <h3 class="font-display font-black text-2xl text-ink">
                CURRICULUM &amp; BACKGROUND
              </h3>
            </div>
          </div>
          <div class="font-mono text-xs text-stone tracking-widest uppercase hidden sm:block">
            NCST-PH // 2026
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left: Lengthened Bio Prose (7 cols) -->
          <div class="lg:col-span-7 space-y-5">
            <div
              v-if="profile.bio.startsWith('[PLACEHOLDER')"
              class="placeholder-marker block"
            >
              {{ profile.bio }}
            </div>
            <template v-else>
              <div
                v-for="(paragraph, idx) in profile.bio.split('\n\n')"
                :key="idx"
                class="relative pl-4 border-l-2 border-stone-light hover:border-vermillion transition-colors group"
              >
                <span class="block font-mono text-[10px] font-bold text-vermillion uppercase tracking-widest mb-1.5 select-none">
                  SECTION 0{{ idx + 1 }} // {{ idx === 0 ? 'ACADEMIC_FOUNDATION' : idx === 1 ? 'FULLSTACK_SCOPE' : 'ENGINEERING_METHOD' }}
                </span>
                <p class="font-heading text-sm sm:text-base text-ink leading-relaxed font-normal">
                  {{ paragraph }}
                </p>
              </div>
            </template>
          </div>

          <!-- Right: Enlarged Credential Plate (5 cols) -->
          <div class="lg:col-span-5 bg-cream border-2 border-ink p-5 sm:p-6 shadow-[4px_4px_0px_0px_#1a1a1a]">
            <div class="flex items-center justify-between border-b border-stone-light pb-3 mb-4">
              <span class="font-mono text-xs font-bold text-vermillion tracking-widest uppercase">
                REGISTRATION DATA // 登録情報
              </span>
              <span class="w-2 h-2 bg-vermillion rounded-full"></span>
            </div>

            <div class="space-y-3">
              <!-- Subject Name -->
              <div class="p-3 bg-cream-dark border border-stone-light hover:border-ink transition-colors">
                <span class="block font-mono text-[10px] font-bold text-stone tracking-wider uppercase mb-0.5">
                  SUBJECT NAME
                </span>
                <span class="font-heading font-extrabold text-base sm:text-lg text-ink tracking-tight">
                  {{ profile.name }}
                </span>
              </div>

              <!-- Affiliation -->
              <div class="p-3 bg-cream-dark border border-stone-light hover:border-ink transition-colors">
                <span class="block font-mono text-[10px] font-bold text-stone tracking-wider uppercase mb-0.5">
                  AFFILIATION
                </span>
                <span class="font-heading font-bold text-sm sm:text-base text-ink tracking-tight">
                  {{ profile.school }}
                </span>
              </div>

              <!-- Year Level & Program Dual Card -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div class="p-3 bg-cream-dark border border-stone-light hover:border-ink transition-colors">
                  <span class="block font-mono text-[10px] font-bold text-stone tracking-wider uppercase mb-0.5">
                    YEAR LEVEL
                  </span>
                  <span class="font-heading font-extrabold text-sm sm:text-base text-vermillion tracking-tight">
                    3rd Year
                  </span>
                </div>

                <div class="p-3 bg-cream-dark border border-stone-light hover:border-ink transition-colors">
                  <span class="block font-mono text-[10px] font-bold text-stone tracking-wider uppercase mb-0.5">
                    PROGRAM
                  </span>
                  <span class="font-heading font-bold text-sm sm:text-base text-ink tracking-tight">
                    B.S.I.T.
                  </span>
                </div>
              </div>

              <!-- Core Discipline -->
              <div class="p-3 bg-cream-dark border border-stone-light hover:border-ink transition-colors">
                <span class="block font-mono text-[10px] font-bold text-stone tracking-wider uppercase mb-0.5">
                  CORE DISCIPLINE
                </span>
                <span class="font-heading font-bold text-sm sm:text-base text-ink tracking-tight">
                  Frontend &amp; Backend Engineering
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 3D KEYCAP SWITCHBOARD (Down Below the About Section) -->
      <div class="bg-cream-dark border-2 border-ink p-7 sm:p-9 shadow-[8px_8px_0px_0px_#1a1a1a] mb-12">
        <!-- Control Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-8 border-b-2 border-ink gap-3">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 bg-vermillion rounded-full animate-pulse" />
            <div>
              <span class="font-mono text-xs font-bold text-vermillion tracking-widest uppercase block">
                CAPABILITIES // SKILL MATRIX
              </span>
              <h3 class="font-display font-black text-2xl text-ink">
                3D MECHANICAL KEYCAP SWITCHBOARD
              </h3>
            </div>
          </div>

          <!-- Sound Toggle & Click Counter -->
          <div class="flex items-center gap-4 font-mono text-xs">
            <button
              type="button"
              class="px-3 py-1.5 border-2 border-ink bg-cream text-ink font-bold hover:bg-ink hover:text-cream transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#1a1a1a]"
              @click="soundEnabled = !soundEnabled"
            >
              {{ soundEnabled ? '🔊 SFX: ON' : '🔇 SFX: OFF' }}
            </button>
            <span class="text-stone">
              KEYSTROKES: <strong class="text-vermillion font-extrabold text-sm">{{ clickCount }}</strong>
            </span>
          </div>
        </div>

        <!-- Two-column spread for Keycaps & Live HUD Inspector -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- 4x3 Keycap Macropad Grid (7 cols) -->
          <div class="lg:col-span-7">
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
              <Keycap3D
                v-for="skill in allSkills"
                :key="skill.name"
                :skill="skill"
                :variant="skill.variant"
                :active="selectedSkill?.name === skill.name"
                @click="handleKeySelect"
              />
            </div>

            <!-- Keycap Legend -->
            <div class="mt-6 pt-4 border-t border-stone-light flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-stone">
              <div class="flex items-center gap-4 flex-wrap">
                <span class="flex items-center gap-1.5">
                  <span class="w-3 h-3 bg-vermillion border border-ink"></span>
                  DESIGN &amp; NOVELTY
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="w-3 h-3 bg-cream border border-ink"></span>
                  FRONTEND ALPHAS
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="w-3 h-3 bg-indigo border border-ink"></span>
                  BACKEND
                </span>
                <span class="flex items-center gap-1.5">
                  <span class="w-3 h-3 bg-ochre border border-ink"></span>
                  DEV TOOLS
                </span>
              </div>
              <span class="text-vermillion font-bold">
                * CLICK ANY KEYCAP FOR TACTILE SFX
              </span>
            </div>
          </div>

          <!-- Live HUD Inspector Plate (5 cols) -->
          <div class="lg:col-span-5 bg-cream border-2 border-ink p-6 sm:p-7 shadow-[4px_4px_0px_0px_#1a1a1a]">
            <div class="flex items-center justify-between border-b border-stone-light pb-3 mb-5">
              <span class="font-mono text-xs font-bold text-vermillion tracking-widest uppercase">
                INSPECTOR // KEY READOUT
              </span>
              <span class="font-mono text-xs text-stone font-bold">
                ACTIVE
              </span>
            </div>

            <div v-if="selectedSkill" class="space-y-5">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="px-2 py-0.5 bg-vermillion text-cream font-mono text-[10px] font-bold uppercase tracking-wider">
                      KEY [ {{ selectedSkill.key }} ]
                    </span>
                    <span class="font-mono text-xs text-stone font-bold uppercase">
                      {{ selectedSkill.category }}
                    </span>
                  </div>
                  <h4 class="font-display font-black text-2xl text-ink">
                    {{ selectedSkill.name }}
                  </h4>
                </div>
                <div class="hanko">
                  {{ selectedSkill.jp }}
                </div>
              </div>

              <!-- Proficiency Gauge -->
              <div class="p-4 bg-cream-dark border border-stone-light">
                <div class="flex items-center justify-between mb-2">
                  <span class="font-mono text-xs font-bold text-stone uppercase tracking-wider">
                    TECHNICAL MASTERY
                  </span>
                  <span class="font-display font-black text-xl text-vermillion">
                    {{ selectedSkill.level }}%
                  </span>
                </div>
                <div class="w-full h-2 bg-stone-light overflow-hidden">
                  <div
                    class="h-full bg-vermillion transition-all duration-300"
                    :style="{ width: `${selectedSkill.level}%` }"
                  />
                </div>
              </div>

              <!-- Usage Specification -->
              <div class="space-y-1.5">
                <span class="font-mono text-xs font-bold text-stone uppercase tracking-wider block">
                  SYSTEM USAGE &amp; APPLICATION
                </span>
                <p class="font-heading text-sm text-ink leading-relaxed">
                  {{ selectedSkill.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. GITHUB CONTRIBUTIONS & CODE ACTIVITY CARD -->
      <div class="bg-cream-dark border-2 border-ink p-7 sm:p-9 shadow-[8px_8px_0px_0px_#1a1a1a]">
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
