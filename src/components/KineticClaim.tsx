import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/**
 * The brand claim as the hero's typographic protagonist.
 * Mask-reveal on load + subtle scroll-driven skew. Reduced-motion safe.
 */
export function KineticClaim() {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const skewY = useTransform(scrollYProgress, [0, 1], [0, 4])
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])

  const lines = [
    <>
      si no <span className="text-ember">arde</span>,
    </>,
    <>
      no <span className="stroke-text text-paper">impacta</span>
    </>,
  ]

  return (
    <motion.h1
      ref={ref}
      style={{ skewY, y }}
      className="display text-paper text-[16vw] leading-[0.82] sm:text-[12vw] lg:text-[9.5rem]"
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-clip">
          <span
            className="claim-line block"
            style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </motion.h1>
  )
}
