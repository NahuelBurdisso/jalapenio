import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * The brand object: a chrome 4-point sparkle. SVG with layered metallic
 * gradients, mouse-reactive tilt + a slow idle spin. Reduced-motion safe
 * (spring just rests). WebGL/R3F upgrade path lives in src/scenes/.
 */
export function ChromeStar({
  className,
  idle = true,
}: {
  className?: string
  idle?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [22, -22]), {
    stiffness: 120,
    damping: 14,
  })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-26, 26]), {
    stiffness: 120,
    damping: 14,
  })

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('[perspective:900px]', className)}
      aria-hidden
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="h-full w-full"
      >
        <motion.div
          animate={idle && !reduceMotion ? { rotate: 360 } : undefined}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          className="h-full w-full drop-shadow-[0_22px_40px_rgba(0,0,0,0.55)]"
        >
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <defs>
              <linearGradient id="cs-body" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.32" stopColor="#cfcfd6" />
                <stop offset="0.5" stopColor="#74747c" />
                <stop offset="0.66" stopColor="#eef0f4" />
                <stop offset="0.84" stopColor="#8a8a92" />
                <stop offset="1" stopColor="#43434a" />
              </linearGradient>
              <radialGradient id="cs-core" cx="0.4" cy="0.35" r="0.75">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.55" stopColor="#c2c2c9" />
                <stop offset="1" stopColor="#5a5a61" />
              </radialGradient>
            </defs>
            {/* 4-point sparkle: concave arms meeting at center */}
            <path
              d="M100 4
                 C108 60 140 92 196 100
                 C140 108 108 140 100 196
                 C92 140 60 108 4 100
                 C60 92 92 60 100 4 Z"
              fill="url(#cs-body)"
              stroke="#2a2a2e"
              strokeWidth="1.5"
            />
            <path
              d="M100 40
                 C104 76 124 96 160 100
                 C124 104 104 124 100 160
                 C96 124 76 104 40 100
                 C76 96 96 76 100 40 Z"
              fill="url(#cs-core)"
              opacity="0.92"
            />
            <circle cx="86" cy="80" r="9" fill="#ffffff" opacity="0.85" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
