# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page portfolio SPA with a Ghost in the Shell + Y2K warmth aesthetic, deployed to InfinityFree.

**Architecture:** Vue 3 SPA using Composition API with `<script setup>`, styled with Tailwind CSS custom tokens, animated with GSAP 3 + ScrollTrigger. All data is static JS objects. Hash routing via Vue Router. Built with Vite, deployed as static files.

**Tech Stack:** Vue 3, Vite, Tailwind CSS v3, GSAP 3 + ScrollTrigger, Google Fonts (Orbitron, Space Grotesk, Inter, JetBrains Mono)

**Spec:** 
- `PRD.md` — Product requirements
- `ARCHITECTURE.md` — Technical architecture
- `DESIGN-SYSTEM.md` — Visual design system
- `AGENT.md` — Development standards and bans

## Global Constraints

- Vue 3 Composition API with `<script setup>` only — NO Options API
- Plain JavaScript — NO TypeScript
- Tailwind custom tokens only — NEVER use default Tailwind colors
- Animate only `transform` and `opacity` with GSAP — NO layout-triggering properties
- UI animations under 300ms, easing: `cubic-bezier(0.23, 1, 0.32, 1)`
- Respect `prefers-reduced-motion` for all animations
- No state management libraries — use composables and provide/inject
- All data is static — NO API calls
- `base: './'` in Vite config for InfinityFree relative paths
- Hash routing (`createWebHashHistory`) — NO history mode
- Images: WebP, lazy loaded, with width/height
- Max component file length: ~200 lines
- Placeholder content marked as `[PLACEHOLDER: description]` with dashed border styling

---

## File Structure

```
portfolio/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── .htaccess
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js
│   ├── components/
│   │   ├── ui/
│   │   │   ├── GlassPanel.vue
│   │   │   ├── SystemLabel.vue
│   │   │   ├── TechButton.vue
│   │   │   ├── ProgressBar.vue
│   │   │   ├── GlowText.vue
│   │   │   └── DataReadout.vue
│   │   ├── boot/
│   │   │   └── BootSequence.vue
│   │   ├── nav/
│   │   │   └── TopNav.vue
│   │   ├── hero/
│   │   │   └── HeroSection.vue
│   │   ├── about/
│   │   │   └── AboutSection.vue
│   │   ├── projects/
│   │   │   ├── ProjectSection.vue
│   │   │   └── ProjectCard.vue
│   │   ├── contact/
│   │   │   └── ContactSection.vue
│   │   └── footer/
│   │       └── AppFooter.vue
│   ├── composables/
│   │   ├── useScrollSpy.js
│   │   └── useBootSequence.js
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   └── effects.css
│   │   └── data/
│   │       ├── projects.js
│   │       └── profile.js
│   └── utils/
│       └── animations.js
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `public/.htaccess`, `public/robots.txt`, `src/main.js`, `src/App.vue`, `src/router/index.js`, `src/assets/styles/main.css`, `src/assets/styles/effects.css`

**Interfaces:**
- Consumes: Nothing (first task)
- Produces: Working Vite dev server with Vue 3, Tailwind CSS with custom design tokens, GSAP registered, Vue Router with hash mode, global CSS effects (scan lines, noise, grid, glow classes)

- [ ] **Step 1: Scaffold Vue 3 project with Vite**

```bash
cd c:\Users\kinglebron\Desktop\portfolio
npm create vite@latest . -- --template vue
```

Select "Vue" and "JavaScript" when prompted. If the directory is not empty, confirm overwrite for config files only.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npm install gsap
npm install vue-router@4
```

- [ ] **Step 3: Initialize Tailwind**

```bash
npx tailwindcss init -p
```

- [ ] **Step 4: Configure `tailwind.config.js`**

Replace the entire file content with:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0e14',
        'bg-secondary': '#111923',
        'bg-hover': '#16212d',
        'accent-teal': '#00e5c3',
        'accent-teal-hover': '#33ebd1',
        'accent-teal-active': '#00ccad',
        'accent-amber': '#f0a030',
        'accent-amber-hover': '#f3b355',
        'accent-red': '#ff3b4e',
        'accent-red-hover': '#ff6271',
        'text-primary': '#e8ece4',
        'text-muted': '#5a6a7a',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        panel: '4px',
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        'glow-teal': '0 0 15px rgba(0, 229, 195, 0.4)',
        'glow-teal-sm': '0 0 8px rgba(0, 229, 195, 0.3)',
        'glow-amber': '0 0 15px rgba(240, 160, 48, 0.4)',
        'panel': '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 229, 195, 0.05)',
        'panel-hover': '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 229, 195, 0.1)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Configure `vite.config.js`**

Replace the entire file content with:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          vue: ['vue', 'vue-router'],
        },
      },
    },
  },
})
```

- [ ] **Step 6: Create `index.html`**

Replace the entire file content with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lebron James Pangan — UI/UX Designer & Developer</title>
    <meta name="description" content="Portfolio of Lebron James Pangan (RaidouKu) — UI/UX Designer & Developer at NCST." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@700;900&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 7: Create `src/assets/styles/main.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --accent-teal: #00e5c3;
    --accent-amber: #f0a030;
    --accent-red: #ff3b4e;
    --bg-primary: #0a0e14;
    --bg-secondary: #111923;
    --text-primary: #e8ece4;
    --text-muted: #5a6a7a;
    --border-glow: rgba(0, 229, 195, 0.15);
  }

  body {
    @apply bg-bg-primary text-text-primary font-body antialiased overflow-x-hidden;
  }

  *:focus-visible {
    outline: 2px solid var(--accent-teal);
    outline-offset: 2px;
  }

  /* Skip-to-content link */
  .skip-link {
    @apply absolute -translate-y-full bg-accent-teal text-bg-primary font-mono text-sm px-4 py-2 z-50;
    transition: transform 0.2s ease;
  }
  .skip-link:focus {
    @apply translate-y-0;
  }

  /* Placeholder marker styling */
  .placeholder-marker {
    @apply border border-dashed border-text-muted px-3 py-2 text-text-muted font-mono text-sm italic;
  }
}

