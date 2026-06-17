import { motion } from 'motion/react'
import { ChromeStar } from '@/components/ChromeStar'
import { Marquee } from '@/components/Marquee'

export function Hero() {
  return (
    <section
      id="inicio"
      className="bg-char relative flex min-h-[100dvh] flex-col justify-center overflow-clip px-6 pt-28 pb-16 sm:px-10"
    >
      {/* ember glow */}
      <div
        aria-hidden
        className="bg-chili/25 pointer-events-none absolute -top-1/3 right-[-10%] h-[70vh] w-[70vh] rounded-full blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-paper/15 text-paper/70 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-[0.28em] uppercase"
        >
          <span className="text-ember">★</span> Sofía Herrero · Marketing
          Digital
        </motion.p>

        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <h1 className="display text-paper text-[15vw] sm:text-[12vw] lg:text-[8.5rem]">
              <RevealLine delay={0.05}>Estrategia de</RevealLine>
              <RevealLine delay={0.13}>
                marketing <span className="text-ember">digital</span>
              </RevealLine>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.32,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-7 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="text-paper/65 text-base sm:text-lg">
                Crecimiento de marcas con personalidad, estrategia y contenido
                que genera impacto.
              </p>
            </motion.div>
          </div>

          {/* chrome star centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-first mx-auto aspect-square w-44 sm:w-56 lg:order-none lg:w-full lg:max-w-sm"
          >
            <ChromeStar className="h-full w-full" />
          </motion.div>
        </div>
      </div>

      {/* tape tagline marquee */}
      <div className="relative mt-12">
        <div className="border-paper/10 bg-ink/60 -rotate-1 border-y py-3">
          <Marquee
            text="si no arde, no impacta"
            className="font-display text-paper/90 text-2xl tracking-wide uppercase sm:text-3xl"
          />
        </div>
      </div>
    </section>
  )
}

function RevealLine({
  children,
  delay,
}: {
  children: React.ReactNode
  delay: number
}) {
  return (
    <span className="block overflow-clip">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  )
}
