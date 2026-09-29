<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentYear = new Date().getFullYear()
const uptime = ref('00:00:00')
let uptimeInterval = null
let startTime = Date.now()

function formatUptime() {
  const diff = Math.floor((Date.now() - startTime) / 1000)
  const h = String(Math.floor(diff / 3600)).padStart(2, '0')
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0')
  const s = String(diff % 60).padStart(2, '0')
  uptime.value = `${h}:${m}:${s}`
}

onMounted(() => {
  uptimeInterval = setInterval(formatUptime, 1000)
})

onUnmounted(() => {
  if (uptimeInterval) clearInterval(uptimeInterval)
})
</script>

<template>
  <footer
    class="relative z-10 bg-cream-dark border-t-2 border-ink py-6 px-4 sm:px-6 lg:px-12 font-mono text-xs text-stone"
  >
    <div class="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 bg-vermillion rounded-full"></span>
        <span class="font-bold text-ink">&copy; {{ currentYear }} LEBRON JAMES PANGAN</span>
      </div>

      <div class="hidden md:inline text-stone">
        SESSION UPTIME: <span class="text-ink font-semibold">{{ uptime }}</span>
      </div>

      <div class="text-[11px] text-stone tracking-wider">
        NATIONAL COLLEGE OF SCIENCE AND TECHNOLOGY
      </div>
    </div>
  </footer>
</template>
