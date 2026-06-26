# jalapeno.studio Astro SSG + Tech SEO + Vercel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the client-rendered Vite/React SPA at jalapeno.studio into a statically-rendered Astro site with crawlable HTML, complete SEO `<head>`, WCAG AA accessibility, and Vercel native Git deploy — without losing the WebGL/motion experience.

**Architecture:** Astro renders all text content to static HTML at build (SSG). Existing React components are reused as Astro islands: pure-WebGL components are `client:only="react"`; section components are `client:load`/`client:visible` so Astro emits their HTML for crawlers and hydrates them for motion. Entrance animations on static copy are refactored to a CSS-default-visible reveal so content is visible without JS. Vercel auto-detects the static Astro build and deploys on push to `main`.

**Tech Stack:** Astro 5, @astrojs/react, @astrojs/sitemap, Tailwind v4 (`@tailwindcss/vite`), React 19, three.js / @react-three/fiber / drei, gsap, lenis, motion (framer-motion).

**Testing note:** This is a static-site migration with no existing test runner. "Tests" here are deterministic verification commands against the build output — `astro build`, `astro check`, and `grep`/`curl` assertions on the emitted HTML — plus a final Lighthouse run. Each task ends with a verification step and a commit.

**Spec:** `docs/superpowers/specs/2026-06-25-astro-ssg-seo-vercel-design.md`

---

## File Structure

```
astro.config.mjs              NEW  — integrations, site URL, vite plugins, '@' alias
tsconfig.json                 MOD  — extend astro/tsconfigs/strict, keep '@/*' path
package.json                  MOD  — astro scripts + deps; remove vite preview/build SPA scripts
vite.config.ts                DEL  — Astro owns Vite now
index.html                    DEL  — replaced by Astro pages/layout
src/main.tsx                  DEL  — no SPA bootstrap
src/App.tsx                   DEL  — composition moves to index.astro
src/layouts/Base.astro        NEW  — <html>, <head> (meta/OG/JSON-LD), skip-link, <noscript>
src/pages/index.astro         NEW  — composes sections as islands
src/styles/global.css         NEW  — moved from src/index.css, + reveal utilities
src/lib/seo.ts                NEW  — single source for site metadata + JSON-LD object
src/components/Reveal.tsx      MOD  — CSS-default-visible reveal (no opacity:0 baseline)
src/components/RevealScript.astro NEW — IntersectionObserver + `js` class gate
src/sections/*.tsx             MOD  — remove framer entrance opacity:0 on static copy
src/hooks/useLenis.ts          MOD  — exported as island/script entry (see Task 7)
public/robots.txt             NEW
public/og-image.png           NEW  — 1200×630 (asset supplied; placeholder generated if absent)
public/favicon.svg / .ico / apple-touch-icon.png / site.webmanifest  NEW/MOD
.github/workflows/ci.yml      MOD  — astro check + lint + build
.github/workflows/deploy.yml  DEL
DEPLOY.md                     NEW  — Vercel + Hostinger DNS manual checklist
```

---

## Task 1: Install Astro and configure the project shell

**Files:**
- Create: `astro.config.mjs`
- Modify: `package.json`, `tsconfig.json`
- Delete: `vite.config.ts`

- [ ] **Step 1: Install Astro and integrations**

```bash
cd ~/Desktop/Projects/personal/jalapenio
npm install astro@^5 @astrojs/react@^4 @astrojs/sitemap@^3
```

