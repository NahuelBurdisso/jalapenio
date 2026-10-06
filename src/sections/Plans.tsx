import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/cn'
import { SITE } from '@/lib/seo'
import { EXTRAS, PLANS, SETUP, SHOW_PRICES, type Plan } from '@/data/plans'

// Static section (no client directive): renders as plain HTML, zero JS.
// Reveal animations run through the global RevealScript.

const wa = (msg: string) => `${SITE.whatsapp}?text=${encodeURIComponent(msg)}`

function Spark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn('h-3.5 w-3.5 shrink-0', className)}
    >
      <path
        d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"
        fill="currentColor"
      />
    </svg>
  )
}

// literal classes so Tailwind's scanner keeps them
const TONE = {
  suave: {
    card: 'bg-paper text-ink ring-1 ring-ink/15',
    muted: 'text-ink/70',
    rule: 'border-ink/12',
    spark: 'text-chili',
    price: 'text-chili',
    badge: 'bg-ink/8 text-ink',
    cta: 'ring-1 ring-ink text-ink hover:bg-ink hover:text-paper',
  },
  picante: {
    card: 'bg-chili text-paper shadow-[0_30px_60px_-20px_rgba(158,17,17,0.55)] lg:-translate-y-4',
    muted: 'text-paper/80',
    rule: 'border-paper/20',
    spark: 'text-paper',
    price: 'text-paper',
    badge: 'bg-ink text-paper',
    cta: 'bg-paper text-chili hover:bg-ink hover:text-paper',
  },
  arde: {
    card: 'bg-ink text-paper ring-1 ring-paper/10',
    muted: 'text-paper/75',
    rule: 'border-paper/12',
    spark: 'text-chili',
    price: 'text-paper',
    badge: 'bg-paper/10 text-paper',
    cta: 'bg-chili text-paper hover:bg-paper hover:text-ink',
  },
} as const

