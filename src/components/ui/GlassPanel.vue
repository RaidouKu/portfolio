<script setup>
defineProps({
  hover: { type: Boolean, default: true },
  tag: { type: String, default: 'div' },
})
</script>

<template>
  <component
    :is="tag"
    class="glass-panel p-6 md:p-6 sm:p-4"
    :class="{ 'hover:border-accent-teal/35': hover }"
  >
    <slot />
  </component>
</template>
