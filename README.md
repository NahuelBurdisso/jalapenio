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

## Deploy (Hostinger)

CI runs on every push/PR to `main` (`.github/workflows/ci.yml`: typecheck →
lint → build). On push to `main`, `deploy.yml` builds and uploads `dist/` to
Hostinger over FTP.

**One-time setup** — in GitHub → Settings → Secrets and variables → Actions:

| Secret         | Where to get it                                        |
| -------------- | ------------------------------------------------------ |
| `FTP_SERVER`   | hPanel → Files → FTP Accounts → *Hostname* (e.g. `ftp.tudominio.com`) |
| `FTP_USERNAME` | the FTP account username                               |
| `FTP_PASSWORD` | the FTP account password                               |

Optional repo **variable** `FTP_DIR` (default `public_html/`) — set a subfolder
for staging.

`public/.htaccess` ships in the build and handles SPA routing (rewrite to
`index.html`), security headers (CSP) and asset caching on Hostinger's Apache.

> Prefer Hostinger's native Git integration instead? hPanel → Git → connect this
> repo on `main`, build command `npm ci && npm run build`, public directory `dist`.

