# Agent/Development Guide

**For AI Coding Agents (Antigravity, Claude, Cursor, etc.)**

This document serves as the authoritative guide for building the portfolio project for Lebron James Pangan (RaidouKu). It defines the strict rules, standards, and boundaries you must follow when contributing to this codebase.

## 1. Project Identity
- **Owner:** Lebron James Pangan (RaidouKu)
- **Project:** Personal portfolio website for a UI/UX design student.
- **Aesthetic:** Ghost in the Shell tech-UI + Y2K warmth.
- **Stack:** Vue 3 (Composition API) + Vite + Tailwind CSS + GSAP 3.
- **Hosting:** InfinityFree (static files only, upload `dist/` via FTP).
- **Structure:** Single-page narrative SPA.

**Reference Documents:**
- `PRD.md` - Product Requirements Document
- `ARCHITECTURE.md` - Technical Architecture
- `DESIGN-SYSTEM.md` - Visual Design System

## 2. Code Standards
- **Vue 3 Composition API:** Use `<script setup>` syntax exclusively. **NO Options API.**
- **Single File Components (SFCs):** Use `.vue` files with `<script setup>`, `<template>`, and `<style scoped>`.
- **Styling:** Use Tailwind utility classes in templates as the primary styling method. Use custom CSS in `<style scoped>` *only* for complex visual effects that Tailwind cannot handle cleanly.
- **Animations:** Implement GSAP animations within composables or `onMounted` hooks. **Never inline animations.**
- **Language:** Plain JavaScript is preferred. Strict TypeScript is NOT required.
- **File Naming:** Use `kebab-case` for file names and `PascalCase` for component names.
- **Component Size:** Maximum component file length is ~200 lines. Extract logic or UI into smaller components/composables if it exceeds this limit.

## 3. Design Token Usage
- **Strict Compliance:** Reference `DESIGN-SYSTEM.md` for all color, typography, and spacing values.
- **Tailwind Tokens:** Use the custom Tailwind theme tokens defined in `tailwind.config.js`. **Never hardcode hex colors in templates or CSS.**
- **Runtime Variables:** Use CSS custom properties for runtime dynamic values (e.g., glow intensities, animation states).
- **No Default Colors:** Never use default Tailwind colors. The custom palette defined in the design system is the *only* palette.

## 4. Animation Rules
Follow Emil Kowalski's animation philosophy strictly:
- **No Ease-In:** Never use `ease-in` for UI animations.
- **No Scale(0):** Never animate elements from `scale(0)`.
- **Preferred Easing:** Default to ease-out: `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Timing:** Keep standard UI animations under 300ms. Boot/decorative sequences can be longer.
- **Tools:** Use GSAP for scroll-triggered and timeline animations. Use CSS transitions for simple hover/focus states.
- **Accessibility:** `prefers-reduced-motion` must be respected globally.

## 5. Absolute Bans
DO NOT DO ANY OF THE FOLLOWING:
- **NO** template-looking layouts (e.g., generic centered cards with basic gradient backgrounds).
- **NO** generic stock gradients.
- **NO** Comic Sans, Papyrus, or commonly overused fonts.
- **NO** Lorem Ipsum in committed code. Use real drafted content or clearly labeled placeholders (see Section 9).
- **NO** inline styles, except for dynamic values driven by GSAP or Vue bindings.
- **NO** state management libraries (Pinia, Vuex, etc.). The project is too simple.
- **NO** API calls. All data must be static.
- **NO** server-side rendering (SSR). This is a pure client-side SPA.
- **NO** unnecessary npm packages. Do not install a library for something simple CSS/JS can achieve (e.g., no gradient packages).

## 6. Component Guidelines
- **Structure:** Every major section is a Vue component mounted in `App.vue`.
- **Primitives:** Place highly reusable UI primitives (buttons, inputs) in `src/components/ui/`.
- **Sections:** Place section-specific components in `src/components/sections/` (or group them in named folders).
- **Shared Logic:** Extract shared logic into composables (e.g., `useScrollSpy`, `useBootSequence`, `useAnimations`) stored in `src/composables/`.
- **Data Flow:** Use props for configuration, emits for events, and provide/inject for simple global state if necessary.

## 7. Performance Rules
- **Images:** Use WebP format exclusively. Lazy load all images below the fold. Always include `width` and `height` attributes to prevent Cumulative Layout Shift (CLS).
- **Fonts:** Load Google Fonts using `display=swap` and utilize `<link rel="preconnect">`.
- **GSAP Loading:** Import only the required GSAP plugins (e.g., `ScrollTrigger`) and ensure the rest is tree-shaken.
- **Animation Performance:** Avoid layout thrashing. Animate **only** `transform` and `opacity` properties.
- **Target:** Maintain a Lighthouse Performance score of 90+.

## 8. Deployment Checklist
Before finalizing deployment, ensure the following:
- [ ] Run `npm run build` successfully.
- [ ] Verify the `dist/` folder works locally (e.g., using `npx serve dist`).
- [ ] Upload the contents of `dist/` to InfinityFree via FTP.
- [ ] Verify that `.htaccess` is present and correctly configured for hash routing (if applicable).
- [ ] Test the deployed site thoroughly on both mobile and desktop devices.

## 9. Content Placeholders
The owner will update the following content later. When setting up the structure, you must use clear, visible placeholders.
- Bio text
- Project descriptions
- Project screenshots
- Profile photo
- Resume link
- Certifications

**Placeholder Implementation:**
When rendering a placeholder, do not leave blank space. Use a visible marker:
`[PLACEHOLDER: description]`
Style this marker with a subtle dashed border so it is immediately obvious to the owner.

## 10. Skill References
When making design, engineering, or animation decisions, agents must consult these installed skills contextually:
- `emil-design-eng`: For animation philosophy and UI polish.
- `animate`: For building robust, performant animations correctly.
- `impeccable`: For frontend craftsmanship and high-quality polish.
- `design-taste-frontend`: For avoiding generic "slop" frontend design patterns.
- `apple-design`: For core interface design principles.

**Read and execute exactly as specified.**
