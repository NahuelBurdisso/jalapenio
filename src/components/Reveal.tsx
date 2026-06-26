import { cn } from '@/lib/cn'
import type { ReactNode, CSSProperties } from 'react'

/**
 * Scroll-reveal wrapper. Content is fully visible by default (no inline
 * opacity), so it renders correctly without JS. When JS is present, the
 * `.js .reveal` CSS rule hides it until `is-visible` is added on scroll.
 */
export function Reveal({
  children,
  delay = 0,
  y,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'span'
}) {
  const Tag = as
  const style: CSSProperties | undefined = delay
    ? { transitionDelay: `${delay}s` }
    : undefined
  // `y` kept for API compatibility; reveal distance is handled in CSS.
  void y
  return (
    <Tag className={cn('reveal', className)} style={style}>
      {children}
    </Tag>
  )
}
