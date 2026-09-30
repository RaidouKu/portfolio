<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  skill: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['press', 'click'])

const isPressed = ref(false)

const keyStyle = computed(() => {
  return {
    '--kc-color': props.skill.color || '#ece7dd',
    '--kc-base-color': props.skill.baseColor || '#1a1a1a',
    '--kc-text-color': props.skill.textColor || '#ffffff',
  }
})

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
    class="keycap-socket group relative focus:outline-none"
    :style="keyStyle"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
    @touchstart.passive="handleMouseDown"
    @touchend="handleMouseUp"
    @keydown.enter="handleMouseDown(); setTimeout(handleMouseUp, 120)"
    @keydown.space.prevent="handleMouseDown(); setTimeout(handleMouseUp, 120)"
  >
    <!-- Recessed Mechanical Switch Plate Well -->
    <div class="keycap-well">
      <!-- 3D Keycap Cap Body -->
      <div
        class="keycap-cap"
        :class="{
          'is-active': active,
          'is-pressed': isPressed,
        }"
      >
        <!-- Ergonomic Concave Dish / Finger Scoop -->
        <div class="keycap-dish">
          <!-- Top Row: Primary Legend & Technology Tag -->
          <div class="flex items-center justify-between w-full">
            <span class="font-mono text-xs sm:text-sm font-black tracking-tight drop-shadow-sm">
              {{ skill.key }}
            </span>
            <span class="font-mono text-[9px] font-bold tracking-wider opacity-85 px-1 py-0.2 rounded bg-black/20">
              {{ skill.tag }}
            </span>
          </div>

          <!-- Middle Row: Technology Full Name -->
          <div class="my-1.5 w-full text-left truncate">
            <span class="font-heading text-[11px] font-bold tracking-wide block truncate">
              {{ skill.name }}
            </span>
          </div>

          <!-- Bottom Row: Mastery LED Gauge & Percentage -->
          <div class="flex items-center justify-between w-full pt-1 border-t border-black/15">
            <div class="flex items-center gap-1">
              <span
                v-for="i in 4"
                :key="i"
                class="w-2 h-1 rounded-[1px] transition-all"
                :class="i * 25 <= skill.level ? 'bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]' : 'bg-black/25'"
              />
            </div>
            <span class="font-mono text-[10px] font-extrabold tracking-tight">
              {{ skill.level }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.keycap-socket {
  perspective: 900px;
  width: 100%;
  display: block;
  user-select: none;
  cursor: pointer;
  padding: 4px;
}

/* Recessed Mechanical Keyboard Plate Well */
.keycap-well {
  background: #111118;
  border-radius: 8px;
  padding: 2px 2px 8px 2px;
  box-shadow:
    inset 0 3px 6px rgba(0, 0, 0, 0.7),
    0 1px 0 rgba(255, 255, 255, 0.4);
  position: relative;
}

/* 3D Keycap Cap Profile */
.keycap-cap {
  position: relative;
  width: 100%;
  min-height: 86px;
  border-radius: 6px;
  background-color: var(--kc-color);
  color: var(--kc-text-color);
  border: 1.5px solid rgba(0, 0, 0, 0.35);

  /* Deep Multi-Layered 3D Extrusion Shadows */
  box-shadow:
    /* Top edge illumination highlight */
    inset 0 1.5px 0 rgba(255, 255, 255, 0.45),
    /* Left side edge highlight */
    inset 2px 0 0 rgba(255, 255, 255, 0.15),
    /* Right side bevel shadow */
    inset -2px 0 0 rgba(0, 0, 0, 0.25),
    /* Bottom scoop rim */
    inset 0 -2px 0 rgba(0, 0, 0, 0.35),
    /* 3D Keycap Skirt Extrusion (Front Wall) */
    0 7px 0 0 var(--kc-base-color),
    /* Dark grounding drop shadow */
    0 10px 14px -2px rgba(0, 0, 0, 0.45);

  transform: translateY(0);
  transition: transform 0.08s cubic-bezier(0.2, 0.8, 0.4, 1),
              box-shadow 0.08s cubic-bezier(0.2, 0.8, 0.4, 1);
}

/* Ergonomic Cylindrical Dish / Scoop */
.keycap-dish {
  position: relative;
  padding: 7px 8px;
  min-height: 84px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: radial-gradient(
    ellipse at 50% 25%,
    rgba(255, 255, 255, 0.22) 0%,
    rgba(0, 0, 0, 0.12) 100%
  );
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.12);
}

/* Hover Physics: Keycap tilts slightly upwards on spring */
.keycap-socket:hover .keycap-cap:not(.is-pressed) {
  transform: translateY(-2px);
  box-shadow:
    inset 0 1.5px 0 rgba(255, 255, 255, 0.6),
    inset 2px 0 0 rgba(255, 255, 255, 0.2),
    inset -2px 0 0 rgba(0, 0, 0, 0.25),
    inset 0 -2px 0 rgba(0, 0, 0, 0.35),
    0 9px 0 0 var(--kc-base-color),
    0 14px 18px -2px rgba(0, 0, 0, 0.5);
}

/* Active / Pressed Physics: Full mechanical switch bottom-out */
.keycap-cap.is-pressed {
  transform: translateY(6px) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.4),
    0 1px 0 0 var(--kc-base-color),
    0 2px 5px rgba(0, 0, 0, 0.4) !important;
}

/* Active Selection Outline */
.keycap-cap.is-active {
  outline: 2.5px solid #1a1a1a;
  outline-offset: 1px;
}
</style>
