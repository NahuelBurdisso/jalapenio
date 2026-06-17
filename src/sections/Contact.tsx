import { WebglStar } from '@/components/WebglStar'
import { Reveal } from '@/components/Reveal'
import { MagneticButton } from '@/components/MagneticButton'

const PHONE = '3541523489'
const PHONE_PRETTY = '3541-523489'
const IG = 'herreropipi'

export function Contact() {
  return (
    <section
      id="contacto"
      className="bg-ink text-paper relative overflow-clip px-6 py-28 sm:px-10 lg:py-40"
    >
      <div
        aria-hidden
        className="bg-chili/20 pointer-events-none absolute -bottom-1/4 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full blur-[120px]"
      />
      <span
        aria-hidden
        className="display stroke-text text-paper/15 pointer-events-none absolute -top-2 right-3 z-0 text-[28vw] lg:text-[18rem]"
      >
        05
      </span>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <Reveal>
          <div className="mx-auto mb-6 h-44 w-44 sm:h-56 sm:w-56">
            <WebglStar className="h-full w-full" />
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-paper/60 text-[11px] font-bold tracking-[0.3em] uppercase">
            Conclusión y contacto
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mt-3 text-[18vw] leading-[0.85] sm:text-8xl lg:text-[10rem]">
            Hagamos que <span className="text-chili">arda</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-paper/60 mt-6 max-w-xl">
            Gracias por explorar mi portfolio. Siempre busco nuevos desafíos y
            marcas con ganas de diferenciarse. Si no arde, no impacta.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              href={`https://wa.me/549${PHONE}`}
              variant="ghost"
              className="text-paper ring-paper/25 hover:bg-paper hover:text-ink"
            >
              WhatsApp {PHONE_PRETTY}
            </MagneticButton>
            <MagneticButton
              href={`https://instagram.com/${IG}`}
              variant="ghost"
              className="text-paper ring-paper/25 hover:bg-paper hover:text-ink"
            >
              @{IG}
            </MagneticButton>
          </div>
        </Reveal>
      </div>

      <footer className="border-paper/10 text-paper/65 relative z-10 mx-auto mt-24 flex max-w-7xl flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row">
        <span className="display text-paper text-base">Jalapeño</span>
        <span>Sofía Herrero · Marketing Digital · Crecimiento de marcas</span>
        <span>© {2026}</span>
      </footer>
    </section>
  )
}
