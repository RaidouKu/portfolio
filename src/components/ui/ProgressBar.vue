<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: Number, required: true, validator: (v) => v >= 0 && v <= 100 },
})
</script>

<template>
  <div class="space-y-1.5">
    <div class="flex justify-between items-center">
      <span class="font-mono text-xs text-ink tracking-wide">{{ label }}</span>
      <span class="font-mono text-xs text-stone">{{ value }}%</span>
    </div>
    <div class="h-1.5 bg-stone-light overflow-hidden relative">
      <div
        class="h-full bg-vermillion transition-all duration-700"
        :style="{ width: `${value}%` }"
        data-progress-fill
      />
    </div>
  </div>
</template>
