<script setup>
import { ref, onMounted } from 'vue'
import { profile } from '../../assets/data/profile.js'
import { createSectionReveal } from '../../utils/animations.js'
import GlassPanel from '../ui/GlassPanel.vue'
import SystemLabel from '../ui/SystemLabel.vue'
import TechButton from '../ui/TechButton.vue'

const sectionRef = ref(null)

const contactLines = [
  { label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GITHUB', value: '@RaidouKu', href: profile.github },
]

// Add socials if they exist
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
    class="relative py-20 lg:py-28 px-4 sm:px-6"
  >
    <div class="max-w-content mx-auto max-w-2xl">
      <!-- Section header -->
      <div class="mb-12 text-center">
        <SystemLabel text="CONNECT" color="teal" class="mb-3 block" />
        <h2 class="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-wide">
          Contact<span class="text-accent-teal">_</span>
        </h2>
        <p class="mt-4 text-text-muted font-body">
          Open to opportunities, collaborations, and conversations.
        </p>
      </div>

      <!-- Terminal-style contact card -->
      <GlassPanel>
        <div class="font-mono text-sm space-y-3">
          <div class="text-text-muted mb-4">
            <span class="text-accent-teal">visitor@portfolio</span>:<span class="text-accent-amber">~</span>$ cat contact.info
          </div>

          <div
            v-for="item in contactLines"
            :key="item.label"
            class="flex items-start gap-3"
          >
            <span class="text-text-muted min-w-[80px]">{{ item.label }}:</span>
            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-teal hover:text-accent-teal-hover transition-colors duration-200 underline underline-offset-4 decoration-accent-teal/30 hover:decoration-accent-teal break-all"
            >
              {{ item.value }}
            </a>
          </div>

          <div class="mt-6 pt-4 border-t border-text-muted/20 text-text-muted">
            <span class="text-accent-teal">visitor@portfolio</span>:<span class="text-accent-amber">~</span>$
            <span class="inline-block w-2 h-4 bg-accent-teal ml-1 animate-pulse" />
          </div>
        </div>
      </GlassPanel>

      <!-- CTA -->
      <div class="mt-8 text-center">
        <TechButton :href="`mailto:${profile.email}`" variant="primary">
          Send Email →
        </TechButton>
      </div>
    </div>
  </section>
</template>