(React, three, gsap, lenis, motion, tailwind deps already present — keep them.)

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config'
import { fileURLToPath, URL } from 'node:url'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Pure static output (default). Vercel auto-detects Astro and serves dist/.
// No adapter needed unless we later add SSR/ISR/analytics.
export default defineConfig({
  site: 'https://jalapeno.studio',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
```

- [ ] **Step 3: Update `package.json` scripts**

Replace the `scripts` block with:

```json
"scripts": {
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "check": "astro check",
  "lint": "eslint .",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
},
```

Add `@astrojs/check` and `typescript` are present; install the checker:

```bash
npm install -D @astrojs/check
```

- [ ] **Step 4: Update `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

Delete `tsconfig.app.json` and `tsconfig.node.json` (no longer referenced).

- [ ] **Step 5: Delete the Vite SPA config**

```bash
git rm vite.config.ts
```

- [ ] **Step 6: Verify Astro recognizes the project**

Run: `npx astro check`
Expected: runs without "no Astro config" error. Type errors about missing `pages/` are expected until Task 3 — that's fine; the goal is that Astro + TS resolve.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "build: install Astro and configure static build with react+sitemap+tailwind"
```

---

## Task 2: Create the Base layout with full SEO head

**Files:**
- Create: `src/lib/seo.ts`, `src/layouts/Base.astro`, `src/styles/global.css`
- Modify: move content of `src/index.css` → `src/styles/global.css`

- [ ] **Step 1: Create `src/lib/seo.ts` (single source of metadata)**

```ts
export const SITE = {
  url: 'https://jalapeno.studio',
  name: 'Jalapeño Studio',
  title: 'Jalapeño Studio — Marketing Digital',
  description:
    'Estrategia de marketing digital, branding y campañas para encender el potencial de tu marca. Por Sofía Herrero.',
  locale: 'es_AR',
  lang: 'es',
  ogImage: '/og-image.png',
  themeColor: '#1e1d1c',
  // Contact / socials — confirm real values with Sofía before launch.
  email: 'hola@jalapeno.studio',
  sameAs: [] as string[], // e.g. ['https://instagram.com/...']
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  image: SITE.url + SITE.ogImage,
  email: SITE.email,
  founder: { '@type': 'Person', name: 'Sofía Herrero' },
  areaServed: 'AR',
  sameAs: SITE.sameAs,
}
```

- [ ] **Step 2: Move global CSS**

```bash
git mv src/index.css src/styles/global.css
```

Append reveal utilities to `src/styles/global.css`:

```css
/* Reveal: visible by default (no-JS / crawlers see content).
   Only when JS is present does content start hidden, then animate in. */
.js .reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.js .reveal.is-visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .js .reveal,
  .js .reveal.is-visible {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 3: Create `src/layouts/Base.astro`**

```astro
---
import '@/styles/global.css'
import { SITE, jsonLd } from '@/lib/seo'

interface Props {
  title?: string
  description?: string
  canonical?: string
}
const {
  title = SITE.title,
  description = SITE.description,
  canonical = SITE.url + '/',
} = Astro.props
const ogImage = SITE.url + SITE.ogImage
---

<!doctype html>
<html lang={SITE.lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content={SITE.themeColor} />
    <!-- Mark JS as present so reveal animations can start hidden -->
    <script is:inline>
      document.documentElement.classList.add('js')
    </script>

    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={canonical} />
    <meta property="og:locale" content={SITE.locale} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Google Search Console verification (paste token before launch) -->
    <!-- <meta name="google-site-verification" content="REPLACE_ME" /> -->

    <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} is:inline />
  </head>
  <body>
    <a href="#inicio" class="skip-link">Saltar al contenido</a>
    <slot />
    <noscript>
      <div class="noscript-fallback">
        <p>
          Jalapeño Studio — Marketing Digital por Sofía Herrero. Este sitio usa
          animaciones que requieren JavaScript, pero podés contactarnos directamente:
        </p>
        <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      </div>
    </noscript>
  </body>
</html>
```

- [ ] **Step 4: Add skip-link + noscript styles to `src/styles/global.css`**

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  background: #1e1d1c;
  color: #f5f0e6;
  padding: 0.75rem 1rem;
}
.skip-link:focus {
  left: 0;
}
.noscript-fallback {
  padding: 2rem;
  color: #f5f0e6;
  background: #1e1d1c;
  text-align: center;
}
```

- [ ] **Step 5: Verify it builds (with a temporary stub page)**

Create a throwaway `src/pages/index.astro`:

```astro
---
import Base from '@/layouts/Base.astro'
---
<Base><h1 id="inicio">stub</h1></Base>
```

Run: `npm run build`
Expected: build succeeds; `dist/index.html` exists.

Run: `grep -c 'application/ld+json\|og:image\|rel="canonical"' dist/index.html`
Expected: ≥ 3 (head tags present in static HTML).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Base layout with full SEO head, JSON-LD, noscript, skip-link"
```

---

## Task 3: Port React sections and compose the page as islands

**Files:**
- Modify: `src/pages/index.astro` (replace stub), section/component imports unchanged
- Delete: `src/App.tsx`, `src/main.tsx`, `index.html`

- [ ] **Step 1: Delete SPA entry files**

```bash
git rm src/App.tsx src/main.tsx index.html
```

- [ ] **Step 2: Replace `src/pages/index.astro` with the real composition**

Hydration directives per the spec: WebGL = `client:only="react"`, Hero/Nav = `client:load`, below-fold sections = `client:visible`.

```astro
---
import Base from '@/layouts/Base.astro'
import { Reflectors } from '@/components/Reflectors'
import { Grain } from '@/components/Grain'
import { Nav } from '@/components/Nav'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Brand } from '@/sections/Brand'
import { Projects } from '@/sections/Projects'
import { Contact } from '@/sections/Contact'
import RevealScript from '@/components/RevealScript.astro'
---

<Base>
  <Reflectors client:only="react" />
  <Grain client:only="react" />
  <Nav client:load />
  <main>
    <Hero client:load />
    <About client:visible />
    <Brand client:visible />
    <Projects client:visible />
    <Contact client:visible />
  </main>
  <RevealScript />
</Base>
```

- [ ] **Step 3: Confirm WebGL components are isolated**

Verify `StarScene`, `WebglStar`, `ChromeStar`, `Reflectors` are only ever imported by components rendered with `client:only="react"`. (Hero imports `WebglStar` — Hero is `client:load`, so `WebglStar` would SSR and crash on `window`.) Fix: inside `Hero.tsx`, lazy-load the WebGL subtree so it is client-only.

In `src/sections/Hero.tsx`, replace the direct `WebglStar` usage with a client-gated mount:

```tsx
import { useEffect, useState } from 'react'
// ...
function ClientStar() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div aria-hidden className="webgl-placeholder" />
  return <WebglStar />
}
```

Use `<ClientStar />` where `<WebglStar />` was. This guarantees three.js never executes during SSG even though Hero hydrates with `client:load`.

- [ ] **Step 4: Build and assert real content is in the HTML**

Run: `npm run build`
Expected: build succeeds with no `window is not defined` / `document is not defined` errors.

Run: `grep -o 'Sofía Herrero' dist/index.html | head -1`
Expected: prints `Sofía Herrero` (Hero copy is server-rendered).

Run: `grep -c 'id="inicio"\|id="contacto"\|id="proyectos"' dist/index.html`
Expected: ≥ 2 (section markup present without JS).

- [ ] **Step 5: Smoke-test the dev server interactivity**

Run: `npm run dev` and load `http://localhost:4321` — confirm WebGL star renders, smooth scroll works, section animations fire. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: render page via Astro islands; isolate WebGL as client-only"
```

---

## Task 4: No-JS reveal refactor (visible-by-default content)

**Files:**
- Create: `src/components/RevealScript.astro`
- Modify: `src/components/Reveal.tsx`, `src/sections/Hero.tsx`, `src/sections/About.tsx`, `src/sections/Brand.tsx`, `src/sections/Projects.tsx`, `src/sections/Contact.tsx`

- [ ] **Step 1: Create `src/components/RevealScript.astro`**

```astro
<script is:inline>
  const els = document.querySelectorAll('.reveal')
  if ('IntersectionObserver' in window && els.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
  } else {
    els.forEach((el) => el.classList.add('is-visible'))
  }
</script>
```

- [ ] **Step 2: Refactor `src/components/Reveal.tsx` to the CSS pattern**

Replace any framer-motion `initial={{opacity:0}}` wrapper with a plain element that carries the `reveal` class (visible by default; hidden only under `.js`):

```tsx
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('reveal', className)}>{children}</div>
}
```

- [ ] **Step 3: Remove `initial`/`animate` opacity entrances from static copy**

In each section, replace `motion.*` elements that only do entrance fades on **text/headings** with the `reveal` class (or wrap in `<Reveal>`). Example for `Hero.tsx`:

```tsx
// before:
// <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} ...>
// after:
<p className="reveal border-paper/15 text-paper/70 mb-7 ...">
  <span className="text-ember">★</span> Sofía Herrero · Marketing Digital
