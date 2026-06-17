import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Mount Lenis smooth-scroll, RAF-driven. Disabled under reduced-motion.
 * Wire into the app root once sections exist (Phase 2).
 */
export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
