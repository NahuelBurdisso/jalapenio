import { Reveal } from '@/components/Reveal'
import { SITE } from '@/lib/seo'
import { SHOW_PRICES } from '@/data/plans'
import { EXTRAS, RULES } from '@/data/extras'

// Static section (no client directive): plain HTML, zero JS.

const AUDIT_HREF = `${SITE.whatsapp}?text=${encodeURIComponent(
  'Hola Sofía! Quiero pedir la auditoría gratis de mi cuenta.',
)}`

// decorative barcode: fixed bar widths so the markup is stable
const BARS = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2]

export function Extras() {
  return (
    <section
      id="extras"
      className="bg-chili text-paper relative z-[2] overflow-clip px-6 py-24 sm:px-10 lg:py-36"
    >
      <span
        aria-hidden
        className="display stroke-text text-paper/15 pointer-events-none absolute top-6 right-3 z-0 text-[15.6vw] lg:text-[9rem]"
      >
        05.
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        {/* extras — receipt */}
        <div>
          <Reveal>
            <p className="text-paper/75 text-[11px] font-bold tracking-[0.3em] uppercase">
              Para sumar a tu plan
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-3 text-[10.8vw] leading-none sm:text-6xl lg:text-7xl">
              Extras
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="bg-paper text-ink mt-10 max-w-md -rotate-1 rounded-sm px-7 pt-8 pb-6 font-mono text-[13px] tracking-wide uppercase shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] sm:px-9">
              <ul className="flex flex-col gap-4">
                {EXTRAS.map((e) => (
                  <li
                    key={e.label}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span>{e.label}</span>
                    {SHOW_PRICES && (
                      <span className="shrink-0 whitespace-nowrap">
                        desde {e.price}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              <div
                aria-hidden
                className="border-ink/40 my-6 border-t-2 border-dashed"
              />
              <p className="flex items-baseline justify-between gap-4 font-bold">
                <span>Auditoría de tu cuenta</span>
                <span className="text-chili">Gratis</span>
              </p>
              <div
                aria-hidden
                className="mt-6 flex h-14 items-stretch justify-center gap-[3px]"
              >
                {BARS.map((w, i) => (
                  <span
                    key={i}
                    className="bg-ink block"
                    style={{ width: `${w * 2}px` }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={AUDIT_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ink text-paper hover:bg-paper hover:text-ink mt-10 inline-flex min-h-12 items-center justify-center rounded-full px-8 text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300"
            >
              Pedí tu auditoría gratis
            </a>
          </Reveal>
        </div>

        {/* rules */}
        <div className="lg:pt-24">
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
          <ol className="mt-10 flex flex-col">
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
