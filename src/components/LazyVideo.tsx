import { useEffect, useRef, useState } from 'react'

/**
 * Autoplay-on-visible video. No `autoplay` attribute (which forces eager
 * download even with preload="none"); instead nothing loads until the element
 * nears the viewport, then we attach the poster, load + play, and pause when
 * offscreen. The `poster` is also withheld until then — a poster attribute is
 * fetched eagerly by the browser, so binding it upfront would pull ~all the
 * below-fold poster bytes into the initial load and starve the LCP on mobile.
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
  const [activated, setActivated] = useState(false)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActivated(true)
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
      poster={activated ? poster : undefined}
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