@layer utilities {
  .text-glow-teal {
    text-shadow: 0 0 5px rgba(0, 229, 195, 0.6),
                 0 0 10px rgba(0, 229, 195, 0.4),
                 0 0 20px rgba(0, 229, 195, 0.2);
  }
  .text-glow-amber {
    text-shadow: 0 0 5px rgba(240, 160, 48, 0.6),
                 0 0 10px rgba(240, 160, 48, 0.4);
  }
}
```

- [ ] **Step 8: Create `src/assets/styles/effects.css`**

```css
/* ===== SCAN LINES ===== */
.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.1) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 9999;
}

.scanline-sweep {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(
    0deg,
    rgba(0, 229, 195, 0) 0%,
    rgba(0, 229, 195, 0.08) 50%,
    rgba(0, 229, 195, 0) 100%
  );
  pointer-events: none;
  z-index: 9998;
  animation: sweep 8s linear infinite;
}

@keyframes sweep {
  0% { transform: translateY(-100px); }
  100% { transform: translateY(100vh); }
}

/* ===== CRT NOISE ===== */
.noise-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9997;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ===== GRID BACKGROUND ===== */
.grid-bg {
  background-image:
    linear-gradient(rgba(0, 229, 195, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 229, 195, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
  background-position: center center;
}

/* ===== GLASS PANEL ===== */
.glass-panel {
  background: rgba(17, 25, 35, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 229, 195, 0.15);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5),
              inset 0 0 20px rgba(0, 229, 195, 0.05);
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.glass-panel:hover {
  border-color: rgba(0, 229, 195, 0.35);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5),
              inset 0 0 30px rgba(0, 229, 195, 0.1);
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .scanline-sweep,
  .scanlines {
    display: none;
  }
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 9: Create `src/router/index.js`**

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue'),
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
```

- [ ] **Step 10: Create `src/main.js`**

```javascript
import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import './assets/styles/effects.css'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({
  ease: 'power3.out',
  duration: 0.6,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
```

- [ ] **Step 11: Create initial `src/App.vue`**

```vue
<script setup>
import { ref, provide } from 'vue'

const bootComplete = ref(false)
const activeSection = ref('hero')

provide('bootComplete', bootComplete)
provide('activeSection', activeSection)
</script>

<template>
  <div class="relative min-h-screen grid-bg">
    <!-- Skip to content -->
    <a href="#main-content" class="skip-link">Skip to content</a>

    <!-- Global overlays -->
    <div class="scanlines" aria-hidden="true"></div>
    <div class="scanline-sweep" aria-hidden="true"></div>
    <div class="noise-overlay" aria-hidden="true"></div>

    <!-- Main content placeholder -->
    <main id="main-content" class="relative z-10">
      <p class="text-accent-teal font-mono text-center pt-20">
        [SYSTEM ONLINE — Components loading...]
      </p>
    </main>
  </div>
</template>
```

- [ ] **Step 12: Create `public/.htaccess`**

```apache
Options -Indexes
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

- [ ] **Step 13: Create `public/robots.txt`**

```
User-agent: *
Allow: /
```

- [ ] **Step 14: Verify dev server starts**

```bash
npm run dev
```

Open the browser. Confirm: dark background with grid pattern, scan lines moving, noise overlay visible, teal text showing "[SYSTEM ONLINE]". The visual foundation is working.

- [ ] **Step 15: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Vue 3 + Vite + Tailwind + GSAP project with design system tokens and global visual effects"
```

---

### Task 2: Static Data & Utility Layer

**Files:**
- Create: `src/assets/data/profile.js`, `src/assets/data/projects.js`, `src/utils/animations.js`

**Interfaces:**
- Consumes: GSAP (registered in Task 1)
- Produces: `profile` object, `projects` array, `createSectionReveal(element)` function, `createStaggerReveal(elements, stagger)` function — used by all section components

- [ ] **Step 1: Create `src/assets/data/profile.js`**

```javascript
export const profile = {
  name: 'Lebron James Pangan',
  alias: 'RaidouKu',
  tagline: 'UI/UX Designer & Developer',
  bio: '[PLACEHOLDER: 2-3 sentences about who you are, what you\'re passionate about, what drives you]',
  school: 'National College of Science and Technology',
  email: 'pangan.lebronjames1@ncst.edu.ph',
  github: 'https://github.com/RaidouKu',
  socials: {
    linkedin: null,
    twitter: null,
    behance: null,
  },
  skills: {
    design: [
      { name: 'UI/UX Design', level: 85 },
      { name: 'Wireframing & Prototyping', level: 80 },
      { name: 'Visual Design', level: 75 },
    ],
    frontend: [
      { name: 'HTML & CSS', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'Vue.js', level: 75 },
      { name: 'Tailwind CSS', level: 85 },
    ],
    backend: [
      { name: 'PHP', level: 70 },
      { name: 'MySQL', level: 65 },
    ],
    tools: [
      { name: 'Figma', level: 80 },
      { name: 'Git', level: 70 },
      { name: 'VS Code', level: 85 },
    ],
  },
}
```

- [ ] **Step 2: Create `src/assets/data/projects.js`**

```javascript
export const projects = [
  {
    id: 'ncst-enrollment',
    label: 'CASE_01',
    title: 'NCST Enrollment System',
    description: '[PLACEHOLDER: Description of the enrollment system — what problem it solves, how it works, what makes it interesting]',
    tech: ['PHP', 'HTML', 'CSS', 'MySQL'],
    role: 'Full-Stack Developer',
    team: '[PLACEHOLDER: Solo or team size]',
    status: 'Completed',
    imageUrl: null,
    imagePlaceholder: 'Enrollment system dashboard screenshot',
    demoUrl: null,
    repoUrl: 'https://github.com/hil9-pya/enrollmentsystem',
  },
  {
    id: 'kickcraft',
    label: 'CASE_02',
    title: 'Kickcraft',
    description: '[PLACEHOLDER: Description of the 3D shoe design website — what it does, the creative challenge, what you learned]',
    tech: ['[PLACEHOLDER: Tech stack]'],
    role: '[PLACEHOLDER: Your role]',
    team: '[PLACEHOLDER: Solo or team size]',
    status: '[PLACEHOLDER: Completed / In Progress]',
    imageUrl: null,
    imagePlaceholder: 'Kickcraft 3D shoe design interface screenshot',
    demoUrl: null,
    repoUrl: 'https://github.com/hil9-pya/kickcraft',
  },
]
```

- [ ] **Step 3: Create `src/utils/animations.js`**

```javascript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Creates a scroll-triggered reveal animation for a section element.
 * Fades in and slides up from 30px below.
 * @param {HTMLElement} element - The element to animate
 * @param {Object} options - Optional overrides
 * @returns {ScrollTrigger} The ScrollTrigger instance (for cleanup)
 */
export function createSectionReveal(element, options = {}) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) {
    gsap.set(element, { opacity: 1, y: 0 })
    return null
  }

  gsap.set(element, { opacity: 0, y: 30 })

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: options.duration || 0.6,
    ease: options.ease || 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top 85%',
      once: true,
      ...options.scrollTrigger,
    },
  })
}

