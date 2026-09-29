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
    class="inline-block font-mono text-xs uppercase tracking-widest px-6 py-3 border transition-all duration-200 cursor-pointer"
    :class="{
      'border-accent-teal text-accent-teal hover:bg-accent-teal/10 hover:shadow-glow-teal': variant === 'primary' && !disabled,
      'border-accent-amber text-accent-amber hover:bg-accent-amber/10 hover:shadow-glow-amber': variant === 'amber' && !disabled,
      'border-text-muted text-text-muted cursor-not-allowed': disabled,
    }"
    style="clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)"
    @click="!href && !disabled && $emit('click')"
  >
    <slot />
  </component>
</template>
