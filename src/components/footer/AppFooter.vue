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
    class="relative z-10 h-8 bg-bg-secondary border-t border-text-muted/20 flex items-center justify-between px-4 sm:px-6 font-mono text-[11px] text-text-muted"
  >
    <span>&copy; {{ currentYear }} RaidouKu</span>
    <span class="hidden sm:inline">SYS.UPTIME: {{ uptime }}</span>
    <span>
      STATUS: <span class="text-accent-teal">ONLINE</span>
      <span class="inline-block w-1.5 h-1.5 bg-accent-teal rounded-full ml-1 animate-pulse" />
    </span>
  </footer>
</template>