/**
 * Creates a staggered reveal for multiple child elements.
 * @param {HTMLElement} container - The parent container (used as ScrollTrigger trigger)
 * @param {string} childSelector - CSS selector for children to stagger
 * @param {number} stagger - Stagger delay between children (default: 0.1)
 * @returns {gsap.core.Tween}
 */
export function createStaggerReveal(container, childSelector, stagger = 0.1) {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  const children = container.querySelectorAll(childSelector)

  if (prefersReducedMotion) {
    gsap.set(children, { opacity: 1, y: 0 })
    return null
  }

  gsap.set(children, { opacity: 0, y: 20 })

  return gsap.to(children, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      once: true,
    },
  })
}

/**
 * Creates a typing animation effect (steps-based).
 * @param {HTMLElement} element - The element containing text to type
 * @param {number} charDuration - Duration per character in seconds (default: 0.05)
 * @returns {gsap.core.Timeline}
 */
export function createTypingEffect(element, charDuration = 0.05) {
  const text = element.textContent
  const totalDuration = text.length * charDuration

  element.style.width = '0'
  element.style.overflow = 'hidden'
  element.style.whiteSpace = 'nowrap'
  element.style.borderRight = '2px solid var(--accent-teal)'

  const tl = gsap.timeline()

  tl.to(element, {
    width: 'auto',
    duration: totalDuration,
    ease: `steps(${text.length})`,
  })

  tl.to(element, {
    borderColor: 'transparent',
    duration: 0.5,
    repeat: 3,
    yoyo: true,
    ease: 'steps(1)',
  })

  return tl
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add static data layer (profile, projects) and GSAP animation utilities"
```

---

### Task 3: Reusable UI Components

**Files:**
- Create: `src/components/ui/GlassPanel.vue`, `src/components/ui/SystemLabel.vue`, `src/components/ui/TechButton.vue`, `src/components/ui/ProgressBar.vue`, `src/components/ui/GlowText.vue`, `src/components/ui/DataReadout.vue`

**Interfaces:**
- Consumes: Tailwind tokens, CSS custom properties (Task 1)
- Produces: `<GlassPanel>`, `<SystemLabel>`, `<TechButton>`, `<ProgressBar>`, `<GlowText>`, `<DataReadout>` components — used by all section components in Tasks 4-8

- [ ] **Step 1: Create `src/components/ui/GlassPanel.vue`**

```vue
<script setup>
defineProps({
  hover: { type: Boolean, default: true },
  tag: { type: String, default: 'div' },
})
</script>

<template>
  <component
    :is="tag"
    class="glass-panel p-6 md:p-6 sm:p-4"
    :class="{ 'hover:border-accent-teal/35': hover }"
  >
    <slot />
  </component>
</template>
```

- [ ] **Step 2: Create `src/components/ui/SystemLabel.vue`**

```vue
<script setup>
defineProps({
  text: { type: String, required: true },
  color: { type: String, default: 'teal' },
})
</script>

<template>
  <span
    class="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-0.5"
    :class="{
      'text-accent-teal': color === 'teal',
      'text-accent-amber': color === 'amber',
      'text-accent-red': color === 'red',
    }"
  >
    <span class="text-text-muted">[</span>
    {{ text }}
    <span class="text-text-muted">]</span>
  </span>
</template>
```

- [ ] **Step 3: Create `src/components/ui/TechButton.vue`**

```vue
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
```

- [ ] **Step 4: Create `src/components/ui/ProgressBar.vue`**

```vue
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
```

- [ ] **Step 5: Create `src/components/ui/GlowText.vue`**

```vue
<script setup>
defineProps({
  tag: { type: String, default: 'span' },
  color: { type: String, default: 'teal' },
})
</script>

<template>
  <component
    :is="tag"
    :class="{
      'text-accent-teal text-glow-teal': color === 'teal',
      'text-accent-amber text-glow-amber': color === 'amber',
    }"
  >
    <slot />
  </component>
</template>
```

- [ ] **Step 6: Create `src/components/ui/DataReadout.vue`**

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  lines: { type: Array, required: true },
  flicker: { type: Boolean, default: true },
})

const opacity = ref(1)
let flickerInterval = null

onMounted(() => {
  if (props.flicker) {
    flickerInterval = setInterval(() => {
      opacity.value = Math.random() > 0.9 ? 0.4 : 1
    }, 2000 + Math.random() * 3000)
  }
})

onUnmounted(() => {
  if (flickerInterval) clearInterval(flickerInterval)
})
</script>

<template>
  <div
    class="font-mono text-[10px] leading-tight text-text-muted select-none pointer-events-none transition-opacity duration-100"
    :style="{ opacity }"
    aria-hidden="true"
  >
    <div v-for="(line, i) in lines" :key="i">{{ line }}</div>
  </div>
</template>
```

