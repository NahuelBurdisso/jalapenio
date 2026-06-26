# jalapeno.studio — Astro SSG + Tech SEO + Vercel Migration

**Date:** 2026-06-25
**Branch:** `fix/astro-ssg-seo-vercel`
**Status:** Approved design — ready for implementation plan

## Problem

`jalapeno.studio` (Sofía Herrero — "Jalapeño", digital marketing studio) is a 100%
client-rendered Vite + React 19 SPA. `view-source` and `curl` return an empty shell
(`<div id="root">`), so the site is invisible to search engines, scrapers, and link
unfurlers (WhatsApp/Twitter/LinkedIn previews). The site also ships a heavy WebGL
stack (three.js + React Three Fiber + drei) plus gsap, lenis, and framer-motion that
must keep working.

Current deploy: `deploy.yml` builds `dist/`, pushes it to a `deploy` branch; Hostinger's
Git integration clones that branch into `public_html` (clone-only, no build). Domain is
registered at Hostinger.

## Goals (this pass)

1. Real, crawlable HTML for all text content — visible in `view-source` and `curl`
   without executing JavaScript.
2. Complete, hardcoded `<head>`: title, description, Open Graph, Twitter Card,
   canonical, `lang="es"`, favicons.
3. `<noscript>` fallback containing contact info.
4. Technical SEO: `sitemap.xml`, permissive `robots.txt`, JSON-LD structured data,
   single `<h1>` per page.
5. Performance: Lighthouse > 90 in all four categories; optimized images and fonts.
6. Accessibility: WCAG 2.1 AA — contrast, alt text, keyboard nav, form labels,
   skip-to-content.
7. Migrate hosting to Vercel with native Git auto-deploy (the "CI hook"), keeping the
   `jalapeno.studio` domain registered at Hostinger.

## Non-goals (explicit — deferred to a follow-up pass)

