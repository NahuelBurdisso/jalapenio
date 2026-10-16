import { Reveal } from '@/components/Reveal'
import { Star } from '@/components/Star'
import { SITE } from '@/lib/seo'
import { SHOW_PRICES } from '@/data/plans'
import { EXTRAS, RULES } from '@/data/extras'

// Static section (no client directive): plain HTML, zero JS.

const AUDIT_HREF = `${SITE.whatsapp}?text=${encodeURIComponent(
  'Hola Sofía! Quiero pedir la auditoría gratis de mi cuenta.',
)}`

export function Extras() {
  return (
    <section
      id="extras"
      className="bg-chili text-paper relative z-[2] overflow-clip px-6 py-24 sm:px-10 lg:py-36"
    >
      <span
        aria-hidden
        className="section-num stroke-text text-paper/15 pointer-events-none absolute top-6 right-3 z-0 text-[26vw] lg:text-[15rem]"
      >
        05.
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* extras — menu-style price list (name · dotted leader · price) */}
        <Reveal>
          <p className="text-paper/75 text-[11px] font-bold tracking-[0.3em] uppercase">
            Para sumar a tu plan
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display relative mt-3 w-fit text-[10.8vw] leading-none sm:text-6xl lg:text-7xl">
            Extras
            <Star className="-top-5 -right-14 w-11 rotate-12 sm:-top-9 sm:-right-16 sm:w-16" />
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-10 grid gap-x-14 sm:grid-cols-2">
            {EXTRAS.map((e) => (
              <li
                key={e.label}
                className="flex items-baseline gap-3 py-3 text-base sm:text-[17px]"
              >
                <span>{e.label}</span>
                <span
                  aria-hidden
                  className="border-paper/45 min-w-6 flex-1 -translate-y-1 border-b-2 border-dotted"
                />
                {SHOW_PRICES && (
                  <span className="shrink-0 whitespace-nowrap">
                    <span className="text-paper/80 mr-1 text-xs">desde</span>
                    <span className="display text-base sm:text-lg">
                      {e.price}
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="bg-ink m-0 inline-flex rounded-full px-5 py-3 text-xs font-bold tracking-[0.15em] uppercase">
              Auditoría de tu cuenta · Gratis
            </p>
            <a
              href={AUDIT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper ring-paper/60 hover:bg-paper hover:text-ink inline-flex min-h-12 items-center justify-center rounded-full px-6 text-xs font-bold tracking-[0.18em] uppercase ring-1 transition-colors duration-300"
            >
              Pedila por WhatsApp
            </a>
          </div>
        </Reveal>

        {/* rules */}
        <div className="bg-ink relative mt-24 grid gap-10 rounded-[20px] px-6 pt-14 pb-10 sm:px-12 sm:pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Star className="-top-10 -left-5 w-20 -rotate-12 sm:-top-12 sm:-left-8 sm:w-28" />
          <div>
            <Reveal>
              <p className="text-paper/75 text-[11px] font-bold tracking-[0.3em] uppercase">
                Antes de arrancar
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display mt-3 text-[10.8vw] leading-none sm:text-6xl lg:text-7xl">
                Las reglas
              </h2>
            </Reveal>
          </div>
          <ol className="flex flex-col">
            {RULES.map((r, i) => (
              <Reveal
                key={r.strong}
                as="li"
                delay={0.05 * i}
                className="border-paper/25 flex gap-5 border-t py-5 last:border-b"
              >
                <span className="display text-paper/60 w-8 shrink-0 text-xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-paper/85 text-base leading-relaxed">
                  <strong className="text-paper">{r.strong}</strong> {r.text}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