- [ ] **Step 7: Verify components render**

Temporarily import all 6 components in `App.vue` and render them in `<main>` to verify they display correctly. Check: glass panel shows backdrop blur, system label has brackets, button has chamfered corner, progress bar has segments, glow text glows, data readout flickers.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add reusable UI components — GlassPanel, SystemLabel, TechButton, ProgressBar, GlowText, DataReadout"
```

---

### Task 4: Boot Sequence Component

**Files:**
- Create: `src/components/boot/BootSequence.vue`, `src/composables/useBootSequence.js`

**Interfaces:**
- Consumes: `bootComplete` (provided by App.vue, Task 1), `createTypingEffect` (Task 2), GSAP
- Produces: Emits `complete` event, sets `bootComplete` to `true`, sets `localStorage.hasBooted`

- [ ] **Step 1: Create `src/composables/useBootSequence.js`**

```javascript
import { ref } from 'vue'

export function useBootSequence() {
  const hasBooted = localStorage.getItem('hasBooted') === 'true'
  const showBoot = ref(!hasBooted)
  const isComplete = ref(hasBooted)

  function completeBoot() {
    showBoot.value = false
    isComplete.value = true
    localStorage.setItem('hasBooted', 'true')
  }

  function skipBoot() {
    completeBoot()
  }

  return {
    showBoot,
    isComplete,
    completeBoot,
    skipBoot,
  }
}
```

- [ ] **Step 2: Create `src/components/boot/BootSequence.vue`**

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['complete'])

const bootLines = ref([])
const showSkip = ref(true)
const bootContainer = ref(null)

const BOOT_TEXT = [
  '> INITIALIZING SYSTEM...',
  '> LOADING CORE MODULES...',
  `> USER: LEBRON_JAMES_PANGAN`,
  '> ALIAS: RAIDOU_KU',
  '> ROLE: UI/UX_DESIGNER && DEVELOPER',
  '> AFFILIATION: NCST',
  '> STATUS: ONLINE',
  '> PORTFOLIO_SYSTEM v1.0 READY',
  '',
  '> LAUNCHING INTERFACE...',
]

function skip() {
  emit('complete')
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) {
    emit('complete')
    return
  }

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(bootContainer.value, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => emit('complete'),
      })
    },
  })

  BOOT_TEXT.forEach((line, i) => {
    tl.call(
      () => {
        bootLines.value.push(line)
      },
      null,
      i * 0.18
    )
  })

  tl.to({}, { duration: 0.6 })
})
</script>

<template>
  <div
    ref="bootContainer"
    class="fixed inset-0 z-50 bg-bg-primary flex items-center justify-center"
  >
    <div class="w-full max-w-xl px-6">
      <div class="font-mono text-sm text-accent-teal space-y-1">
        <div
          v-for="(line, i) in bootLines"
          :key="i"
          class="whitespace-pre"
        >
          {{ line }}
        </div>
        <span class="inline-block w-2 h-4 bg-accent-teal animate-pulse" />
      </div>
    </div>

    <button
      v-if="showSkip"
      class="absolute bottom-8 right-8 font-mono text-xs text-text-muted hover:text-text-primary transition-colors duration-200"
      @click="skip"
    >
      SKIP [ESC]
    </button>
  </div>
</template>
```

- [ ] **Step 3: Wire BootSequence into App.vue**

Update `src/App.vue` to import and use the boot sequence:

```vue
<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { useBootSequence } from './composables/useBootSequence.js'
import BootSequence from './components/boot/BootSequence.vue'

const { showBoot, isComplete, completeBoot } = useBootSequence()

const activeSection = ref('hero')

provide('bootComplete', isComplete)
provide('activeSection', activeSection)

function onBootComplete() {
  completeBoot()
}

function handleKeydown(e) {
  if (e.key === 'Escape' && showBoot.value) {
    onBootComplete()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative min-h-screen grid-bg">
    <a href="#main-content" class="skip-link">Skip to content</a>

    <!-- Boot sequence overlay -->
    <BootSequence v-if="showBoot" @complete="onBootComplete" />

    <!-- Global overlays -->
    <div v-if="isComplete" class="scanlines" aria-hidden="true"></div>
    <div v-if="isComplete" class="scanline-sweep" aria-hidden="true"></div>
    <div class="noise-overlay" aria-hidden="true"></div>

    <!-- Main content -->
    <main v-if="isComplete" id="main-content" class="relative z-10">
      <p class="text-accent-teal font-mono text-center pt-20">
        [SYSTEM ONLINE — Sections loading...]
      </p>
    </main>
  </div>
</template>
```

- [ ] **Step 4: Verify boot sequence**

Run `npm run dev`. Confirm:
- Boot text lines appear one by one with teal color
- Blinking cursor at the end
- "SKIP [ESC]" button in bottom-right, functional on click
- ESC key also skips
- After boot completes, main content appears with scan lines
- On page refresh, boot is skipped (localStorage persists)
- Clear localStorage to test boot again: `localStorage.removeItem('hasBooted')`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add boot sequence with skip, ESC key, localStorage persistence, and reduced-motion bypass"
```

---

### Task 5: Navigation & Scroll Spy

**Files:**
- Create: `src/components/nav/TopNav.vue`, `src/composables/useScrollSpy.js`

**Interfaces:**
- Consumes: `activeSection` (provided by App.vue, Task 1)
- Produces: `<TopNav>` component with scroll-spy highlighting, `useScrollSpy(sectionIds)` composable that updates `activeSection`

- [ ] **Step 1: Create `src/composables/useScrollSpy.js`**

```javascript
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * @param {string[]} sectionIds - Array of section element IDs to observe
 * @returns {{ activeSection: Ref<string> }}
 */
export function useScrollSpy(sectionIds) {
  const activeSection = ref(sectionIds[0] || '')
  let observer = null

  onMounted(() => {
    const options = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    }, options)

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return { activeSection }
}
```

- [ ] **Step 2: Create `src/components/nav/TopNav.vue`**

```vue
<script setup>
import SystemLabel from '../ui/SystemLabel.vue'

