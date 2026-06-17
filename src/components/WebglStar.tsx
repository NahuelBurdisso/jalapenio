import { Component, lazy, Suspense, type ReactNode } from 'react'
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
  return (
    <div className={className} aria-hidden>
      <WebglBoundary fallback={fallback}>
        <Suspense fallback={fallback}>
          <StarScene />
        </Suspense>
      </WebglBoundary>
    </div>
  )
}
