<script setup>
defineProps({
  href: { type: String, default: null },
  variant: { type: String, default: 'primary' },
  disabled: { type: Boolean, default: false },
})

defineEmits(['click'])
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener noreferrer' : undefined"
    :disabled="disabled"
    class="inline-block font-mono text-xs uppercase tracking-[0.12em] px-6 py-3 border-2 transition-all duration-200 cursor-pointer"
    :class="{
      'border-ink text-ink hover:bg-ink hover:text-cream': variant === 'primary' && !disabled,
      'border-vermillion text-vermillion hover:bg-vermillion hover:text-cream': variant === 'red' || (variant === 'amber' && !disabled),
      'border-stone-light text-stone cursor-not-allowed': disabled,
    }"
    @click="!href && !disabled && $emit('click')"
  >
    <slot />
  </component>
</template>
