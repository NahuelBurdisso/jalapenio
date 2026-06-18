import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

/**
 * The brand claim as the hero's typographic protagonist.
 * Mask-reveal on load + scroll-driven skew. Reduced-motion safe.
 */
export function KineticClaim() {
  const ref = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const skewY = useTransform(scrollYProgress, [0, 1], [0, 3])
  const y = useTransform(scrollYProgress, [0, 1], [0, 50])

  const lines = [
    <>
      si no <span className="text-ember">arde</span>,
    </>,
    <>
      no <span className="text-paper">impacta</span>
    </>,
  ]

  return (
    <motion.h1
      ref={ref}
      style={{ skewY, y }}
      className="display text-paper text-[clamp(3.25rem,13vw,11rem)] leading-[0.82]"
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-clip pb-[0.06em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              delay: 0.1 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  )
}
