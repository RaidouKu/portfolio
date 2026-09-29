<script setup>
defineProps({
  text: { type: String, required: true },
  color: { type: String, default: 'red' },
})
</script>

<template>
  <span
    class="font-mono text-xs uppercase tracking-[0.15em] inline-flex items-center gap-1"
    :class="{
      'text-vermillion': color === 'red' || color === 'teal',
      'text-ochre': color === 'amber' || color === 'ochre',
      'text-stone': color === 'muted',
    }"
  >
    {{ text }}
  </span>
</template>
