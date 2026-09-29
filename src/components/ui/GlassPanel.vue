<script setup>
defineProps({
  hover: { type: Boolean, default: true },
  tag: { type: String, default: 'div' },
  dark: { type: Boolean, default: false },
})
</script>

<template>
  <component
    :is="tag"
    class="panel"
    :class="{
      'panel--dark': dark,
      'hover:border-vermillion': hover,
    }"
  >
    <slot />
  </component>
</template>
