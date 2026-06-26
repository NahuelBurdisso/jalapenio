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
          <p className="reveal border-paper/15 text-paper/70 mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold tracking-[0.28em] uppercase">
            <span className="text-ember">★</span> Sofía Herrero · Marketing
            Digital
          </p>

          <KineticClaim />

          <p
            className="reveal text-paper/65 mt-8 max-w-md text-base sm:text-lg"
            style={{ transitionDelay: '0.45s' }}
          >
            Estrategia de marketing digital y crecimiento de marcas con
            personalidad, estrategia y contenido que genera impacto.
          </p>
        </div>

        {/* 3D chrome star */}
        <div
          className="reveal relative order-1 mx-auto aspect-square w-56 sm:w-72 lg:order-2 lg:w-full lg:max-w-[34rem]"
          style={{ transitionDelay: '0.2s' }}
        >
          <WebglStar className="h-full w-full" />
        </div>
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
