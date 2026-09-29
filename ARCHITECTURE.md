# Portfolio Website Architecture

This document outlines the architecture for a single-page application (SPA) portfolio built with Vue 3, Vite, Tailwind CSS, and GSAP, designed to be deployed as static files to InfinityFree.

## 1. Project File Tree

The project structure organizes files by feature and role, separating reusable UI primitives from specific section components.

```text
portfolio/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       ├── images/
│       └── fonts/
├── src/
│   ├── main.js                 # App entry point, GSAP registration
│   ├── App.vue                 # Root component, layout shell
│   ├── router/
│   │   └── index.js            # Vue Router (Hash mode)
│   ├── components/
│   │   ├── boot/
│   │   │   └── BootSequence.vue
│   │   ├── nav/
│   │   │   └── TopNav.vue
│   │   ├── hero/
│   │   │   └── HeroSection.vue
│   │   ├── about/
│   │   │   └── AboutSection.vue
│   │   ├── projects/
│   │   │   ├── ProjectList.vue
│   │   │   └── ProjectCard.vue
│   │   ├── contact/
│   │   │   └── ContactSection.vue
│   │   ├── footer/
│   │   │   └── AppFooter.vue
│   │   └── ui/                 # Reusable, stateless UI primitives
│   │       ├── BaseButton.vue
│   │       ├── BaseInput.vue
│   │       └── GlitchText.vue
│   ├── composables/            # Shared reactive state and logic
│   │   ├── useScroll.js
│   │   └── useTheme.js
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.css        # Tailwind directives and base styles
│   │   │   └── effects.css     # Complex custom CSS (scanlines, noise)
│   │   └── data/
│   │       ├── projects.js     # Static project data
│   │       └── profile.js      # Personal info
│   └── utils/
│       └── animation.js        # Reusable GSAP timeline factories
├── tailwind.config.js          # Tailwind theme and plugin config
├── vite.config.js              # Vite build and dev server config
├── package.json
└── .htaccess                   # InfinityFree server configuration
```

## 2. Component Architecture

The app follows a flat component hierarchy for major sections and delegates repetitive elements to `ui/` components.

### Component Hierarchy
```text
App
 ├─ BootSequence
 ├─ TopNav
 ├─ HeroSection
 │   └─ GlitchText
 ├─ AboutSection
 ├─ ProjectList
 │   └─ ProjectCard (v-for)
 │       └─ BaseButton
 ├─ ContactSection
 │   ├─ BaseInput
 │   └─ BaseButton
 └─ AppFooter
```

### State Management
State is minimal and managed via Vue Composables (`provide`/`inject` for deeply nested props).
- **`useScroll.js`**: Tracks current scroll position and active section based on IntersectionObserver.
- **Boot State**: A simple `ref(false)` in `App.vue` provided down to control whether the main content should be revealed after `BootSequence.vue` finishes.

### Contracts (Props/Emits)
- **`ProjectCard.vue`**
  - **Props**: `project` (Object: `{ id, title, description, tech: Array, image, url }`), `index` (Number, for staggered animation)
  - **Emits**: `hover` (triggers cursor/glitch effect)
- **`BaseButton.vue`**
  - **Props**: `href` (String, optional), `variant` (String: 'primary' | 'outline')
  - **Emits**: `click` (if no `href`)

## 3. Animation Architecture

GSAP 3 is the core animation engine, heavily relying on `ScrollTrigger` for section reveals.

### Strategy
- **Registration**: Register GSAP plugins globally in `src/main.js`.
  ```javascript
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  gsap.registerPlugin(ScrollTrigger);
  ```
- **Boot Sequence**: `BootSequence.vue` runs a master `gsap.timeline()` on `onMounted`. Upon completion, it emits a `complete` event to unmount itself and trigger `HeroSection` entry animations.
- **ScrollTrigger**: Each section (e.g., `AboutSection`, `ProjectList`) initializes its own `ScrollTrigger` animations on `onMounted` and kills them on `onUnmounted` to prevent memory leaks.

