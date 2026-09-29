<script setup>
defineProps({
  tag: { type: String, default: 'span' },
  color: { type: String, default: 'teal' },
})
</script>

<template>
  <component
    :is="tag"
    :class="{
      'text-accent-teal text-glow-teal': color === 'teal',
      'text-accent-amber text-glow-amber': color === 'amber',
    }"
  >
    <slot />
  </component>
</template>