defineProps({
  activeSection: { type: String, default: 'hero' },
})

const navItems = [
  { id: 'about', label: 'SYS.PROFILE' },
  { id: 'project-enrollment', label: 'CASE_01' },
  { id: 'project-kickcraft', label: 'CASE_02' },
  { id: 'contact', label: 'CONNECT' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-40 bg-bg-primary/80 backdrop-blur-md border-b border-accent-teal/10"
  >
    <div class="max-w-content mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
      <!-- Logo / Name -->
      <button
        class="font-mono text-xs text-text-primary hover:text-accent-teal transition-colors duration-200"
        @click="scrollTo('hero')"
      >
        RaidouKu<span class="text-accent-teal">_</span>
      </button>

      <!-- Nav tabs -->
      <div class="hidden md:flex items-center gap-1">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="relative px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200"
          :class="
            activeSection === item.id
              ? 'text-accent-teal'
              : 'text-text-muted hover:text-text-primary'
          "
          @click="scrollTo(item.id)"
        >
          <span class="text-text-muted/50">[</span>
          {{ item.label }}
          <span class="text-text-muted/50">]</span>

          <!-- Active indicator -->
          <span
            v-if="activeSection === item.id"
            class="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-teal shadow-glow-teal-sm transition-all duration-300"
          />
        </button>
      </div>

      <!-- Mobile menu toggle -->
      <button
        class="md:hidden font-mono text-xs text-text-muted hover:text-accent-teal transition-colors"
        @click="$emit('toggleMobile')"
      >
        [MENU]
      </button>
    </div>
  </nav>
</template>
```

- [ ] **Step 3: Wire navigation into App.vue**

Update `App.vue` to include TopNav and useScrollSpy. Replace the existing `<script setup>` and `<template>`:

```vue
<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { useBootSequence } from './composables/useBootSequence.js'
import { useScrollSpy } from './composables/useScrollSpy.js'
import BootSequence from './components/boot/BootSequence.vue'
import TopNav from './components/nav/TopNav.vue'

const { showBoot, isComplete, completeBoot } = useBootSequence()

const sectionIds = ['hero', 'about', 'project-enrollment', 'project-kickcraft', 'contact']
const { activeSection } = useScrollSpy(sectionIds)

provide('bootComplete', isComplete)
provide('activeSection', activeSection)

function onBootComplete() {
  completeBoot()
}

function handleKeydown(e) {
  if (e.key === 'Escape' && showBoot.value) {
    onBootComplete()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative min-h-screen grid-bg">
    <a href="#main-content" class="skip-link">Skip to content</a>

    <BootSequence v-if="showBoot" @complete="onBootComplete" />

    <template v-if="isComplete">
      <div class="scanlines" aria-hidden="true"></div>
      <div class="scanline-sweep" aria-hidden="true"></div>
      <div class="noise-overlay" aria-hidden="true"></div>

      <TopNav :active-section="activeSection" />

      <main id="main-content" class="relative z-10 pt-12">
        <!-- Section components will be added in Tasks 6-8 -->
        <section id="hero" class="min-h-screen flex items-center justify-center">
          <p class="text-accent-teal font-mono">[HERO SECTION]</p>
        </section>
        <section id="about" class="min-h-screen flex items-center justify-center">
          <p class="text-accent-teal font-mono">[ABOUT SECTION]</p>
        </section>
        <section id="project-enrollment" class="min-h-screen flex items-center justify-center">
          <p class="text-accent-teal font-mono">[PROJECT 01]</p>
        </section>
        <section id="project-kickcraft" class="min-h-screen flex items-center justify-center">
          <p class="text-accent-teal font-mono">[PROJECT 02]</p>
        </section>
        <section id="contact" class="min-h-screen flex items-center justify-center">
          <p class="text-accent-teal font-mono">[CONTACT]</p>
        </section>
      </main>
    </template>
  </div>
</template>
```

- [ ] **Step 4: Verify navigation**

Run `npm run dev`. Confirm:
- Fixed nav bar at top with blur backdrop
- "RaidouKu_" logo on left, nav tabs on right
- Clicking a tab smooth-scrolls to corresponding section
- Active tab highlights in teal as you scroll
- Nav tabs hidden on mobile, [MENU] button shown
- Tabs styled with bracket decoration `[SYS.PROFILE]`

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add TopNav with scroll-spy, smooth scrolling, active section highlighting"
```

---

### Task 6: Hero Section

**Files:**
- Create: `src/components/hero/HeroSection.vue`

**Interfaces:**
- Consumes: `profile` (Task 2), `GlowText` and `DataReadout` (Task 3), `createSectionReveal` (Task 2), GSAP
- Produces: `<HeroSection>` component — rendered in App.vue

- [ ] **Step 1: Create `src/components/hero/HeroSection.vue`**

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { profile } from '../../assets/data/profile.js'
import GlowText from '../ui/GlowText.vue'
import DataReadout from '../ui/DataReadout.vue'
import SystemLabel from '../ui/SystemLabel.vue'
import TechButton from '../ui/TechButton.vue'

const heroRef = ref(null)
const nameRef = ref(null)
const taglineRef = ref(null)
const ctaRef = ref(null)

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) return

  const tl = gsap.timeline({ delay: 0.3 })

  tl.from(nameRef.value, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
  })
  tl.from(
    taglineRef.value,
    {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    },
    '-=0.3'
  )
  tl.from(
    ctaRef.value,
    {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
    },
    '-=0.2'
  )
})
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
  >
    <!-- Decorative data readouts -->
    <div class="absolute top-24 left-6 hidden lg:block">
      <DataReadout
        :lines="[
          'SYS.TIME: ' + new Date().toISOString().slice(0, 19),
          'LOC: MANILA, PH',
          'STATUS: ACTIVE ●',
        ]"
      />
    </div>
    <div class="absolute bottom-16 right-6 hidden lg:block">
      <DataReadout
        :lines="[
          'CONN: SECURE',
          'PROTO: HTTPS/2',
          'NODE: PORTFOLIO_v1.0',
        ]"
      />
    </div>

    <!-- Main content -->
    <div class="text-center max-w-3xl mx-auto">
      <SystemLabel text="SYSTEM ONLINE" color="teal" class="mb-6 block" />

      <h1
        ref="nameRef"
        class="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-wider text-text-primary mb-4"
      >
        <GlowText color="teal">{{ profile.alias }}</GlowText>
      </h1>

      <p
        ref="taglineRef"
        class="font-heading text-xl sm:text-2xl text-text-muted tracking-wide mb-2"
      >
        {{ profile.name }}
      </p>

      <p class="font-mono text-sm text-accent-amber tracking-widest uppercase mb-10">
        {{ profile.tagline }}
      </p>

      <div ref="ctaRef" class="flex items-center justify-center gap-4 flex-wrap">
        <TechButton
          variant="primary"
          @click="document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })"
        >
          Explore //
        </TechButton>
        <TechButton
          :href="profile.github"
          variant="amber"
        >
          GitHub →
        </TechButton>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span class="font-mono text-[10px] text-text-muted tracking-widest uppercase">Scroll</span>
      <div class="w-px h-8 bg-gradient-to-b from-accent-teal/50 to-transparent animate-pulse" />
    </div>
  </section>