</p>
```

Keep `motion`/gsap ONLY for continuous/interactive motion (WebGL, `Marquee`, `MagneticButton`, `KineticClaim`). Do not gate those behind `reveal`.

- [ ] **Step 4: Build and verify content is visible without JS**

Run: `npm run build`
Expected: success.

Run: `grep -o 'opacity:0\|opacity: 0' dist/index.html | head`
Expected: NO matches in static markup for section copy (inline opacity:0 entrances are gone; the only hidden state now comes from the `.js .reveal` CSS rule which requires JS).

Run: `grep -c 'class="reveal\| reveal"' dist/index.html`
Expected: ≥ 1 (reveal markup present, defaults visible).

- [ ] **Step 5: Manual no-JS check**

Run: `npm run preview`, open the site with JS disabled in devtools — confirm all section text is visible (not blank). Re-enable JS — confirm animations fire.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: CSS-default-visible reveal; remove JS-dependent entrance fades on copy"
```

---

## Task 5: SEO technical assets (robots, sitemap, single h1)

**Files:**
- Create: `public/robots.txt`
- Modify: `astro.config.mjs` (sitemap already added in Task 1 — verify), section files for heading hierarchy

- [ ] **Step 1: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://jalapeno.studio/sitemap-index.xml
```

- [ ] **Step 2: Enforce a single `<h1>`**

Run: `grep -ro '<h1' src/sections | wc -l` (source check) and after build:
`grep -c '<h1' dist/index.html`

If > 1, demote extra `<h1>` to `<h2>`/`<h3>` in the offending section(s) so exactly one remains (the Hero headline).

Expected after fix: `grep -c '<h1' dist/index.html` → `1`.

- [ ] **Step 3: Build and verify sitemap + robots**

Run: `npm run build`
Run: `ls dist/sitemap*.xml && cat dist/robots.txt`
Expected: `dist/sitemap-index.xml` (and `sitemap-0.xml`) exist; robots.txt prints with the Sitemap line.

- [ ] **Step 4: Validate JSON-LD shape**

Run: `node -e "const h=require('fs').readFileSync('dist/index.html','utf8'); const m=h.match(/<script type=\"application\/ld\+json\"[^>]*>(.*?)<\/script>/s); JSON.parse(m[1]); console.log('JSON-LD OK')"`
Expected: prints `JSON-LD OK` (valid JSON).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: robots.txt, sitemap, single-h1 heading hierarchy, JSON-LD validated"
```