### CSS vs. GSAP Matrix
| Animation Type | Engine | Reason |
| :--- | :--- | :--- |
| Hover states (buttons, links) | CSS Transitions | Native performance, simpler codebase |
| Complex sequencing (Boot) | GSAP Timeline | precise timing, chaining, callbacks |
| Scroll-linked reveals | GSAP ScrollTrigger | scrub control, enter/leave hooks |
| Continuous loops (scanlines) | CSS Keyframes | Offloaded to browser CSS engine |

### Performance Optimization
- Only animate `transform` (translate, scale, rotate) and `opacity`.
- Use `will-change: transform` via CSS classes immediately before animation, removed after.
- Ensure `force3D: true` in GSAP defaults for GPU acceleration.

## 4. Styling Architecture

Uses Tailwind CSS v3 via PostCSS.

### Tailwind Configuration (`tailwind.config.js`)
Extend the default theme with the design system tokens from `DESIGN-SYSTEM.md`.
```javascript
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
    }
  }
}
```

### CSS Layer Strategy
`src/assets/styles/main.css`:
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
    --border-glow: rgba(0,229,195,0.15);
  }
  body {
    @apply bg-bg-primary text-text-primary font-body antialiased overflow-x-hidden;
  }
}
```
*Note: Avoid `@apply` for structural layouts; use utility classes directly in Vue templates. Reserve `@apply` for strict typography standards or complex global resets.*

## 5. Data Architecture

No backend is required. All content is stored as static Javascript objects in `src/assets/data/`.

### `projects.js`
```javascript
export const projects = [
  {
    id: 'ncst-enrollment',
    title: 'NCST Enrollment System',
    description: '[PLACEHOLDER: Description of the enrollment system]',
    tech: ['PHP', 'HTML', 'CSS', 'MySQL'],
    role: 'Full-Stack Developer',
    imageUrl: '/assets/images/projects/enrollment.webp',
    demoUrl: null,
    repoUrl: 'https://github.com/hil9-pya/enrollmentsystem'
  },
  {
    id: 'kickcraft',
    title: 'Kickcraft',
    description: '[PLACEHOLDER: Description of the 3D shoe design website]',
    tech: ['[PLACEHOLDER: Tech stack]'],
    role: '[PLACEHOLDER: Role]',
    imageUrl: '/assets/images/projects/kickcraft.webp',
    demoUrl: null,
    repoUrl: 'https://github.com/hil9-pya/kickcraft'
  }
];
```

## 6. Deployment Architecture

Configured for InfinityFree's static PHP hosting.

### Routing Configuration
Vue Router must use `createWebHashHistory()` to prevent 404 errors on direct navigation, as InfinityFree limits custom routing rules.
```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [ /* ... */ ]
})
```

### Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './', // Relative paths for asset loading
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          vue: ['vue', 'vue-router']
        }
      }
    }
  }
})
```

### Deployment Steps
1. Run `npm run build`.
2. Connect to InfinityFree via FTP (FileZilla).
3. Navigate to `htdocs/`.
4. Upload all contents of the local `dist/` folder into `htdocs/`.

### `.htaccess`
While Hash routing is used, include a basic `.htaccess` in `public/` to enforce HTTPS and disable directory listing.
```apache
Options -Indexes
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## 7. Performance Budget

- **Lighthouse Targets**: Performance > 90, Accessibility > 95, Best Practices 100, SEO 100.
- **Bundle Size**:
  - Initial JS payload < 150kb (gzipped).
  - GSAP chunk separated via Rollup `manualChunks`.
- **Assets**:
  - All images must be WebP format, < 100kb each.
  - Implement native `<img loading="lazy">` for project images.
- **Fonts**: Use `font-display: swap` for WebFonts to prevent Flash of Invisible Text (FOIT).

## 8. Browser Support

- **Target**: Modern browsers (Chrome >= 90, Firefox >= 88, Safari >= 14, Edge >= 90).
- **Graceful Degradation**:
  - `backdrop-filter` (glassmorphism): Fallback to solid, semi-transparent background (`rgba(...)`).
- **Accessibility (a11y)**:
  - Respect `prefers-reduced-motion: reduce`.
  - In GSAP:
    ```javascript
    let mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Complex animations
    });
    ```
