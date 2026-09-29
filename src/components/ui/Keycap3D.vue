<script setup>
import { ref } from 'vue'

const props = defineProps({
  skill: { type: Object, required: true },
  variant: { type: String, default: 'default' }, // 'default', 'vermillion', 'ink', 'ochre'
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['press', 'click'])

const isPressed = ref(false)

function handleMouseDown() {
  isPressed.value = true
  emit('press', props.skill)
}

function handleMouseUp() {
  isPressed.value = false
  emit('click', props.skill)
}

function handleMouseLeave() {
  isPressed.value = false
}
</script>

<template>
  <button
    type="button"
    class="keycap-container group relative focus:outline-none"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
    @touchstart.passive="handleMouseDown"
    @touchend="handleMouseUp"
    @keydown.enter="handleMouseDown(); setTimeout(handleMouseUp, 120)"
    @keydown.space.prevent="handleMouseDown(); setTimeout(handleMouseUp, 120)"
  >
    <!-- 3D Keycap Body -->
    <div
      class="keycap-body"
      :class="[
        `keycap--${variant}`,
        {
          'keycap--active': active,
          'keycap--pressed': isPressed,
        }
      ]"
    >
      <!-- Top Legend Row -->
      <div class="flex items-center justify-between w-full">
        <!-- Short Key Code / Legend -->
        <span class="font-mono text-xs sm:text-sm font-extrabold tracking-tight keycap-legend">
          {{ skill.key || skill.name.slice(0, 4).toUpperCase() }}
        </span>

        <!-- Japanese Sub-legend -->
        <span class="font-mono text-[10px] opacity-70 keycap-sublegend">
          {{ skill.jp || '技' }}
        </span>
      </div>

      <!-- Keycap Bevel / Scoop highlight -->
      <div class="keycap-scoop my-1">
        <span class="truncate block text-[10px] font-sans font-medium tracking-wide opacity-80">
          {{ skill.name }}
        </span>
      </div>

      <!-- Bottom Level / LED indicator -->
      <div class="flex items-center justify-between w-full pt-0.5">
        <div class="flex gap-0.5">
          <span
            v-for="i in 4"
            :key="i"
            class="w-1.5 h-1 rounded-[1px] transition-colors"
            :class="i * 25 <= skill.level ? 'bg-vermillion' : 'bg-stone/30'"
          />
        </div>
        <span class="font-mono text-[9px] font-bold opacity-75">
          {{ skill.level }}%
        </span>
      </div>
    </div>
  </button>
</template>

<style scoped>
.keycap-container {
  perspective: 700px;
}

.keycap-body {
  width: 100%;
  min-height: 82px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 6px;
  border: 2px solid #1a1a1a;
  background: linear-gradient(180deg, #fdfbf7 0%, #ece7dd 100%);
  color: #1a1a1a;
  /* 3D Extrusion Depth */
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 -2px 0 rgba(0, 0, 0, 0.08) inset,
    0 6px 0 0 #1a1a1a,
    0 9px 12px rgba(0, 0, 0, 0.16);
  transform: translateY(0) translateZ(0);
  transition: transform 0.07s ease-out, box-shadow 0.07s ease-out, background 0.15s ease;
  user-select: none;
  cursor: pointer;
}

/* Hover Physics */
.keycap-container:hover .keycap-body:not(.keycap--pressed) {
  transform: translateY(-2px);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 1) inset,
    0 8px 0 0 #1a1a1a,
    0 12px 16px rgba(0, 0, 0, 0.22);
}

/* Pressed / Active Physics */
.keycap-body.keycap--pressed {
  transform: translateY(5px) !important;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.4) inset,
    0 1px 0 0 #1a1a1a,
    0 2px 4px rgba(0, 0, 0, 0.25) !important;
}

/* Active Highlight */
.keycap-body.keycap--active {
  border-color: #c0392b;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 -2px 0 rgba(0, 0, 0, 0.08) inset,
    0 6px 0 0 #c0392b,
    0 9px 14px rgba(192, 57, 43, 0.3);
}

/* Colorway: Vermillion Artisan Key */
.keycap--vermillion {
  background: linear-gradient(180deg, #d34335 0%, #c0392b 100%);
  color: #f5f0e8;
  border-color: #1a1a1a;
}
.keycap--vermillion .keycap-legend {
  color: #ffffff;
}
.keycap--vermillion .keycap-sublegend {
  color: rgba(255, 255, 255, 0.85);
}

/* Colorway: Ink / Dark Modifier Key */
.keycap--ink {
  background: linear-gradient(180deg, #2a2a3e 0%, #1a1a2e 100%);
  color: #f5f0e8;
  border-color: #1a1a1a;
}
.keycap--ink .keycap-legend {
  color: #f5f0e8;
}

/* Colorway: Ochre Novelty Key */
.keycap--ochre {
  background: linear-gradient(180deg, #dfc067 0%, #c8a951 100%);
  color: #1a1a1a;
}
</style>
