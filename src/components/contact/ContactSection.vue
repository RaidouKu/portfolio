<script setup>
import { ref, onMounted } from 'vue'
import { profile } from '../../assets/data/profile.js'
import { createSectionReveal } from '../../utils/animations.js'
import TechButton from '../ui/TechButton.vue'

const sectionRef = ref(null)

const contactLines = [
  { label: 'DIRECT EMAIL', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GITHUB REPOSITORY', value: '@RaidouKu', href: profile.github },
]

Object.entries(profile.socials).forEach(([key, value]) => {
  if (value) {
    contactLines.push({ label: key.toUpperCase(), value, href: value })
  }
})

onMounted(() => {
  createSectionReveal(sectionRef.value)
})
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="relative py-24 px-4 sm:px-6 lg:px-12 border-t-2 border-ink overflow-hidden"
  >
    <!-- Background Watermark -->
    <div class="absolute right-8 top-12 section-number">
      03
    </div>

    <div class="max-w-content mx-auto max-w-3xl relative z-10">
      <!-- Section Header -->
      <div class="mb-14 text-center sm:text-left">
        <div class="flex items-center justify-center sm:justify-start gap-3 mb-2">
          <span class="px-2 py-0.5 bg-vermillion text-cream font-mono text-[10px] uppercase tracking-wider font-bold">
            SECTION 03
          </span>
          <span class="font-mono text-xs text-stone tracking-[0.2em] uppercase">
            COMMUNICATIONS
          </span>
        </div>
        <h2 class="font-display font-black text-4xl sm:text-5xl text-ink tracking-tight">
          GET IN TOUCH<span class="text-vermillion">.</span>
        </h2>
        <div class="rule-red w-20 mt-4 mx-auto sm:mx-0"></div>
        <p class="mt-4 text-stone font-body text-base max-w-xl">
          Interested in working together or exploring a design collaboration? Send a dispatch.
        </p>
      </div>

      <!-- Editorial Dispatch Card -->
      <div class="bg-cream-dark border-2 border-ink p-8 sm:p-10 shadow-[8px_8px_0px_0px_#1a1a1a]">
        <div class="flex items-start justify-between border-b-2 border-ink pb-4 mb-6">
          <div>
            <div class="font-mono text-xs text-vermillion font-bold uppercase tracking-widest">
              OFFICIAL DISPATCH
            </div>
            <div class="font-display font-extrabold text-xl text-ink">
              LEBRON JAMES PANGAN
            </div>
          </div>
          <div class="hanko">
            LJ
          </div>
        </div>

        <div class="space-y-4 mb-8">
          <div
            v-for="item in contactLines"
            :key="item.label"
            class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-cream border border-stone-light hover:border-vermillion transition-colors gap-2"
          >
            <span class="font-mono text-xs text-stone font-semibold tracking-wider">
              {{ item.label }}:
            </span>
            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-xs text-ink hover:text-vermillion font-bold transition-colors underline underline-offset-4 decoration-vermillion/40 hover:decoration-vermillion break-all"
            >
              {{ item.value }} &rarr;
            </a>
          </div>
        </div>

        <div class="border-t border-stone-light pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="font-mono text-xs text-stone">
            STATUS: <span class="text-vermillion font-bold">ACCEPTING INQUIRIES</span>
          </div>
          <TechButton :href="`mailto:${profile.email}`" variant="primary">
            Send Email Dispatch &rarr;
          </TechButton>
        </div>
      </div>
    </div>
  </section>
</template>
