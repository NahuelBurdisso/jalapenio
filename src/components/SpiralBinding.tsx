import { cn } from '@/lib/cn'

/**
 * Notebook spiral coil running down the left edge — the recurring motif from
 * the deck. Pure SVG, repeats vertically. `tone` adapts to light/dark sections.
 */
export function SpiralBinding({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light'
  className?: string
}) {
  const ring = tone === 'dark' ? '#9a9aa0' : '#3a3a3e'
  const hi = tone === 'dark' ? '#fafafa' : '#9a9aa0'
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute top-0 left-0 z-30 h-full w-10 sm:w-14',
        className,
      )}
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 56 1000"
      >
        <defs>
          <linearGradient id={`coil-${tone}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={ring} />
            <stop offset="0.45" stopColor={hi} />
            <stop offset="0.7" stopColor={ring} />
            <stop offset="1" stopColor="#4a4a4e" />
          </linearGradient>
        </defs>
        {Array.from({ length: 22 }).map((_, i) => (
          <g key={i} transform={`translate(0 ${i * 46 + 10})`}>
            <rect
              x="14"
              y="0"
              width="40"
              height="9"
              rx="4.5"
              fill={`url(#coil-${tone})`}
            />
            <ellipse
              cx="16"
              cy="4.5"
              rx="6"
              ry="7"
              fill={`url(#coil-${tone})`}
            />
            <circle
              cx="16"
              cy="4.5"
              r="3"
              fill={tone === 'dark' ? '#0a0908' : '#f7f7f7'}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
