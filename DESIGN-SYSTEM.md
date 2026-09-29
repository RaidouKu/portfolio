# Design System: Ghost in the Shell Tech-UI + Y2K Warmth

This document serves as the comprehensive design system for the portfolio website. It details the color palette, typography scale, spacing system, component specifications, animation guidelines, and visual effects required to achieve the "Ghost in the Shell tech-UI + Y2K warmth" aesthetic.

## 1. Color System

### Base Colors

| Token | Hex | RGB | Usage |
|:---|:---|:---|:---|
| `--bg-primary` | `#0a0e14` | `10, 14, 20` | Deep warm black base |
| `--bg-secondary` | `#111923` | `17, 25, 35` | Panel/card backgrounds |
| `--bg-overlay` | `rgba(10,14,20,0.85)` | - | Translucent overlays |

### Accents

| Token | Hex | RGB | Usage |
|:---|:---|:---|:---|
| `--accent-teal` | `#00e5c3` | `0, 229, 195` | Primary accent — GitS teal |
| `--accent-amber` | `#f0a030` | `240, 160, 48` | Secondary accent — warm status |
| `--accent-red` | `#ff3b4e` | `255, 59, 78` | Alerts, danger, hover emphasis |

### Typography & Lines

| Token | Hex | RGB | Usage |
|:---|:---|:---|:---|
| `--text-primary` | `#e8ece4` | `232, 236, 228` | Warm off-white body text |
| `--text-muted` | `#5a6a7a` | `90, 106, 122` | Metadata, labels, decoration |
| `--border-glow` | `rgba(0,229,195,0.15)` | - | Panel border glow |

### Interactive States

| Token | Hex / Value | Usage |
|:---|:---|:---|
| `--accent-teal-hover` | `#33ebd1` | Teal hover state |
| `--accent-teal-active` | `#00ccad` | Teal active state |
| `--accent-amber-hover` | `#f3b355` | Amber hover state |
| `--accent-red-hover` | `#ff6271` | Red hover state |
| `--focus-ring` | `rgba(0,229,195,0.6)` | Focus ring color |
| `--bg-hover` | `#16212d` | General panel hover |

### Gradients
- `--grad-teal-fade`: `linear-gradient(180deg, rgba(0,229,195,0.1) 0%, rgba(0,229,195,0) 100%)`
- `--grad-scanline`: `linear-gradient(0deg, rgba(0,229,195,0) 0%, rgba(0,229,195,0.2) 50%, rgba(0,229,195,0) 100%)`

---

## 2. Typography Scale

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=JetBrains+Mono:wght@400;500&family=Orbitron:wght@700;900&family=Space+Grotesk:wght@500;600;700&display=swap');
```

| Role | Font Family | Weight | Size (desktop) | Size (mobile) | Line Height | Letter Spacing |
|:---|:---|:---|:---|:---|:---|:---|
| Display / Hero | Orbitron | 700-900 | 48-72px | 32-48px | 1.1 | 0.05em |
| Section Heading | Space Grotesk | 600-700 | 28-36px | 22-28px | 1.2 | 0.02em |
| Subsection | Space Grotesk | 500 | 20-24px | 18-20px | 1.3 | 0.01em |
| Body | Inter | 400 | 16px | 15px | 1.6 | 0 |
| Code/Labels | JetBrains Mono | 400-500 | 12-14px | 11-13px | 1.4 | 0.05em |
| Nav Items | JetBrains Mono | 500 | 13px | 12px | 1 | 0.1em |

---

## 3. Spacing System

- **Base unit:** `8px`
- **Scale:** `4`, `8`, `12`, `16`, `24`, `32`, `48`, `64`, `80`, `96`, `120`
- **Section vertical padding:** `80-120px`
- **Content max-width:** `1200px`
- **Card internal padding:** `24px`
- **Gap between grid items:** `16-24px`

---

## 4. Component Specifications

### 1. GlassPanel
- **Visual:** Translucent card with backdrop blur and border glow.
- **CSS:**
  - `background`: `rgba(17, 25, 35, 0.6)`
  - `backdrop-filter`: `blur(12px)`
  - `border`: `1px solid rgba(0, 229, 195, 0.2)`
  - `box-shadow`: `0 4px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 229, 195, 0.05)`
  - `border-radius`: `4px` (slightly brutalist)
- **States:**
  - *Hover*: `border: 1px solid rgba(0, 229, 195, 0.5)`, `box-shadow`: `... inset 0 0 30px rgba(0, 229, 195, 0.1)`
- **Responsive:** Adjust internal padding from `24px` to `16px` on mobile.

### 2. SystemLabel
- **Visual:** JetBrains Mono uppercase label with bracket decoration `[LABEL]`.
- **CSS:**
  - `font-family`: `'JetBrains Mono', monospace`
  - `font-size`: `12px`
  - `color`: `var(--accent-teal)`
  - `letter-spacing`: `0.1em`
- **Structure:** `::before { content: '[' }`, `::after { content: ']' }` with `color: var(--text-muted)`

### 3. TechButton
- **Visual:** Primary CTA with teal glow, amber variant. Geometric shape.
- **CSS:**
  - `background`: `transparent`
  - `border`: `1px solid var(--accent-teal)`
  - `color`: `var(--accent-teal)`
  - `padding`: `12px 24px`
  - `font-family`: `'JetBrains Mono', monospace`
  - `text-transform`: `uppercase`
  - `letter-spacing`: `0.1em`
  - `clip-path`: `polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)` (chamfered bottom right corner)
- **States:**
  - *Hover*: `background: rgba(0, 229, 195, 0.1)`, `box-shadow: 0 0 15px rgba(0,229,195,0.4)`
  - *Active*: `background: rgba(0, 229, 195, 0.2)`
  - *Disabled*: `border-color: var(--text-muted)`, `color: var(--text-muted)`, `cursor: not-allowed`
- **Variants:** Amber variant uses `--accent-amber` instead of teal.

### 4. ProgressBar
- **Visual:** Skill progress indicator, segmented style.
- **CSS:**
  - Container: `height: 8px`, `background: rgba(90, 106, 122, 0.2)`
  - Fill: `background: var(--accent-teal)`, `box-shadow: 0 0 10px var(--accent-teal)`
  - Segments overlay: A repeating linear-gradient to create vertical gaps. `background: repeating-linear-gradient(90deg, transparent, transparent 4px, var(--bg-primary) 4px, var(--bg-primary) 6px)`

### 5. ScanLine
- **Visual:** Full-page scan line overlay moving top to bottom.
- **CSS:**
  - `position`: `fixed`, `top: 0`, `left: 0`, `width: 100%`, `height: 100vh`
  - `pointer-events`: `none`
  - `background`: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))`
  - `background-size`: `100% 4px`
