import { cn } from '@/lib/cn'

/**
 * Brand chrome star sticker (7-point). Purely decorative: positioned by the
 * caller with absolute classes, hidden from assistive tech.
 */
export function Star({ className }: { className?: string }) {
  return (
    <img
      src="/estrella-7.webp"
      alt=""
      aria-hidden
      width={320}
      height={329}
      loading="lazy"
      decoding="async"
      className={cn(
        'pointer-events-none absolute h-auto drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)] select-none',
        className,
      )}
    />
  )
}
