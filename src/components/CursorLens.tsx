import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

const isFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

/**
 * Chrome arrow cursor. A glossy metallic pointer that tracks the mouse,
 * matching the brand's chrome language (estrella, text-chrome). The native
 * cursor is hidden via `body.has-lens` so this reads as the cursor; the SVG
 * tip is the hotspot and sits on the real pointer coordinate.
 *
 * Desktop only (fine pointer). Disabled on touch. Keyboard nav untouched.
 */
export function CursorLens() {
  const reduce = useReducedMotion()
  const active = isFinePointer()

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const press = useMotionValue(1)

  const cfg = { stiffness: 1200, damping: 60, mass: 0.25 }
  const sx = useSpring(x, cfg)
  const sy = useSpring(y, cfg)
  const sPress = useSpring(press, { stiffness: 400, damping: 22 })

  useEffect(() => {
    if (!active) return

    document.body.classList.add('has-lens')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const down = () => press.set(0.82)
    const up = () => press.set(1)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('pointerup', up, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.body.classList.remove('has-lens')
    }
  }, [active, x, y, press])

  if (!active) return null

  return (
    <motion.div
      aria-hidden
      className="cursor-arrow"
      style={{ x: reduce ? x : sx, y: reduce ? y : sy, scale: sPress }}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id="chrome-cursor" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0%" stopColor="#fafafa" />
            <stop offset="28%" stopColor="#b8b8be" />
            <stop offset="50%" stopColor="#6c6c72" />
            <stop offset="64%" stopColor="#ededf2" />
            <stop offset="84%" stopColor="#8a8a90" />
            <stop offset="100%" stopColor="#d8d8dc" />
          </linearGradient>
        </defs>
        <g transform="rotate(-12 8 8)">
          <path
            d="M4 2.5 L4 21 L9.2 16 L12.8 24 L16 22.6 L12.3 15 L19 15 Z"
            fill="url(#chrome-cursor)"
            stroke="#5a5a60"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
          {/* gloss highlight along the leading edge */}
          <path
            d="M5 4.5 L5 13 L8.5 10"
            stroke="#ffffff"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>
      </svg>
    </motion.div>
  )
}
