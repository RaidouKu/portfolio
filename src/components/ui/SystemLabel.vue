<script setup>
defineProps({
  text: { type: String, required: true },
  color: { type: String, default: 'teal' },
})
</script>

<template>
  <span
    class="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-0.5"
    :class="{
      'text-accent-teal': color === 'teal',
      'text-accent-amber': color === 'amber',
      'text-accent-red': color === 'red',
    }"
  >
    <span class="text-text-muted">[</span>
    {{ text }}
    <span class="text-text-muted">]</span>
  </span>
</template>