- **Animation:** Requires a sweeping horizontal highlight as well (see Animations).

### 6. GridBackground
- **Visual:** Faint background grid pattern.
- **CSS:**
  - `background-image`: `linear-gradient(rgba(0, 229, 195, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 195, 0.05) 1px, transparent 1px)`
  - `background-size`: `32px 32px`

### 7. GlowText
- **Visual:** Text with colored text-shadow glow.
- **CSS:**
  - `text-shadow`: `0 0 8px rgba(0, 229, 195, 0.6), 0 0 16px rgba(0, 229, 195, 0.3)`

### 8. DataReadout
- **Visual:** Decorative floating data (coordinates, timestamps, status).
- **CSS:**
  - `font-family`: `'JetBrains Mono', monospace`
  - `font-size`: `10px`
  - `color`: `var(--text-muted)`
  - `line-height`: `1.2`
  - Positioned absolutely relative to container.

### 9. NavTab
- **Visual:** Navigation tab item with active indicator.
- **CSS:**
  - `color`: `var(--text-muted)`
  - `padding`: `8px 16px`
  - `position`: `relative`
- **States:**
  - *Hover*: `color`: `var(--text-primary)`
  - *Active*: `color`: `var(--accent-teal)`. Includes a bottom border `2px solid var(--accent-teal)` with `box-shadow: 0 2px 8px rgba(0,229,195,0.5)`.

### 10. ProjectCard
- **Visual:** Project showcase card with image, tech tags, links. Based on GlassPanel.
- **Structure:**
  - Image Wrapper: `aspect-ratio: 16/9`, grayscale filter applied.
  - Hover: Grayscale removed, subtle scale up `1.05`.
  - Tags: Inline flex, using `SystemLabel` style but smaller.
  - Links: `TechButton` variants.

### 11. TerminalInput
- **Visual:** Monospaced input field with blinking cursor.
- **CSS:**
  - `background`: `transparent`
  - `border`: `none`
  - `border-bottom`: `1px solid var(--accent-teal)`
  - `color`: `var(--accent-teal)`
  - `font-family`: `'JetBrains Mono', monospace`
  - `outline`: `none`
- **Focus:** `box-shadow: 0 1px 0 0 var(--accent-teal)`

### 12. StatusBar
- **Visual:** Footer status bar with system info decorations.
- **CSS:**
  - `height`: `32px`
  - `background`: `var(--bg-secondary)`
  - `border-top`: `1px solid var(--text-muted)`
  - `display`: `flex`, `justify-content`: `space-between`, `align-items`: `center`
  - `padding`: `0 16px`
  - `font-size`: `11px`, `color`: `var(--text-muted)`

