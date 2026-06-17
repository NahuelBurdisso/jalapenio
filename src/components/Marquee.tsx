import { cn } from '@/lib/cn'

/** Infinite kinetic ticker (tape strip). Content is duplicated for seamless loop. */
export function Marquee({
  text,
  reverse,
  className,
}: {
  text: string
  reverse?: boolean
  className?: string
}) {
  const items = Array.from({ length: 6 })
  return (
    <div className={cn('marquee', className)} aria-hidden>
      <div className={cn('marquee-content', reverse && 'reverse')}>
        {items.map((_, i) => (
          <span key={i} className="flex items-center">
            <span>{text}</span>
            <span className="text-chili px-6">·</span>
          </span>
        ))}
        {items.map((_, i) => (
          <span key={`b${i}`} className="flex items-center">
            <span>{text}</span>
            <span className="text-chili px-6">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
