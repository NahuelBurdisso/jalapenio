import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { track } from '@vercel/analytics'
import { cn } from '@/lib/cn'

/**
 * Magnetic CTA pill with a nested "button-in-button" trailing icon.
 * Cursor pulls the button; icon translates on hover; presses on click.
 * Clicks fire a `cta_click` Vercel Analytics event (label = `event` prop,
 * else the button's text, else the href).
 */
export function MagneticButton({
  href,
  children,
  variant = 'solid',
  className,
  event,
}: {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
  event?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 })
  const sy = useSpring(y, { stiffness: 220, damping: 16 })

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }
  function onClick() {
    const label = event ?? (typeof children === 'string' ? children : href)
    track('cta_click', { label, href })
  }

  const solid = variant === 'solid'
  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group inline-flex min-h-[44px] items-center gap-3 rounded-full px-6 py-3 text-sm font-bold tracking-wide uppercase transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        solid
          ? 'bg-chili text-paper hover:bg-ember'
          : 'text-ink ring-ink/25 hover:bg-ink hover:text-paper bg-transparent ring-1',
        className,
      )}
    >
      {children}
      <span
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-[2px]',
          solid ? 'bg-paper/15' : 'bg-ink/10 group-hover:bg-paper/15',
        )}
      >
        ↗
      </span>
    </motion.a>
  )
}