---

## Task 6: Fonts and images performance

**Files:**
- Modify: `src/layouts/Base.astro`, `src/styles/global.css`
- Create: `public/fonts/*.woff2` (downloaded), `public/og-image.png`

- [ ] **Step 1: Self-host fonts**

Download `Anton` (display) and `Public Sans` (used weights: 400/500/700/800/900 + 400 italic) as `woff2` into `public/fonts/`. Add `@font-face` to `src/styles/global.css` with `font-display: swap`:

```css
@font-face {
  font-family: 'Anton';
  src: url('/fonts/anton-400.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
/* repeat per Public Sans weight actually used */
```

- [ ] **Step 2: Preload the primary font and drop render-blocking Google Fonts**

Confirm the Google Fonts `<link>` is gone (it lived in the deleted `index.html`; ensure it was not re-added to `Base.astro`). Add to `Base.astro` `<head>`:

```astro
<link rel="preload" href="/fonts/anton-400.woff2" as="font" type="font/woff2" crossorigin />
```

- [ ] **Step 3: Provide a 1200×630 OG image**

Place `public/og-image.png` (1200×630). If a final asset is not yet available, generate a branded placeholder (chili/char palette + "Jalapeño Studio") so previews are not broken — note in DEPLOY.md that Sofía should replace it.

