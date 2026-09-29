<script setup>
import { projects } from '../../assets/data/projects.js'
import SystemLabel from '../ui/SystemLabel.vue'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <section class="relative py-20 lg:py-28 px-4 sm:px-6">
    <div class="max-w-content mx-auto">
      <!-- Section header -->
      <div class="mb-16">
        <SystemLabel text="CASE_FILES" color="teal" class="mb-3 block" />
        <h2 class="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-wide">
          Projects<span class="text-accent-teal">_</span>
        </h2>
      </div>

      <!-- Project list -->
      <div class="space-y-20 lg:space-y-28">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :id="'project-' + project.id.replace('ncst-', '')"
        >
          <ProjectCard :project="project" :reversed="index % 2 !== 0" />
        </div>
      </div>
    </div>
  </section>
</template>
