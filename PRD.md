# Product Requirements Document (PRD): Personal Portfolio

## 1. Product Overview
This document defines the requirements for version 1.0 (v1) of the personal portfolio website for Lebron James Pangan (alias: RaidouKu). The site serves as a digital showcase of their skills as a hybrid UI/UX Designer and Developer. To stand out among student portfolios, the site features a distinctive aesthetic merging "Ghost in the Shell" tech-UI with "Y2K warmth" — characterized by translucent panels, scan lines, teal/amber accents on dark backgrounds, and system diagnostic decorations.

## 2. Goals and Non-Goals

### 2.1 Goals
*   **Showcase Hybrid Skills:** Effectively demonstrate proficiency in both UI/UX design and frontend/backend development.
*   **Distinctive Aesthetic:** Implement a cohesive, immersive "warm tech" theme (Ghost in the Shell + Y2K) that serves as a demonstration of design capability.
*   **Performance:** Achieve fast load times (< 2s First Contentful Paint) despite heavy animations.
*   **Frictionless Deployment:** Ensure compatibility with InfinityFree's static hosting constraints (PHP/MySQL supported, Node.js unsupported).

### 2.2 Non-Goals (for v1)
*   Content Management System (CMS) or admin panel (content will be hardcoded).
*   Server-side rendering (SSR) or complex backend logic requiring Node.js.
*   Multi-page routing (the site will be a Single Page Application narrative).
*   User accounts or interactive backend features beyond static contact links.

## 3. User Stories and Acceptance Criteria

| User Story | Acceptance Criteria |
| :--- | :--- |
| **As a recruiter**, I want to quickly see the candidate's core skills and contact info so I can assess their fit for a role. | - Skills are prominently displayed in the "About" section.<br>- Contact info (email, GitHub) is visible in the final section and easily copyable/clickable.<br>- The site functions correctly on major desktop and mobile browsers. |
| **As a design lead**, I want to see the candidate's design sensibility and technical execution to evaluate their frontend capabilities. | - The site adheres strictly to the specified GitS/Y2K warm tech aesthetic.<br>- Animations are smooth (60fps) and do not cause layout jank.<br>- UI elements are responsive and scale correctly across viewport sizes. |
| **As a returning visitor**, I don't want to wait for the intro animation again so I can access the content immediately. | - The boot sequence detects a `localStorage` flag on load.<br>- If the flag exists, the animation is bypassed.<br>- A "Skip" button is immediately available during the initial boot sequence. |

## 4. Functional Requirements

The website is structured as a single-page scrolling narrative with the following sections in order:

### 4.1 Global Navigation
*   **FR-1.1 Fixed Nav Bar:** A sticky navigation bar must be present at all times.
*   **FR-1.2 Aesthetic:** Styled as system tabs (e.g., `[SYS.PROFILE]`, `[CASE_01]`, `[CASE_02]`, `[CONNECT]`).
*   **FR-1.3 Scroll Tracking:** The active section tab must highlight (e.g., turn amber) as the user scrolls down the page.
*   **FR-1.4 Smooth Scroll:** Clicking a tab must smoothly scroll the user to the corresponding anchor section.

### 4.2 Section 1: Boot Sequence
*   **FR-2.1 Animation:** A 2-3 second animated "system initialization" sequence (e.g., terminal text output, loading bars).
*   **FR-2.2 Skippable:** A visible "Skip [ESC]" button must allow bypassing the sequence.
*   **FR-2.3 State Persistence:** Set a `hasBooted=true` flag in `localStorage` upon completion or skip. Read this flag on initialization to bypass the sequence on subsequent visits.

### 4.3 Section 2: Hero
*   **FR-3.1 Content:** Display Name ("Lebron James Pangan" or "RaidouKu") and a prominent tagline defining the role (UI/UX Designer & Developer).
*   **FR-3.2 Visuals:** Include animated HUD elements and floating "data readouts" (using GSAP for continuous, subtle motion).

### 4.4 Section 3: About / SYS_SPECS (`[SYS.PROFILE]`)
*   **FR-4.1 Bio:** Text block for a professional biography (placeholder text in v1).
*   **FR-4.2 Skills Display:** Technical and design skills must be visualized as "system diagnostics" or "progress bars" adhering to the tech aesthetic.

