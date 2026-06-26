import { useLenis } from '@/hooks/useLenis'

/** Headless island: mounts Lenis smooth-scroll (reduced-motion safe via the hook). */
export function SmoothScroll() {
  useLenis()
  return null
}
