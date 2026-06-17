# Jalapeño — Design System

Brand & portfolio site for **Sofía Herrero**, founder of **Jalapeño**, a digital
marketing agency. Source of truth: her PORTFOLIO2026 deck (brand assets are
fixed, not optional — we honor them).

**Tagline:** _si no arde, no impacta._ · _Encendemos el potencial de tu marca._

## Design read

Solo marketing-strategist portfolio for prospective brand clients. Language:
**brutalist-scrapbook + Y2K-chrome + kinetic typography**. Native CSS + Tailwind v4.
Dials — VARIANCE 9 / MOTION 8 / DENSITY 4.

## Concept

A jalapeño adds intensity to a recipe; the brand adds personality, strategy and
heat to a marca. The whole site is a **spiral-bound notebook / zine** — torn paper,
masking tape, bulldog clips, halftone collage cutouts, chrome 3D objects (the
4-point sparkle + 5-point star), fire and chili. High contrast. Loud. Spicy.

## Color tokens

| Token            | Hex       | Use                                            |
| ---------------- | --------- | ---------------------------------------------- |
| `--color-ink`    | `#1e1d1c` | Brand near-black, primary dark surface         |
| `--color-char`   | `#0a0908` | Deepest background                             |
| `--color-paper`  | `#f7f7f7` | Brand off-white, light surface / text-on-dark  |
| `--color-bone`   | `#ece7dc` | Warm scrapbook paper (torn cards)              |
| `--color-chili`  | `#9e1111` | Primary brand red                              |
| `--color-ember`  | `#d62828` | Brighter red — hover / kinetic accents         |
| `--color-acid`   | `#c8f000` | Campaign accent (lime) — project chips only    |
| `--color-amber`  | `#e8a020` | Campaign accent (amber) — project chips only   |

Chrome is a **gradient**, not a color: `#e8e8ea → #9a9aa0 → #fafafa → #6e6e74`.

## Type

- **Display:** `Anton` — ultra-condensed brutal caps. Section heads, hero.
- **Body / UI:** `Public Sans` — exact deck match. Paragraphs, labels, nav.
- Labels/eyebrows: Public Sans 700, uppercase, `tracking-[0.25em]`, tiny.
- Outline-wide treatment: Public Sans 800 caps + wide tracking + text-stroke.

Banned (per high-end-visual-design): Inter, Roboto, Arial, Helvetica. Public Sans
is allowed and is the literal brand body font.

## Motion

- Easing: `--ease-out-expo` `cubic-bezier(0.16,1,0.3,1)`; springs for magnetics.
- Lenis smooth-scroll (reduced-motion aware, already wired in `useLenis`).
- Entry: heavy fade-up + slight blur via `motion` `whileInView`, staggered.
- Kinetic: marquee tape strips, mouse-parallax chrome star, magnetic buttons.
- GPU-only (`transform`/`opacity`). Grain + binding are fixed/pointer-none.

## Layout / motifs (built in code, not raster)

- **Spiral binding** — fixed SVG coil down the left edge on notebook sections.
- **Grain** — fixed `pointer-events-none` noise overlay at low opacity.
- **Chrome star** — SVG with layered metallic gradients; mouse-reactive. (R3F/WebGL
  upgrade path lives in `src/scenes/`.)
- **Torn paper / tape / clip** — CSS shapes + mask, slight rotations (Z-axis cascade).
- **Outline section numbers** 01–05 — huge `-webkit-text-stroke`, no fill.

## Information architecture (one-page)

1. **Nav** — floating pill: Inicio · Sobre mí · Marca · Proyectos · Contacto.
2. **Hero** — ESTRATEGIA DE MARKETING DIGITAL / Crecimiento de marcas; chrome star; tagline.
3. **01 · Sobre mí** — Sofía bio (Psicología → Marketing en Cervantes → Jalapeño).
4. **03 · Marca: Jalapeño** — concept + 7 services + tagline lockup.
5. **04 · Proyectos** — Amnesia (social + rebrand + campaigns), Marea (community + desfile), Meta Ads.
6. **05 · Contacto** — CTA, tel 3541-523489, IG @herreropipi.

## Accessibility

- Reduced-motion: kill marquee/scroll-jack, keep content.
- Contrast: chili `#9e1111` on paper passes AA for large/bold; body text uses ink/paper.
- All interactive = real `<a>`/`<button>`, focus-visible rings, labelled.
