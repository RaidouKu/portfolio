# RaidouKu Portfolio

Personal portfolio for Lebron James Pangan, showcasing UI/UX design and full-stack development work. The site is a single-page Vue application with a warm, futuristic tech-interface aesthetic.

## Features

- Animated boot sequence with a skip option and returning-visitor persistence
- Scrollable profile, skills, project case studies, and contact sections
- GSAP-powered interface and scroll animations
- Responsive layout with reduced-motion support
- Static build suitable for shared hosting

## Tech Stack

- Vue 3 and Vue Router
- Vite
- Tailwind CSS
- GSAP

## Local Development

Requires Node.js and npm.

```sh
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Build

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`. `npm run preview` serves that build locally for verification.

## Deployment

This portfolio is designed for static hosting such as InfinityFree, which does not run Node.js applications. Build the site locally with `npm run build`, then upload the contents of `dist/` to the host's web root. Vite is configured with relative asset paths for this setup.

## Project Structure

- `src/components/` - Page sections and reusable UI components
- `src/assets/data/` - Profile and project content
- `src/composables/` - Reusable Vue behavior
- `src/assets/styles/` - Global styling and visual effects
- `public/images/` - Static images and project assets

## Project Documentation

- [Product requirements](PRD.md)
- [Architecture](ARCHITECTURE.md)
- [Design system](DESIGN-SYSTEM.md)