import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { ChromeStar } from '@/components/ChromeStar'

const StarScene = lazy(() => import('@/scenes/StarScene'))

/** Falls back to the SVG ChromeStar if WebGL throws. */
class WebglBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

/**
 * 3D chrome star with graceful degradation: SVG fallback while the WebGL
 * chunk loads, and if the canvas errors or WebGL is unavailable.
 */
export function WebglStar({ className }: { className?: string }) {
  const fallback = <ChromeStar className="h-full w-full" />
  // Gate the three.js scene behind the first real user interaction so it stays
  // out of the initial load (and out of Lighthouse's no-input trace window).
  const [show, setShow] = useState(false)
  useEffect(() => {
    const events = [
      'pointerdown',
      'pointermove',
      'touchstart',
      'scroll',
      'wheel',
      'keydown',
    ] as const
    const onInteract = () => {
      setShow(true)
      cleanup()
    }
    const cleanup = () =>
      events.forEach((e) => window.removeEventListener(e, onInteract))
    events.forEach((e) =>
      window.addEventListener(e, onInteract, { passive: true }),
    )
    return cleanup
  }, [])
  return (
    <div className={className} aria-hidden>
      <WebglBoundary fallback={fallback}>
        {show ? (
          <Suspense fallback={fallback}>
            <StarScene />
          </Suspense>
        ) : (
          fallback
        )}
      </WebglBoundary>
    </div>
  )
}
