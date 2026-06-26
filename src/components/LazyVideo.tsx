import { useEffect, useRef } from 'react'

/**
 * Autoplay-on-visible video. No `autoplay` attribute (which forces eager
 * download even with preload="none"); instead the poster shows until the
 * element nears the viewport, then we load + play, and pause when offscreen.
 * Keeps heavy video bytes out of the initial page load.
 */
export function LazyVideo({
  src,
  poster,
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: {
  src: string
  poster?: string
  className?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            v.preload = 'auto'
            void v.play().catch(() => {})
          } else {
            v.pause()
          }
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="none"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      className={className}
    />
  )
}
