# Rediseño del Hero — "Cromo Líquido" (A + claim cinético B)

Fecha: 2026-06-17 · Proyecto: Jalapeño (Sofía Herrero) · Sección: `src/sections/Hero.tsx`

## Objetivo

Rediseñar el hero a un lenguaje **moderno, state-of-the-art**, fiel al concepto
Jalapeño (rojo `#9e1111` · negro · cromo · fuego). Combina dos direcciones:

- **A — Cromo Líquido 3D:** estrella de marca cromada en WebGL (R3F), reactiva al cursor.
- **B — Claim cinético:** "si no arde, no impacta" como protagonista tipográfico animado.

Aplica los principios de taste-skill (high-end-visual-design / design-taste-frontend):
easing custom, mask reveals, sin fuentes prohibidas, colapso mobile, GPU-only.

## Alcance

Solo el hero. No se tocan About / Brand / Projects / Contact. Tokens y fuentes
existentes se reutilizan. La `ChromeStar` SVG actual **se conserva** como fallback.

## Arquitectura de componentes

### 1. `src/scenes/StarScene.tsx` (nuevo) — WebGL
- React Three Fiber `<Canvas>` (`dpr={[1, 2]}` capeado, `gl={{ antialias: true }}`).
- **Geometría:** estrella de 4 puntas extruida (`THREE.Shape` cóncava → `ExtrudeGeometry`,
  bevel suave). Reutiliza el path del SVG como guía de forma.
- **Material:** `meshStandardMaterial` `metalness={1}` `roughness={0.15}`, `envMapIntensity` alto.
- **Iluminación / reflejos:** `<Environment resolution={256}>` con `<Lightformer>` (rects)
  — un key cálido/blanco, un fill rojo brasa, un rim. **Sin HDR externo → 100% offline.**
- **Movimiento:** `<Float>` (drei) + auto-rotación lenta; parallax: `useFrame` mapea
  el puntero (estado compartido) a `rotation.x/y` con lerp suave.
- **Reduced-motion:** si `matchMedia('(prefers-reduced-motion: reduce)')` → sin auto-rotación
  ni parallax (queda estática, levemente inclinada).
- Marcado `aria-hidden`. El canvas es decorativo.

### 2. `src/components/KineticClaim.tsx` (nuevo) — claim B
- Renderiza "si no arde, no impacta" en `font-display` (Anton), gigante.
- Cada línea hace **mask reveal** (slide-up desde overflow-clip) escalonado al cargar.
- Una palabra clave (**"arde"**) en `text-ember`; otra (**"impacta"**) en `stroke-text`
  (contorno hueco) para tensión tipográfica.
- Deformación sutil ligada al scroll: `motion useScroll` → leve `skewY`/`y` parallax
  (desactivado en reduced-motion). GPU-only (`transform`/`opacity`).

### 3. `src/sections/Hero.tsx` (reescrito)
- `min-h-[100dvh]`, fondo `char`, glow de brasa rojo difuso (blur grande, `pointer-events-none`).
- **Composición Z-axis / Editorial Split:**
  - Eyebrow pill: `★ Sofía Herrero · Marketing Digital`.
  - Bloque tipográfico izquierda: `<KineticClaim/>` + subline
    *Crecimiento de marcas con personalidad, estrategia y contenido que genera impacto.*
  - Estrella 3D `<StarScene/>` a la derecha/centro, superpuesta con leve overlap (Z-axis cascade).
  - Marquee inferior ("jalapeño ★ marketing") + cue de scroll.
- **Suspense + fallback:** `<Suspense fallback={<ChromeStar/>}>` envuelve `StarScene` (lazy
  con `React.lazy`). Si WebGL no está disponible o el contexto falla → queda la `ChromeStar` SVG.
- Mobile (`<768px`): la estrella va arriba más chica, tipografía full-width `w-full px-6`,
  sin overlaps/rotaciones.

## Datos / estado
- Puntero compartido hero→scene: un `useRef`/contexto liviano o prop callback; sin store global.
- Sin red, sin assets externos (Environment generado por Lightformers).

## Motion (resumen)
- Carga: eyebrow fade, claim mask-reveal escalonado, estrella scale-in (`ease-expo`).
- Idle: estrella auto-rota + flota; glow pulso sutil.
- Cursor: parallax de la estrella.
- Scroll: parallax/skew leve del claim (Lenis ya activo).
- Todo respeta `prefers-reduced-motion`.

## Accesibilidad
- Canvas y estrella `aria-hidden` (decorativos); el H1 real es el claim/título con texto.
- Contraste: ember `#e23b3b` y paper sobre `char` ya validados AA (large/bold).
- Foco visible en links; sin contenido atrapado solo en WebGL.

## Performance / guardrails
- `dpr` capeado a 2; `<Canvas frameloop>` default pero pausable; geometría simple (1 mesh).
- WebGL lazy-cargado (no bloquea LCP del texto, que es el H1).
- Solo `transform`/`opacity` en animaciones DOM; blur solo en elementos no-scrolleados.
- Meta de bundle: el hero suma three/R3F (ya instalados) vía chunk lazy; build verde.

## Criterios de éxito
1. Estrella cromada 3D visible, con reflejos (no gris plano) y reactiva al cursor.
2. Claim "si no arde, no impacta" animado como protagonista.
3. Fallback SVG si no hay WebGL; reduced-motion respetado.
4. `typecheck` + `lint` + `build` verdes; axe sin críticos; mobile colapsa bien.

## Fuera de alcance
- Otras secciones, deploy, chile/partículas (queda como mejora futura opcional).