- Copy / content rewrite, value proposition, portfolio metrics, services + pricing
  (prompt items #7–8). These need Sofía's real data. **Existing copy is kept as-is.**
- Adding analytics JS (GA4 / Plausible / Meta Pixel). Only Search Console verification
  is wired now; a documented slot is left for analytics later (protects Lighthouse).
- Brand-identity normalization decisions (Jalapeño vs Jalapeno, separator choice) beyond
  what the hardcoded `<head>` requires.

## Current structure (reference)

```
index.html              SPA shell (already has some meta tags + Google Fonts <link>)
vite.config.ts          vite + @vitejs/plugin-react + @tailwindcss/vite, '@' alias → ./src
src/main.tsx            createRoot(...).render(<App/>)
src/App.tsx             useLenis(); <Reflectors/><Grain/><Nav/><main>{sections}</main>
src/sections/           Hero, About, Brand, Projects, Contact   (React + motion/react)
src/scenes/StarScene.tsx   R3F canvas (198 LOC)
src/components/         Nav, WebglStar, ChromeStar, Reflectors, Grain, KineticClaim,
                        Marquee, Reveal, MagneticButton
src/hooks/useLenis.ts   lenis smooth scroll
src/lib/cn.ts           clsx + tailwind-merge
src/data/projects.ts    portfolio data
.github/workflows/ci.yml      typecheck + lint + build (keep)
.github/workflows/deploy.yml  build → push dist/ to `deploy` branch (delete)
```

Total ~1.2k LOC, single page. Sections mix static copy with framer-motion entrance
animations. Pure-WebGL components: `StarScene`, `WebglStar`, `ChromeStar`, `Reflectors`.

## Architecture: Astro + React islands

Astro renders static HTML at build time (SSG). React components used as Astro islands
are **server-rendered to HTML and then hydrated** on the client — except `client:only`,
which is client-rendered only. This gives crawlable HTML plus the existing interactivity.

```
src/
  layouts/Base.astro       <html lang="es">, <head> (meta/OG/Twitter/canonical/JSON-LD),
                           skip-to-content link, <noscript> fallback, global CSS
  pages/index.astro        composes sections, owns page-specific <head> values
  sections/  (React .tsx, ported from src/sections, motion adjusted — see below)
  components/ scenes/ hooks/ lib/ data/   (ported as-is where possible)
public/robots.txt          permissive
public/favicon.*           favicon set (svg + ico + apple-touch + manifest)
public/og-image.*          1200×630 Open Graph image
astro.config.mjs           @astrojs/react, @astrojs/sitemap, @astrojs/vercel (static),
                           @tailwindcss/vite, '@' alias → ./src
vercel.json                only if redirects/headers needed
```

### Island hydration strategy

| Component(s)                                   | Directive            | Rationale |
|------------------------------------------------|----------------------|-----------|
| `StarScene`, `WebglStar`, `ChromeStar`, `Reflectors` | `client:only="react"` | three.js cannot SSR (uses WebGL/`window`). |
| Hero                                           | `client:load`        | Above the fold; hydrate immediately. |
| About, Brand, Projects, Contact                | `client:visible`     | HTML emitted at build for crawlers; hydrate on scroll into view. |
| Nav                                            | `client:load`        | Interactive (menu, magnetic button). |
| Lenis smooth scroll                            | small Astro `<script>` / tiny island | Global progressive enhancement. |

### Key correctness decision — no-JS visibility

framer-motion `initial={{ opacity: 0, y: ... }}` causes the server-rendered HTML to
carry `opacity: 0` inline styles, so content is in the DOM (crawlable text) but
**visually invisible without JS** — failing the "visible without executing JS" goal.

**Resolution:** replace entrance animations on static text/content with a CSS-based
reveal pattern that **defaults to visible**:

- Base CSS renders content fully visible (no `opacity: 0` baseline).
- A JS-present marker (e.g. inline `document.documentElement.classList.add('js')` in
  `<head>`) gates the hidden→reveal transition, so only JS users get the pre-animation
  hidden state; no-JS users and crawlers see content immediately.
- IntersectionObserver adds the reveal on scroll. Respect `prefers-reduced-motion`
  (no transform/opacity animation when set).
- framer-motion / gsap are retained **only** for continuous or interactive motion
  (e.g. WebGL, marquee, magnetic button, kinetic claim), not for first-paint reveals
  of static copy.

The existing `Reveal` component is refactored to this pattern (or replaced by a CSS
utility + a single IntersectionObserver script).

## SEO / head (goals 1–4)

- `Base.astro` `<head>`, hardcoded:
  - `<title>Jalapeño Studio — Marketing Digital</title>`
  - `<meta name="description">` — one-sentence value prop (reuse current copy).
  - Open Graph: `og:title`, `og:description`, `og:image` (1200×630, absolute URL),
    `og:url`, `og:type=website`, `og:locale=es_AR`.
  - Twitter: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`,
    `twitter:image`.
  - `<link rel="canonical" href="https://jalapeno.studio/">`.
  - `<html lang="es">`.
  - Favicons: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest`,
    `theme-color`.
  - Google Search Console verification meta tag (value supplied by Sofía/Nahuel).
- `<noscript>` block with a clear message + basic contact info (email / socials).
- `@astrojs/sitemap` → `/sitemap.xml` (set `site` in `astro.config.mjs`).
- `public/robots.txt` — permissive, references the sitemap.
- JSON-LD `ProfessionalService` (or `Organization`): name, location, services, contact,
  `url`, `sameAs` socials — injected in `Base.astro`.
- Exactly one `<h1>` on the page (Hero); demote any other `<h1>` to `<h2>`/`<h3>`.

## Performance (goal 5)

- Images: serve hero/OG and any raster assets as WebP/AVIF via `<picture>` with
  `loading="lazy"` (Astro `<Image>`/`astro:assets` where applicable).
- Fonts: replace render-blocking Google Fonts `<link>` (Anton + Public Sans) with
  self-hosted (or preloaded) `woff2` + `font-display: swap`; `<link rel="preload">` the
  primary font.
- JS: islands already defer non-critical hydration; ensure WebGL only loads client-side
  and is not render-blocking. Inline only critical CSS Astro emits.
- Target Lighthouse > 90 in Performance, Accessibility, Best Practices, SEO (mobile).

## Accessibility (goal 6 — WCAG 2.1 AA)

- Contrast ≥ 4.5:1 text, ≥ 3:1 large/UI; audit the `paper/65`, `paper/70` opacities
  against the `char` background and bump where failing.
- Alt text on all meaningful images; `aria-hidden` on decorative (ember glow, grain).
- Full keyboard navigation; visible focus styles; logical tab order.
- Labels on all contact-form fields.
- Skip-to-content link as first focusable element.
- Touch targets ≥ 44×44px; no horizontal scroll at 375px (iPhone SE) through all
  breakpoints.

## Deploy / domain / CI

### Deploy = Vercel native Git integration (the kept "CI hook")

- Connect the GitHub repo to a Vercel project (framework preset: Astro).
- `push main` → Vercel builds (`astro build`) and deploys to production.
- Pull requests → automatic Vercel preview URLs.
- `@astrojs/vercel` static adapter; `astro.config.mjs` `site: 'https://jalapeno.studio'`.

### GitHub Actions

- **Keep** `ci.yml` — but update steps for Astro: `astro check` (or `tsc`) + lint +
  `astro build`. Runs on PR/push to `main`.
- **Delete** `deploy.yml` and the `deploy` branch — they exist only for Hostinger's
  clone-only Git integration, which is being retired.

### Domain / DNS (registrar stays Hostinger)

Manual steps (provided as an exact checklist; cannot be done from the repo):

1. Vercel → Project → Settings → Domains → add `jalapeno.studio` and `www.jalapeno.studio`.
2. Hostinger DNS zone:
   - `A` `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`
   - (Remove conflicting old A/records that pointed to Hostinger hosting.)
3. Vercel auto-provisions SSL once DNS resolves.
4. Hostinger → disable / remove the Git auto-deploy integration on `public_html` so it
   no longer serves the stale `deploy` branch.
5. Verify propagation, then confirm `curl https://jalapeno.studio/` returns real HTML.

## Verification (acceptance criteria)

- [ ] `curl https://jalapeno.studio/` returns HTML with real, readable content.
- [ ] `view-source` shows all section copy without JS execution.
- [ ] Lighthouse (mobile) > 90 in Performance, Accessibility, Best Practices, SEO.
- [ ] Link preview renders correctly on WhatsApp, Twitter/X, LinkedIn.
- [ ] Google Mobile-Friendly check passes.
- [ ] `<noscript>` shows fallback content + contact info with JS disabled.
- [ ] `/sitemap.xml` and `/robots.txt` are accessible.
- [ ] JSON-LD validates (Rich Results Test).
- [ ] Exactly one `<h1>` on the page.
- [ ] WebGL hero, smooth scroll, marquee, and section animations still work with JS on.
- [ ] No horizontal scroll at 375px; touch targets ≥ 44px.
- [ ] Vercel auto-deploys on push to `main`; PRs get preview URLs.
- [ ] Google Search Console verified, no critical errors after indexing.

## Risks / notes

- **framer-motion ↔ SSG no-JS conflict** is the main technical risk; the CSS-default-
  visible reveal pattern is the mitigation and must be applied consistently.
- three.js must never run during SSG (`client:only`), or the build breaks on `window`.
- Tailwind v4 is already wired via `@tailwindcss/vite`; carry the same plugin into Astro
  to avoid a config rewrite.
- Self-hosting fonts changes asset paths — verify Anton + Public Sans weights in use.
- DNS propagation can take up to ~24–48h; keep Hostinger serving until Vercel is live to
  avoid downtime, then cut over.
