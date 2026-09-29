<script setup>
import { projects } from '../../assets/data/projects.js'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <section class="relative py-24 px-4 sm:px-6 lg:px-12 border-t-2 border-ink overflow-hidden">
    <!-- Watermark Background -->
    <div class="absolute right-8 top-12 section-number">
      02
    </div>

    <div class="max-w-content mx-auto relative z-10">
      <!-- Section Header -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-2">
          <span class="px-2 py-0.5 bg-vermillion text-cream font-mono text-[10px] uppercase tracking-wider font-bold">
            SECTION 02
          </span>
          <span class="font-mono text-xs text-stone tracking-[0.2em] uppercase">
            CASE STUDIES &amp; SYSTEMS
          </span>
        </div>
        <h2 class="font-display font-black text-4xl sm:text-5xl text-ink tracking-tight">
          SELECTED WORKS<span class="text-vermillion">.</span>
        </h2>
        <div class="rule-red w-20 mt-4"></div>
      </div>

      <!-- Projects Stack -->
      <div class="space-y-16">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :id="'project-' + project.id.replace('ncst-', '')"
        >
          <ProjectCard
            :project="project"
            :index="index"
            :reversed="index % 2 !== 0"
          />
        </div>
      </div>
    </div>
  </section>
</template>