- [ ] **Step 4: Optimize any raster images with `<picture>` + lazy**

For any `<img>` in sections, use Astro `astro:assets` `<Image>` (emits WebP/AVIF) or hand-written `<picture>` with `loading="lazy"` and explicit `width`/`height` to avoid CLS. (If the site has no raster content images beyond WebGL/SVG, record that and skip.)

- [ ] **Step 5: Build and verify no external font requests**

Run: `npm run build`
Run: `grep -c 'fonts.googleapis.com\|fonts.gstatic.com' dist/index.html`
Expected: `0`.
Run: `grep -c 'rel="preload".*font' dist/index.html`
Expected: ≥ 1.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "perf: self-host + preload fonts, font-display swap, OG image, image optimization"
```

---

## Task 7: Accessibility pass (WCAG 2.1 AA)

**Files:**
- Modify: section/component files as needed, `src/styles/global.css`, `src/hooks/useLenis.ts`

- [ ] **Step 1: Contrast audit**

Check `text-paper/65` and `text-paper/70` on the `bg-char` background. For any pair below 4.5:1 (normal text) or 3:1 (large/UI), raise the opacity (e.g. `/65` → `/80`) or color. Record the before/after ratios.

- [ ] **Step 2: Images and decoration**

Add `alt` to every meaningful image. Confirm decorative elements (ember glow, grain, reflectors) have `aria-hidden="true"`.

- [ ] **Step 3: Forms and keyboard**

Add `<label>` (or `aria-label`) to every field in `Contact.tsx`. Ensure all interactive elements are reachable by Tab with a visible focus style:

```css
:focus-visible {
  outline: 2px solid #f5f0e6;
  outline-offset: 2px;
}
```

- [ ] **Step 4: Skip link target + touch targets**

Confirm the Hero section has `id="inicio"` matching the skip link. Ensure tappable controls (nav links, buttons, magnetic button) are ≥ 44×44px (add min-height/padding where needed).

- [ ] **Step 5: Lenis as progressive enhancement**

Ensure `useLenis` only runs client-side inside a hydrated island (Nav/Hero already are) and is disabled when `prefers-reduced-motion: reduce`:

```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) return
```

- [ ] **Step 6: 375px viewport check**

Run: `npm run preview`, set devtools to 375px (iPhone SE). Confirm no horizontal scroll at any breakpoint and content is readable. Fix overflow with `overflow-x` containment / responsive padding where needed.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "a11y: contrast, alt text, form labels, focus styles, skip link, 44px targets, reduced-motion"
```

---

## Task 8: CI and deploy workflows

**Files:**
- Modify: `.github/workflows/ci.yml`
- Delete: `.github/workflows/deploy.yml`, the remote `deploy` branch

- [ ] **Step 1: Update `ci.yml` for Astro**

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Astro check
        run: npm run check
      - name: Lint
        run: npm run lint
      - name: Build
        run: npm run build
```

- [ ] **Step 2: Delete the Hostinger deploy workflow**

```bash
git rm .github/workflows/deploy.yml
```

- [ ] **Step 3: Verify CI steps pass locally (CI parity)**

Run: `npm ci && npm run check && npm run lint && npm run build`
Expected: all four succeed.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "ci: run astro check+lint+build; remove Hostinger deploy-branch workflow"
```

- [ ] **Step 5: Delete the remote `deploy` branch (after Vercel is live — see Task 9)**

```bash
# Run only once Vercel serves production, to avoid downtime:
git push origin --delete deploy
```

(Left as the last cutover action; noted again in DEPLOY.md.)

---

## Task 9: Vercel + Hostinger DNS cutover (manual checklist)

**Files:**
- Create: `DEPLOY.md`

- [ ] **Step 1: Write `DEPLOY.md` with the exact manual steps**

