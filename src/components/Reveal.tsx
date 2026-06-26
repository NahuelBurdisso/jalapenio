import { cn } from '@/lib/cn'
import type { ReactNode, CSSProperties } from 'react'

/**
 * Scroll-reveal wrapper. Content is fully visible by default (no inline
 * opacity), so it renders correctly without JS. When JS is present, the
 * `.js .reveal` CSS rule hides it until `is-visible` is added on scroll.
 *
 * `className` MUST be static (constant) per call site: a dynamic className
 * would make React rewrite the attribute on re-render and strip the
 * IO-added `is-visible`, re-hiding already-revealed content.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'span'
}) {
  const Tag = as
  const style: CSSProperties | undefined = delay
    ? { transitionDelay: `${delay}s` }
    : undefined
  return (
    <Tag className={cn('reveal', className)} style={style}>
      {children}
    </Tag>
  )
}