</template>
```

- [ ] **Step 2: Replace the hero placeholder in App.vue**

In `App.vue`, add the import:
```javascript
import HeroSection from './components/hero/HeroSection.vue'
```

Replace the hero section placeholder:
```html
<!-- Replace this: -->
<section id="hero" class="min-h-screen flex items-center justify-center">
  <p class="text-accent-teal font-mono">[HERO SECTION]</p>
</section>

<!-- With this: -->
<HeroSection />
```

- [ ] **Step 3: Verify hero section**

Run `npm run dev`. Confirm:
- "RaidouKu" displays large with teal glow
- Name and tagline beneath it
- Two CTA buttons with chamfered corners
- Data readouts in corners on desktop (hidden on mobile)
- System label `[SYSTEM ONLINE]` above name
- Scroll indicator at bottom
- Entry animation plays: name slides up, tagline follows, buttons follow

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add HeroSection with animated entry, data readouts, and CTAs"
```

---

### Task 7: About Section

**Files:**
- Create: `src/components/about/AboutSection.vue`

**Interfaces:**
- Consumes: `profile` (Task 2), `GlassPanel`, `SystemLabel`, `ProgressBar` (Task 3), `createSectionReveal`, `createStaggerReveal` (Task 2)
- Produces: `<AboutSection>` component — rendered in App.vue

- [ ] **Step 1: Create `src/components/about/AboutSection.vue`**

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { profile } from '../../assets/data/profile.js'
import { createSectionReveal, createStaggerReveal } from '../../utils/animations.js'
import GlassPanel from '../ui/GlassPanel.vue'
import SystemLabel from '../ui/SystemLabel.vue'
import ProgressBar from '../ui/ProgressBar.vue'

const sectionRef = ref(null)
const skillsRef = ref(null)

const skillCategories = [
  { key: 'design', label: 'DESIGN_TOOLS', color: 'amber' },
  { key: 'frontend', label: 'FRONTEND', color: 'teal' },
  { key: 'backend', label: 'BACKEND', color: 'teal' },
  { key: 'tools', label: 'DEV_TOOLS', color: 'teal' },
]