function PlanCard({ p, i }: { p: Plan; i: number }) {
  const t = TONE[p.id as keyof typeof TONE] ?? TONE.suave
  return (
    <Reveal delay={0.06 * i} className="flex">
      <article
        className={cn(
          'relative flex w-full flex-col rounded-xl p-7 sm:p-9',
          t.card,
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="display text-4xl">{p.index}</span>
          {p.badge && (
            <span
              className={cn(
                'rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase',
                t.badge,
              )}
            >
              {p.badge}
            </span>
          )}
        </div>

        <h3 className="display mt-4 text-7xl sm:text-8xl">{p.name}</h3>
        <p className={cn('mt-3 text-sm', t.muted)}>{p.tagline}</p>

        {SHOW_PRICES && (
          <div className={cn('mt-6 border-b pb-6', t.rule)}>
            <span className={cn('text-xs', t.muted)}>desde</span>
            <p className="flex items-baseline gap-2">
              <span className={cn('display text-5xl', t.price)}>{p.price}</span>
              <span className={cn('text-sm', t.muted)}>/ mes</span>
            </p>
          </div>
        )}

        <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm leading-relaxed">
          {p.intro && (
            <li className="font-bold tracking-wide uppercase">{p.intro}</li>
          )}
          {p.items.map((it) => (
            <li key={it.text} className="flex gap-3">
              <Spark className={cn('mt-1', t.spark)} />
              <span>
                {it.strong && <strong>{it.strong}</strong>} {it.text}
              </span>
            </li>
          ))}
        </ul>

        <a
          href={wa(`Hola Sofía! Me interesa el plan ${p.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'mt-8 flex min-h-12 items-center justify-center rounded-full px-6 text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300',
            t.cta,
          )}
        >
          Quiero el {p.name}
        </a>
      </article>
    </Reveal>
  )
}

export function Plans() {
  return (
    <section
      id="planes"
      className="bg-paper text-ink relative z-[2] overflow-clip px-6 py-24 sm:px-10 lg:py-36"
    >
      <span
        aria-hidden
        className="display stroke-text text-ink/10 pointer-events-none absolute top-6 right-3 z-0 text-[26vw] lg:text-[15rem]"
      >
        05.
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="text-chili text-[11px] font-bold tracking-[0.3em] uppercase">
            Planes de pauta · 2026
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-ink text-[18vw] leading-none sm:text-9xl lg:text-[11rem]">
            Elegí el <span className="text-chili">picor</span>
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal delay={0.08}>
            <p className="text-ink/75 max-w-xl text-lg">
              Meta Ads para negocios que quieren vender, explicado sin vueltas.{' '}
              <strong className="text-ink">
                Primero, los que ya te conocen:
              </strong>{' '}
              antes de gastar en gente nueva, vuelvo a buscar a quienes ya te
              compraron, te preguntaron o te siguen.
            </p>
          </Reveal>
          {SHOW_PRICES && (
            <Reveal delay={0.1}>
              <p className="bg-ink text-paper flex gap-3 rounded-lg px-5 py-4 text-sm">
                <Spark className="text-chili mt-0.5" />
                <span>
                  <strong>Precio de lanzamiento.</strong> Estás entre mis
                  primeros clientes: estos valores tienen un descuento especial.
                </span>
              </p>
            </Reveal>
          )}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((p, i) => (
            <PlanCard key={p.id} p={p} i={i} />
          ))}
        </div>

        {/* two accounts: fee vs Meta budget */}
        <Reveal delay={0.05}>
          <div className="border-ink/15 mt-14 grid gap-6 border-y py-8 sm:grid-cols-2">
            <p className="text-ink/75 text-sm leading-relaxed">
              <span className="text-chili block text-[11px] font-bold tracking-[0.25em] uppercase">
                A · Mi honorario
              </span>
              <strong className="text-ink">Mi trabajo.</strong> Armar las
              campañas, editar las piezas, mirarlas todas las semanas, ajustar
              lo que no rinde y explicarte los resultados. Es el precio de cada
              plan.
            </p>
            <p className="text-ink/75 text-sm leading-relaxed">
              <span className="text-chili block text-[11px] font-bold tracking-[0.25em] uppercase">
                B · Tu inversión en Meta
              </span>
              <strong className="text-ink">La nafta.</strong> Lo que se le paga
              a Meta para mostrar tus anuncios. Lo pagás directo con tu tarjeta;
              yo nunca toco esa plata y vos decidís el monto.
            </p>
          </div>
        </Reveal>

        {/* setup + extras */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div>
              <h3 className="display text-5xl sm:text-6xl">
                Configuración <span className="text-chili">inicial</span>
              </h3>
              <p className="text-ink/75 mt-4 max-w-lg text-sm leading-relaxed">
                Un pago único, antes de lanzar. Dejo las bases en orden para que
                después los números sean confiables.
              </p>
              {SHOW_PRICES && (
                <p className="mt-5 flex flex-wrap items-baseline gap-3">
                  <span className="text-ink/65 text-xs">desde</span>
                  <span className="display text-chili text-5xl">
                    {SETUP.price}
                  </span>
                  <span className="text-ink/50 text-lg line-through">
                    {SETUP.oldPrice}
                  </span>
                  <span className="bg-chili text-paper rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase">
                    50% off
                  </span>
                </p>
              )}
              <ul className="mt-6 flex flex-col gap-3 text-sm">
                {SETUP.items.map((s) => (
                  <li key={s} className="flex gap-3">
                    <Spark className="text-chili mt-1" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="text-chili mt-5 text-sm font-bold">
                Si tu cuenta ya está en orden, no se cobra.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="bg-ink text-paper rounded-xl p-7 sm:p-9">
              <p className="text-paper/75 text-[11px] font-bold tracking-[0.3em] uppercase">
                Adicionales
              </p>
              <ul className="mt-4">
                {EXTRAS.map((e) => (
                  <li
                    key={e.label}
                    className="border-paper/12 flex items-center justify-between gap-4 border-b py-4 text-sm last:border-b-0"
                  >
                    <span className="text-paper/85">{e.label}</span>
                    {(SHOW_PRICES || e.price === 'Gratis') && (
                      <strong
                        className={cn(
                          'shrink-0 whitespace-nowrap',
                          e.price === 'Gratis' &&
                            'text-paper bg-chili rounded-full px-3 py-1 text-[10px] tracking-[0.18em] uppercase',
                        )}
                      >
                        {e.price}
                      </strong>
                    )}
                  </li>
                ))}
              </ul>
              <a
                href={wa(
                  'Hola Sofía! Quiero pedir la auditoría gratis de mi cuenta.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-chili text-paper hover:bg-paper hover:text-ink mt-6 flex min-h-12 items-center justify-center rounded-full px-6 text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300"
              >
                Pedí tu auditoría gratis
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="text-ink/65 mt-12 text-center text-xs leading-relaxed">
            Ningún plan incluye la inversión en Meta · Acuerdo mínimo de 3
            meses, el tiempo que necesitan los anuncios para aprender y dar
            resultados reales.
            {SHOW_PRICES &&
              ' Precios de lanzamiento en pesos, a septiembre 2026. Cada propuesta se cotiza según tu caso.'}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
