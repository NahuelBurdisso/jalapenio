import { motion } from 'motion/react'
import { WebglStar } from '@/components/WebglStar'
import { KineticClaim } from '@/components/KineticClaim'
import { Marquee } from '@/components/Marquee'

export function Hero() {
  return (
    <section
      id="inicio"
      className="bg-char relative flex min-h-[100dvh] flex-col justify-center overflow-clip px-6 pt-28 pb-10 sm:px-10"
    >
      {/* ember glow */}
      <div
        aria-hidden
        className="bg-chili/30 pointer-events-none absolute top-[-20%] right-[-5%] h-[75vh] w-[75vh] rounded-full blur-[130px]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* type block */}
        <div className="relative z-10 order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border-paper/15 text-paper/70 mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-[0.28em] uppercase"
          >
            Sofía Herrero · Marketing Digital
          </motion.p>

          <KineticClaim />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-paper/65 mt-8 max-w-md text-base sm:text-lg"
          >
            Estrategia de marketing digital y crecimiento de marcas con
            personalidad, estrategia y contenido que genera impacto.
          </motion.p>
        </div>

        {/* chrome chili hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 mx-auto aspect-square w-56 sm:w-72 lg:order-2 lg:w-full lg:max-w-[34rem]"
        >
          <WebglStar className="h-full w-full" />
        </motion.div>
      </div>

      {/* tape tagline marquee */}
      <div className="relative mt-8">
        <div className="border-paper/10 bg-ink/60 -rotate-1 border-y py-3">
          <Marquee
            text="jalapeño · marketing digital · crecimiento de marcas"
            className="font-display text-paper/90 text-2xl tracking-wide uppercase sm:text-3xl"
          />
        </div>
      </div>
    </section>
  )
}
