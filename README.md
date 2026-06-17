# Jalapeño

> Package/dir slug is `jalapenio` (ASCII) to avoid `ñ` breaking npm names,
> paths, and URLs. The brand/display name is **Jalapeño**.

Personal marketing portfolio — a creative, motion-led, WebGL-capable site.

Built via the `/frontend-team` workflow. This commit is the **scaffold only** —
tooling, design tokens, smooth-scroll and 3D stack are wired; pages come next.

## Stack

| Layer      | Tool                                                            |
| ---------- | -------------------------------------------------------------- |
| Build      | Vite 8 + React 19 + TypeScript 6                               |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`), tokens in `src/index.css` |
| Motion     | `motion` (Framer) · GSAP · Lenis smooth-scroll                  |
| 3D / WebGL | `three` · `@react-three/fiber` · `@react-three/drei`           |
| Utilities  | `cn()` (clsx + tailwind-merge)                                 |
| Quality    | ESLint · Prettier (+ tailwind plugin)                          |

## Scripts

```bash
npm run dev          # dev server
npm run build        # typecheck + production build
npm run preview      # serve production build
npm run lint         # eslint
npm run typecheck    # tsc, no emit
npm run format       # prettier --write
```

## Layout

```
src/
  components/   reusable UI
  sections/     page sections (hero, work, about, contact…)
  scenes/       R3F / WebGL scenes
  hooks/        useLenis, …
  lib/          cn, helpers
public/fonts/   self-hosted fonts
```

Path alias: `@/` → `src/`.

## Deploy (Hostinger — Git nativo, igual que erp-vertix)

CI runs on every push/PR to `main` (`.github/workflows/ci.yml`: typecheck →
lint → build).

Deploy uses Hostinger's built-in Git integration:

1. **hPanel → Sitio web → Avanzado → GIT → Crear nuevo repositorio**
   - Repository: `https://github.com/NahuelBurdisso/jalapenio.git`
   - Branch: `main`
2. **Build command:** `npm ci && npm run build`
3. **Public / output directory:** `dist`
4. Habilitá **Auto-deployment** para que despliegue en cada push a `main`
   (Hostinger expone un webhook; opcionalmente conectalo en GitHub → Settings →
   Webhooks).

`public/.htaccess` viaja dentro de `dist/` y resuelve el ruteo SPA (rewrite a
`index.html`), headers de seguridad (CSP) y cache de assets en el Apache de
Hostinger.

