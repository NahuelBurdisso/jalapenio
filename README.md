# Jalapeño

Portfolio site for a digital marketing studio — motion-led, with a WebGL hero that degrades gracefully.

**Live:** https://www.jalapeno.studio

Astro 5 · React 19 islands · TypeScript · Tailwind CSS v4 · three.js / React Three Fiber · Motion · Lenis

> The package and repo slug is `jalapenio` (ASCII) so the `ñ` doesn't break npm names, paths or URLs.

## What's interesting here

- **WebGL that never blocks the page.** `WebglStar` renders an SVG star first, lazy-loads the three.js scene only after the first real user interaction, and falls back to the SVG through an error boundary if WebGL is unavailable or the canvas throws. The 3D chunk stays out of the initial load.
- **Static first, hydrated where needed.** Pages are Astro; only the interactive pieces (3D scene, magnetic buttons, marquee, smooth scroll) ship as React islands.
- **Motion system.** Scroll reveals, magnetic buttons, a marquee and Lenis smooth scrolling, built on design tokens in `src/styles/global.css`.
- **Media discipline.** Videos are lazy (`LazyVideo`), images are WebP, fonts are self-hosted.

## Layout

```
src/
  pages/        index.astro
  layouts/      Base.astro (SEO, meta)
  sections/     Hero, HowIWork, Plans, Extras, Projects, Contact
  components/   WebglStar, ChromeStar, Star, MagneticButton, Marquee, Reveal, …
  scenes/       StarScene (React Three Fiber)
  data/         projects.ts
  hooks/ lib/   useLenis, cn, seo
```

Path alias: `@/` → `src/`.

## Scripts

```bash
npm run dev            # dev server
npm run build          # static build → dist/
npm run preview        # serve the build
npm run check          # astro check (types)
npm run lint           # eslint
npm run format         # prettier --write
```

## Deploy

Every push to `main` runs CI (`.github/workflows/ci.yml`) and a second workflow that builds the site and publishes `dist/` to a `deploy` branch, which the host pulls. Details in [DEPLOY.md](./DEPLOY.md).
