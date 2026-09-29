<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: Number, required: true, validator: (v) => v >= 0 && v <= 100 },
})
</script>

<template>
  <div class="space-y-1.5">
    <div class="flex justify-between items-center">
      <span class="font-mono text-xs text-text-primary tracking-wide">{{ label }}</span>
      <span class="font-mono text-xs text-text-muted">{{ value }}%</span>
    </div>
    <div class="h-2 bg-text-muted/20 rounded-sm overflow-hidden relative">
      <div
        class="h-full bg-accent-teal shadow-glow-teal-sm transition-all duration-700"
        :style="{ width: `${value}%` }"
        data-progress-fill
      />
      <!-- Segmented overlay -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background: repeating-linear-gradient(90deg, transparent, transparent 4px, #0a0e14 4px, #0a0e14 6px)"
      />
    </div>
  </div>
</template>
