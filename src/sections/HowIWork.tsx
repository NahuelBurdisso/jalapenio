import { Reveal } from '@/components/Reveal'

// Static section (no client directive): plain HTML, zero JS.

const POINTS = [
  {
    n: '01',
    title: 'Una sola persona',
    text: 'Soy Sofía. La que te responde es la misma que arma y mira tus campañas. Sin intermediarios.',
  },
  {
    n: '02',
    title: 'Entiendo por qué se compra',
    text: 'Vengo de la psicología. La mitad del trabajo es escuchar bien a tu cliente y hablarle como corresponde.',
  },
  {
    n: '03',
    title: 'Te lo explico en criollo',
    text: 'Informes cortos y claros. Sabés qué se hizo, qué funcionó y qué cambiamos.',
  },
]

export function HowIWork() {
  return (
    <section
      id="como-trabajo"
      className="bg-paper text-ink relative z-[2] overflow-clip px-6 py-24 sm:px-10 lg:py-36"
    >
      <span
        aria-hidden
        className="display stroke-text text-ink/10 pointer-events-none absolute top-6 right-3 z-0 text-[26vw] lg:text-[15rem]"
      >
        02.
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="text-chili text-[11px] font-bold tracking-[0.3em] uppercase">
                Cómo trabajo
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display text-ink mt-3 text-[15vw] leading-[0.88] sm:text-8xl lg:text-[7.5rem]">
                Primero, los que{' '}
                <span className="text-chili">ya te conocen.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-ink/75 mt-8 max-w-lg text-lg">
                Antes de gastar en gente nueva, vuelvo a buscar a quienes ya te
                compraron, te preguntaron o te siguen y no se decidieron. Están
                tibios: ya saben quién sos. Traerlos de vuelta cuesta menos que
                convencer a un desconocido.
              </p>
            </Reveal>
          </div>

          <ol className="flex flex-col lg:pt-10">
            {POINTS.map((p, i) => (
              <Reveal
                key={p.n}
                as="li"
                delay={0.06 * i}
                className="border-ink/15 flex gap-6 border-t py-7 last:border-b"
              >
                <span className="display text-chili w-12 shrink-0 text-4xl">
                  {p.n}
                </span>
                <div>
                  <h3 className="text-ink text-base font-bold tracking-[0.06em] uppercase">
                    {p.title}
                  </h3>
                  <p className="text-ink/75 mt-2 text-sm leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* two accounts — small detail */}
        <Reveal delay={0.05}>
          <div className="bg-ink text-paper mt-16 grid gap-4 rounded-xl px-6 py-5 text-sm sm:grid-cols-[auto_1fr_1fr] sm:items-center sm:gap-8 sm:px-8">
            <p className="text-paper/70 text-[11px] font-bold tracking-[0.25em] uppercase">
              Dos cuentas separadas
            </p>
            <p className="text-paper/80">
              <strong className="text-paper">Mi honorario:</strong> mi trabajo,
              el precio de cada plan.
            </p>
            <p className="text-paper/80">
              <strong className="text-paper">Tu inversión en Meta:</strong> la
              pagás directo con tu tarjeta. Yo nunca toco esa plata.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
