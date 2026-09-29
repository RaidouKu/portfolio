<script setup>
defineProps({
  lines: { type: Array, required: true },
})
</script>

<template>
  <div
    class="font-mono text-[10px] leading-tight text-stone select-none pointer-events-none"
    aria-hidden="true"
  >
    <div v-for="(line, i) in lines" :key="i">{{ line }}</div>
  </div>
</template>