onMounted(() => {
  createSectionReveal(sectionRef.value)
  if (skillsRef.value) {
    createStaggerReveal(skillsRef.value, '[data-skill-card]', 0.12)
  }
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="relative py-20 lg:py-28 px-4 sm:px-6"
  >
    <div class="max-w-content mx-auto">
      <!-- Section header -->
      <div class="mb-12">
        <SystemLabel text="SYS.PROFILE" color="teal" class="mb-3 block" />
        <h2 class="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-wide">
          About<span class="text-accent-teal">_</span>
        </h2>
      </div>

      <!-- Bio + Skills grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Bio panel -->
        <div class="lg:col-span-5">
          <GlassPanel>
            <SystemLabel text="BIO" color="amber" class="mb-4 block" />
            <p class="text-text-primary leading-relaxed font-body">
              <span v-if="profile.bio.startsWith('[PLACEHOLDER')" class="placeholder-marker">
                {{ profile.bio }}
              </span>
              <span v-else>{{ profile.bio }}</span>
            </p>
            <div class="mt-6 pt-4 border-t border-text-muted/20">
              <div class="font-mono text-xs text-text-muted space-y-1">
                <div>// AFFILIATION: {{ profile.school }}</div>
                <div>// STATUS: <span class="text-accent-teal">ACTIVE</span></div>
              </div>
            </div>
          </GlassPanel>
        </div>

        <!-- Skills panel -->
        <div class="lg:col-span-7" ref="skillsRef">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassPanel
              v-for="category in skillCategories"
              :key="category.key"
              data-skill-card
            >
              <SystemLabel :text="category.label" :color="category.color" class="mb-4 block" />
              <div class="space-y-3">
                <ProgressBar
                  v-for="skill in profile.skills[category.key]"
                  :key="skill.name"
                  :label="skill.name"
                  :value="skill.level"
                />
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Wire AboutSection into App.vue**

Import `AboutSection` and replace the about placeholder:

```javascript
import AboutSection from './components/about/AboutSection.vue'
```

```html
<!-- Replace the about placeholder with: -->
<AboutSection />
```

- [ ] **Step 3: Verify about section**

Run `npm run dev`. Scroll to the About section. Confirm:
- Section fades in on scroll (ScrollTrigger)
- `[SYS.PROFILE]` label and "About_" heading
- Bio panel with placeholder marker (dashed border) on the left
- 4 skill category cards stagger in on the right
- Progress bars with segmented fill and glow
- School info in monospaced text at bottom of bio panel
- Responsive: stacks vertically on mobile

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add AboutSection with bio panel, skill diagnostics, scroll-triggered reveals"
```

---

### Task 8: Projects Section, Contact Section, Footer, & Final Assembly

**Files:**
- Create: `src/components/projects/ProjectCard.vue`, `src/components/projects/ProjectSection.vue`, `src/components/contact/ContactSection.vue`, `src/components/footer/AppFooter.vue`
- Modify: `src/App.vue` — final wiring of all sections

**Interfaces:**
- Consumes: `projects` (Task 2), `profile` (Task 2), all UI components (Task 3), animation utils (Task 2)
- Produces: Complete assembled portfolio with all 7 sections

- [ ] **Step 1: Create `src/components/projects/ProjectCard.vue`**

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { createSectionReveal } from '../../utils/animations.js'
import GlassPanel from '../ui/GlassPanel.vue'
import SystemLabel from '../ui/SystemLabel.vue'
import TechButton from '../ui/TechButton.vue'

const props = defineProps({
  project: { type: Object, required: true },
  reversed: { type: Boolean, default: false },
})

const cardRef = ref(null)

onMounted(() => {
  createSectionReveal(cardRef.value)
})
</script>

<template>
  <div ref="cardRef" class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
    <!-- Image area -->
    <div
      class="lg:col-span-7"
      :class="{ 'lg:order-2': reversed }"
    >
      <GlassPanel class="overflow-hidden">
        <div class="aspect-video bg-bg-secondary flex items-center justify-center">
          <img
            v-if="project.imageUrl"
            :src="project.imageUrl"
            :alt="project.title"
            class="w-full h-full object-cover"
            loading="lazy"
            width="800"
            height="450"
          />
          <div v-else class="placeholder-marker text-center p-8">
            [PLACEHOLDER: {{ project.imagePlaceholder }}]
          </div>
        </div>
      </GlassPanel>
    </div>

    <!-- Info area -->
    <div
      class="lg:col-span-5"
      :class="{ 'lg:order-1': reversed }"
    >
      <SystemLabel :text="project.label" color="amber" class="mb-3 block" />

      <h3 class="font-heading font-bold text-2xl sm:text-3xl text-text-primary tracking-wide mb-4">
        {{ project.title }}
      </h3>

      <p class="text-text-primary/80 leading-relaxed mb-6 font-body">
        <span v-if="project.description.startsWith('[PLACEHOLDER')" class="placeholder-marker">
          {{ project.description }}
        </span>
        <span v-else>{{ project.description }}</span>
      </p>

      <!-- Tech tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in project.tech"
          :key="tech"
          class="font-mono text-[11px] text-accent-teal border border-accent-teal/30 px-2.5 py-1 uppercase tracking-wider"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Meta -->
      <div class="font-mono text-xs text-text-muted space-y-1 mb-6">
        <div>// ROLE: {{ project.role }}</div>
        <div>// STATUS: {{ project.status }}</div>
        <div v-if="project.team">// TEAM: {{ project.team }}</div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3">
        <TechButton v-if="project.repoUrl" :href="project.repoUrl" variant="primary">
          Source Code →
        </TechButton>
        <TechButton v-if="project.demoUrl" :href="project.demoUrl" variant="amber">
          Live Demo →
        </TechButton>
      </div>
    </div>
  </div>
</template>
```

- [ ] **Step 2: Create `src/components/projects/ProjectSection.vue`**

```vue
<script setup>
import { projects } from '../../assets/data/projects.js'
import SystemLabel from '../ui/SystemLabel.vue'
import ProjectCard from './ProjectCard.vue'
</script>

<template>
  <section class="relative py-20 lg:py-28 px-4 sm:px-6">
    <div class="max-w-content mx-auto">
      <!-- Section header -->
      <div class="mb-16">
        <SystemLabel text="CASE_FILES" color="teal" class="mb-3 block" />
        <h2 class="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-wide">
          Projects<span class="text-accent-teal">_</span>
        </h2>
      </div>

      <!-- Project list -->
      <div class="space-y-20 lg:space-y-28">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          :id="'project-' + project.id.replace('ncst-', '')"
        >
          <ProjectCard :project="project" :reversed="index % 2 !== 0" />
        </div>
      </div>
    </div>
  </section>
</template>
```

Note: The section IDs are set dynamically — `project-enrollment` and `project-kickcraft` — matching the IDs in the scroll spy.

- [ ] **Step 3: Create `src/components/contact/ContactSection.vue`**

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { profile } from '../../assets/data/profile.js'
import { createSectionReveal } from '../../utils/animations.js'
import GlassPanel from '../ui/GlassPanel.vue'
import SystemLabel from '../ui/SystemLabel.vue'
import TechButton from '../ui/TechButton.vue'

const sectionRef = ref(null)

const contactLines = [
  { label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GITHUB', value: '@RaidouKu', href: profile.github },
]

// Add socials if they exist
Object.entries(profile.socials).forEach(([key, value]) => {
  if (value) {
    contactLines.push({ label: key.toUpperCase(), value, href: value })
  }
})

onMounted(() => {
  createSectionReveal(sectionRef.value)
})
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="relative py-20 lg:py-28 px-4 sm:px-6"
  >
    <div class="max-w-content mx-auto max-w-2xl">
      <!-- Section header -->
      <div class="mb-12 text-center">
        <SystemLabel text="CONNECT" color="teal" class="mb-3 block" />
        <h2 class="font-heading font-bold text-3xl sm:text-4xl text-text-primary tracking-wide">
          Contact<span class="text-accent-teal">_</span>
        </h2>
        <p class="mt-4 text-text-muted font-body">
          Open to opportunities, collaborations, and conversations.
        </p>
      </div>

      <!-- Terminal-style contact card -->
      <GlassPanel>
        <div class="font-mono text-sm space-y-3">
          <div class="text-text-muted mb-4">
            <span class="text-accent-teal">visitor@portfolio</span>:<span class="text-accent-amber">~</span>$ cat contact.info
          </div>

          <div
            v-for="item in contactLines"
            :key="item.label"
            class="flex items-start gap-3"
          >
            <span class="text-text-muted min-w-[80px]">{{ item.label }}:</span>
            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-accent-teal hover:text-accent-teal-hover transition-colors duration-200 underline underline-offset-4 decoration-accent-teal/30 hover:decoration-accent-teal break-all"
            >
              {{ item.value }}
            </a>
          </div>

          <div class="mt-6 pt-4 border-t border-text-muted/20 text-text-muted">
            <span class="text-accent-teal">visitor@portfolio</span>:<span class="text-accent-amber">~</span>$
            <span class="inline-block w-2 h-4 bg-accent-teal ml-1 animate-pulse" />
          </div>
        </div>
      </GlassPanel>

      <!-- CTA -->
      <div class="mt-8 text-center">
        <TechButton :href="`mailto:${profile.email}`" variant="primary">
          Send Email →
        </TechButton>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 4: Create `src/components/footer/AppFooter.vue`**

```vue
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
```

- [ ] **Step 5: Final App.vue assembly**

Replace `src/App.vue` entirely with the final version:

```vue
<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import { useBootSequence } from './composables/useBootSequence.js'
import { useScrollSpy } from './composables/useScrollSpy.js'
import BootSequence from './components/boot/BootSequence.vue'
import TopNav from './components/nav/TopNav.vue'
import HeroSection from './components/hero/HeroSection.vue'
import AboutSection from './components/about/AboutSection.vue'
import ProjectSection from './components/projects/ProjectSection.vue'
import ContactSection from './components/contact/ContactSection.vue'
import AppFooter from './components/footer/AppFooter.vue'

const { showBoot, isComplete, completeBoot } = useBootSequence()

const sectionIds = ['hero', 'about', 'project-enrollment', 'project-kickcraft', 'contact']
const { activeSection } = useScrollSpy(sectionIds)

provide('bootComplete', isComplete)
provide('activeSection', activeSection)

function onBootComplete() {
  completeBoot()
}

function handleKeydown(e) {
  if (e.key === 'Escape' && showBoot.value) {
    onBootComplete()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative min-h-screen grid-bg">
    <a href="#main-content" class="skip-link">Skip to content</a>

    <BootSequence v-if="showBoot" @complete="onBootComplete" />

    <template v-if="isComplete">
      <div class="scanlines" aria-hidden="true"></div>
      <div class="scanline-sweep" aria-hidden="true"></div>
      <div class="noise-overlay" aria-hidden="true"></div>

      <TopNav :active-section="activeSection" />

      <main id="main-content" class="relative z-10 pt-12">
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <ContactSection />
      </main>

      <AppFooter />
    </template>
  </div>
</template>
```

- [ ] **Step 6: Verify complete portfolio**

Run `npm run dev`. Full verification checklist:
- [ ] Boot sequence plays on first visit, skippable
- [ ] Boot is skipped on refresh (localStorage)
- [ ] Nav bar fixed at top with blur, active tab highlights on scroll
- [ ] Hero: name with glow, tagline, CTAs, data readouts on desktop
- [ ] About: bio placeholder with dashed border, 4 skill categories with progress bars
- [ ] Project 01: Enrollment system card with tech tags, source code link
- [ ] Project 02: Kickcraft card (reversed layout), tech tags, source code link
- [ ] Contact: terminal-style layout, email/GitHub links clickable, blinking cursor
- [ ] Footer: copyright, uptime counter ticking, status indicator
- [ ] Scan lines visible across entire page
- [ ] CRT noise texture visible (very subtle)
- [ ] Grid background pattern visible
- [ ] All glass panels have backdrop blur and glow borders
- [ ] Smooth scrolling between sections
- [ ] Responsive on mobile (stacked layouts, hidden desktop-only elements)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add ProjectSection, ContactSection, AppFooter — complete portfolio assembly"
```

---

### Task 9: Production Build & Deployment Prep

**Files:**
- Modify: `package.json` (verify scripts)
- Create: None (build output goes to `dist/`)

**Interfaces:**
- Consumes: Everything from Tasks 1-8
- Produces: Production-ready `dist/` folder for InfinityFree upload

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Verify: No build errors. Check `dist/` folder exists with `index.html` and `assets/` folder.

- [ ] **Step 2: Test production build locally**

```bash
npx serve dist
```

Open the URL (usually http://localhost:3000). Walk through the same verification checklist from Task 8, Step 6. Confirm everything works with relative paths.

- [ ] **Step 3: Verify bundle sizes**

```bash
npx vite-bundle-visualizer
```

Or check the build output. Target: initial JS < 150KB gzipped. GSAP should be a separate chunk.

- [ ] **Step 4: Verify .htaccess is in dist**

Check that `dist/.htaccess` exists (copied from `public/.htaccess`).

- [ ] **Step 5: Commit final state**

```bash
git add -A
git commit -m "chore: verify production build, deployment-ready for InfinityFree"
```

---

## Self-Review Checklist

| Spec Requirement | Implementing Task |
|:---|:---|
| Boot sequence (2-3s, skippable, localStorage) | Task 4 |
| Hero (name, tagline, HUD elements) | Task 6 |
| About / SYS_SPECS (bio, skills as progress bars) | Task 7 |
| PROJECT_01 — Enrollment System | Task 8 |
| PROJECT_02 — Kickcraft | Task 8 |
| Contact / Terminal (email, GitHub) | Task 8 |
| Footer (status bar, uptime) | Task 8 |
| Fixed nav with scroll-spy | Task 5 |
| GSAP ScrollTrigger reveals | Tasks 6, 7, 8 |
| Design system tokens in Tailwind | Task 1 |
| Scan lines, CRT noise, grid, glass panels | Task 1 (effects.css) |
| Reduced motion support | Tasks 1, 2, 4 |
| Accessibility (focus-visible, skip link, semantic HTML) | Task 1, all sections |
| Hash routing for InfinityFree | Task 1 |
| Production build + deployment | Task 9 |
| Static data (no API calls) | Task 2 |
| Placeholder markers styled with dashed borders | Task 1 (main.css), Tasks 7, 8 |
