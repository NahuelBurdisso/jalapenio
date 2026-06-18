import { motion } from 'motion/react'
import { KineticClaim } from '@/components/KineticClaim'
import { MagneticButton } from '@/components/MagneticButton'
import { Marquee } from '@/components/Marquee'

const EXPO = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section
      id="inicio"
      className="bg-char relative flex min-h-[100dvh] flex-col overflow-clip px-6 pt-24 pb-6 sm:px-10"
    >
      {/* chrome texture background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondo.jpg')" }}
      />
      {/* legibility scrim: darkest on the left where the type sits */}
      <div
        aria-hidden
        className="from-char/95 via-char/75 to-char/30 absolute inset-0 -z-10 bg-gradient-to-r"
      />
      {/* bottom scrim: keeps subtext + CTAs readable on mobile (full-width) */}
      <div
        aria-hidden
        className="from-char/85 -z-10 absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent"
      />

      {/* founder line */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EXPO }}
        className="text-paper/55 text-[11px] font-bold tracking-[0.28em] uppercase"
      >
        Sofía Herrero · Marketing digital
      </motion.p>

      {/* the claim is the hero */}
      <div className="relative flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[1400px]">
          <KineticClaim />
        </div>
      </div>

      {/* value prop + CTAs, asymmetric */}
      <div className="mx-auto grid w-full max-w-[1400px] items-end gap-7 lg:grid-cols-[1fr_auto]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EXPO }}
          className="text-paper/65 max-w-md text-base sm:text-lg"
        >
          Marketing digital, contenido y ads para marcas con ganas de prender.
          Estrategia con actitud y resultados que se ven.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EXPO }}
          className="flex flex-wrap items-center gap-3"
        >
          <MagneticButton href="#contacto">Hablemos</MagneticButton>
          <MagneticButton
            href="#proyectos"
            variant="ghost"
            className="text-paper ring-paper/30 hover:bg-paper hover:text-ink"
          >
            Ver proyectos
          </MagneticButton>
        </motion.div>
      </div>

      {/* tape tagline marquee */}
      <div className="relative mt-7">
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