```markdown
# Deploy & DNS — jalapeno.studio

Hosting: Vercel (native Git deploy). Registrar/DNS: Hostinger (unchanged).

## Vercel (one-time)
1. vercel.com → Add New → Project → import GitHub repo `NahuelBurdisso/jalapenio`.
2. Framework preset: **Astro** (auto-detected). Build: `astro build`. Output: `dist`.
3. Deploy. Confirm the `*.vercel.app` URL serves the site.
4. Project → Settings → Domains → add `jalapeno.studio` and `www.jalapeno.studio`
   (set www → redirect to apex, or vice-versa).

## Hostinger DNS (one-time)
In hPanel → Domains → jalapeno.studio → DNS / Nameservers → DNS records:
1. Remove old A records pointing to Hostinger hosting.
2. Add:  A    @     76.76.21.21
3. Add:  CNAME www  cname.vercel-dns.com
4. Save. Wait for propagation (up to ~24–48h; usually minutes).
5. Vercel auto-issues SSL once DNS resolves.

## Retire Hostinger hosting
6. hPanel → disable/remove the Git auto-deploy integration on public_html
   (so it stops serving the old `deploy` branch).
7. After Vercel serves production: `git push origin --delete deploy`.

## Auto-deploy (the kept "CI hook")
- push to `main` → Vercel builds + deploys to production.
- open a PR → Vercel posts a preview URL.

## Verify live
- curl https://jalapeno.studio/ | grep "Sofía Herrero"   # real HTML
- Lighthouse mobile > 90 ×4
- Paste link in WhatsApp/Twitter/LinkedIn → preview renders
- https://jalapeno.studio/sitemap-index.xml and /robots.txt reachable
- Google Search Console: add property, paste verification token into Base.astro, redeploy, verify.

## Post-launch
- Replace public/og-image.png with final asset if placeholder was used.
- Confirm SITE.email / SITE.sameAs in src/lib/seo.ts are correct.
```

- [ ] **Step 2: Commit**

```bash
git add DEPLOY.md
git commit -m "docs: Vercel + Hostinger DNS cutover checklist"
```

---

## Task 10: Final verification and PR

- [ ] **Step 1: Full local verification**

Run each and confirm:
- `npm run build` → success
- `curl -s http://localhost:4321 | grep "Sofía Herrero"` (after `npm run preview`) → match
- `grep -c '<h1' dist/index.html` → `1`
- `grep -c 'fonts.googleapis.com' dist/index.html` → `0`
- `ls dist/sitemap*.xml dist/robots.txt` → all present

- [ ] **Step 2: Lighthouse (mobile) on the preview build**

Run: `npm run preview`, then run Lighthouse (Chrome devtools or `npx @lhci/cli autorun` if available) against `http://localhost:4321`.
Expected: > 90 in Performance, Accessibility, Best Practices, SEO. Record scores; fix regressions before opening the PR.

- [ ] **Step 3: Push branch and open PR**

```bash
git push -u origin fix/astro-ssg-seo-vercel
gh pr create --title "Astro SSG migration: tech SEO + a11y + Vercel deploy" \
  --body "Implements docs/superpowers/specs/2026-06-25-astro-ssg-seo-vercel-design.md. See DEPLOY.md for the Vercel/DNS cutover. Copy/content rewrite and analytics are deferred to a follow-up."
```

- [ ] **Step 4: Cutover**

Follow `DEPLOY.md` (Vercel import → DNS → SSL → retire Hostinger → delete `deploy` branch) and run the live verification checklist.

---

## Self-review notes

- **Spec coverage:** Goals 1–4 → Tasks 2,3,4,5. Goal 5 (perf) → Task 6. Goal 6 (a11y) → Task 7. Goal 7 (Vercel/CI/domain) → Tasks 8,9. Non-goals (copy, analytics) explicitly deferred and noted in DEPLOY.md.
- **No-JS visibility risk** addressed in Task 4 with a deterministic `grep` for residual `opacity:0` plus a manual JS-disabled check.
- **three.js SSG crash risk** addressed in Task 3 Step 3 (client-gated `ClientStar` inside the `client:load` Hero).
- **Adapter:** none — pure static; Vercel auto-detects Astro. Adapter only needed if SSR/analytics added later (noted).