### 4.5 Section 4: PROJECT_01 (`[CASE_01]`)
*   **FR-5.1 Focus:** NCST Enrollment System.
*   **FR-5.2 Content:** Title, role, technologies used (PHP, HTML), brief description, and placeholder areas for screenshots/mockups.
*   **FR-5.3 Layout:** Must allow for detailed text explanation alongside visual assets.

### 4.6 Section 5: PROJECT_02 (`[CASE_02]`)
*   **FR-6.1 Focus:** Kickcraft (3D shoe design website).
*   **FR-6.2 Content:** Title, role, technologies used, brief description, and placeholder areas for screenshots/mockups.

### 4.7 Section 6: Contact / Terminal (`[CONNECT]`)
*   **FR-7.1 Aesthetic:** Styled to resemble a command-line interface or terminal input.
*   **FR-7.2 Links:** Must include explicit links to `pangan.lebronjames1@ncst.edu.ph` and `https://github.com/RaidouKu`.

### 4.8 Global Footer
*   **FR-8.1 Design:** Minimal "system status bar" at the bottom of the page.
*   **FR-8.2 Content:** Copyright info, current year, perhaps a fake "system uptime" or connection status for flavor.

## 5. Non-Functional Requirements

### 5.1 Performance
*   **NFR-1.1 Load Time:** First Contentful Paint (FCP) must be under 2.0 seconds on a standard 4G connection.
*   **NFR-1.2 Animation:** GSAP animations must target 60fps and utilize GPU acceleration (e.g., animating `transform` and `opacity` only).
*   **NFR-1.3 Asset Optimization:** Images must be compressed (WebP preferred) and appropriately sized for placeholders.

### 5.2 Accessibility
*   **NFR-2.1 Contrast:** Text must meet WCAG AA contrast ratios (minimum 4.5:1 for normal text) against the dark background, even with translucent panels.
*   **NFR-2.2 Motion:** Respect `prefers-reduced-motion` media query by disabling continuous animations and the boot sequence.
*   **NFR-2.3 Semantics:** Ensure proper HTML5 semantic tags (`<header>`, `<section>`, `<footer>`, `<nav>`) are used.

### 5.3 Technical Constraints & Deployment
*   **NFR-3.1 Framework:** Vue 3 + Vite + Tailwind CSS.
*   **NFR-3.2 Hosting Constraint:** Must be deployable to InfinityFree. Because Node.js is not supported, the Vue SPA must be built locally (`npm run build`) and the static `dist/` folder uploaded via FTP/File Manager.
*   **NFR-3.3 Routing:** Hash routing or a single index.html catch-all must be configured if Vue Router is used (though a single scrolling page minimizes this need).

## 6. Content Requirements

| Element | Status in v1 | Details |
| :--- | :--- | :--- |
| **Biography** | Placeholder | Needs 2-3 sentences. |
| **Skill List** | Defined | e.g., UI/UX, Vue.js, Tailwind, PHP, Figma. |
| **Project 1 Text** | Defined | Focus on PHP/HTML implementation. |
| **Project 1 Images** | Placeholder | Needs high-res screenshots. |
| **Project 2 Text** | Defined | Focus on 3D/interactive aspects. |
| **Project 2 Images** | Placeholder | Needs high-res screenshots. |
| **Contact Details** | Final | Real email and GitHub link. |

## 7. Scope Boundaries (v1 vs Deferred)

### In Scope (v1)
*   Complete single-page static SPA structure.
*   All GSAP animations and theme styling.
*   Static content for both projects.
*   Deployment to InfinityFree.

### Deferred (v2+)
*   Contact form processing (requires backend).
*   Additional case studies.
*   Dynamic project fetching from a database or API.
*   Complex WebGL/Three.js interactive elements (beyond CSS/GSAP).

## 8. Risk Assessment

| Risk | Impact | Likelihood | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Animation Performance:** Heavy GSAP usage causes lag on low-end devices. | High | Medium | Profile with Chrome DevTools. Restrict animations to `transform`/`opacity`. Implement `prefers-reduced-motion` fallback. |
| **Aesthetic Readability:** The "hacker" theme makes content hard to read for recruiters. | High | High | Prioritize typography. Use the theme for borders/backgrounds but keep core text high-contrast and legible. Avoid excessive text glitch effects. |
| **Deployment Issues:** InfinityFree caching or path issues break the Vue app. | Medium | Low | Test static build locally using a simple HTTP server before uploading. Ensure relative paths are configured correctly in `vite.config.js` (`base: './'`). |