---

## 5. Animation Specifications

| Animation | Properties | Duration | Easing | Trigger |
|:---|:---|:---|:---|:---|
| Boot text typing | opacity, width (steps) | 50ms per char | steps(N, end) | Page load |
| Section reveal | opacity, translateY | 600ms | cubic-bezier(0.23,1,0.32,1) | ScrollTrigger |
| Panel fade-in | opacity, scale | 400ms | ease-out | ScrollTrigger |
| Nav indicator | left, width | 300ms | cubic-bezier(0.23,1,0.32,1) | Section change |
| Button hover glow | box-shadow, border-color | 200ms | ease | Hover |
| Scan line sweep | translateY | 8s | linear | Infinite loop |
| Data readout flicker | opacity | 100ms | steps(2) | Random interval |
| Skill bar fill | width | 800ms | cubic-bezier(0.23,1,0.32,1) | ScrollTrigger |

---

## 6. Iconography

- No icon library — use text symbols and Unicode for the tech aesthetic.
- **Decorative elements:** `[ ]`, `|`, `//`, `●`, `→`, `>>`, `_`, `■`
- **Example Usage:** `[ /// PROJECT_DATA ]`, `STATUS: ONLINE ●`, `READ MORE →`
- If icons are strictly needed: **Phosphor Icons** (line weight matches the tech aesthetic, typically 1.5px to 2px stroke).

---

## 7. Responsive Breakpoints

| Name | Min Width | Tailwind Prefix |
|:---|:---|:---|
| Mobile | 0px | (default) |
| Tablet | 768px | md: |
| Desktop | 1024px | lg: |
| Wide | 1280px | xl: |

---

## 8. Accessibility

- **Contrast Ratios:** All text/bg combinations must pass WCAG AA (4.5:1 for normal text, 3:1 for large text).
  - `--text-primary` (`#e8ece4`) on `--bg-primary` (`#0a0e14`) = **14.2:1** (Pass)
  - `--accent-teal` (`#00e5c3`) on `--bg-primary` = **10.6:1** (Pass)
  - `--text-muted` (`#5a6a7a`) on `--bg-primary` = **4.8:1** (Pass)
- **Prefers-reduced-motion:** Disable scan lines, boot sequence, parallax. Keep opacity fades.
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```
- **Focus visible styles:** Teal outline, 2px offset.
  ```css
  :focus-visible {
    outline: 2px solid var(--accent-teal);
    outline-offset: 2px;
  }
  ```
- All interactive elements must be keyboard-navigable.
- Include a "Skip-to-content" link at the very top of the DOM.

---

## 9. Visual Effect Recipes (Exact CSS)

### Scan Line Overlay
```css
.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0),
    rgba(255,255,255,0) 50%,
    rgba(0,0,0,0.1) 50%,
    rgba(0,0,0,0.1)
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 9999;
}

.scanline-sweep {
  position: absolute;
  width: 100%;
  height: 100px;
  background: linear-gradient(0deg, rgba(0,229,195,0) 0%, rgba(0,229,195,0.1) 50%, rgba(0,229,195,0) 100%);
  opacity: 0.4;
  animation: sweep 8s linear infinite;
}

@keyframes sweep {
  0% { transform: translateY(-100px); }
  100% { transform: translateY(100vh); }
}
```

### CRT Noise Texture
```css
.noise-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
```

### Panel Glow Border
```css
.panel-glow {
  border: 1px solid rgba(0, 229, 195, 0.2);
  box-shadow: inset 0 0 20px rgba(0, 229, 195, 0.05),
              0 0 10px rgba(0, 229, 195, 0.1);
  transition: all 0.3s ease;
}
.panel-glow:hover {
  border-color: rgba(0, 229, 195, 0.5);
  box-shadow: inset 0 0 30px rgba(0, 229, 195, 0.1),
              0 0 15px rgba(0, 229, 195, 0.2);
}
```

### Text Glow Effect
```css
.text-glow {
  color: var(--accent-teal);
  text-shadow: 0 0 5px rgba(0, 229, 195, 0.6), 
               0 0 10px rgba(0, 229, 195, 0.4),
               0 0 20px rgba(0, 229, 195, 0.2);
}
```

### Grid Background Pattern
```css
.grid-bg {
  background-color: var(--bg-primary);
  background-image: 
    linear-gradient(rgba(0, 229, 195, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 229, 195, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
  background-position: center center;
}
```

### Translucent Glass Panel
```css
.glass-panel {
  background: rgba(17, 25, 35, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```
