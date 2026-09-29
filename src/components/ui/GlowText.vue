<script setup>
defineProps({
  tag: { type: String, default: 'span' },
  color: { type: String, default: 'red' },
})
</script>

<template>
  <component
    :is="tag"
    :class="{
      'text-vermillion': color === 'red' || color === 'teal',
      'text-ochre': color === 'amber' || color === 'ochre',
      'text-indigo': color === 'indigo',
    }"
  >
    <slot />
  </component>
</template>
