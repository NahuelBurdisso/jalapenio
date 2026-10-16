import { Reveal } from '@/components/Reveal'
import { Star } from '@/components/Star'

// Static section (no client directive): plain HTML, zero JS.

const POINTS = [
  {
    n: '01',
    title: 'Primero, los que ya te conocen',
    text: 'Antes de salir a buscar gente nueva, vuelvo a buscar a quienes ya te compraron, te escribieron o te siguen y no se decidieron. Están tibios: ya saben quién sos, y traerlos de vuelta cuesta menos.',
  },
  {
    n: '02',
    title: 'Entiendo por qué se compra',
    text: 'Vengo de la psicología. Entender qué le pasa a tu cliente antes de comprar es lo que hace que un anuncio le hable como corresponde.',
  },
  {
    n: '03',
    title: 'Un objetivo claro por campaña',
    text: 'Cada campaña apunta a algo concreto: ventas, mensajes o visitas a tu tienda. Y se mide contra eso, no contra los likes.',
  },
  {
    n: '04',
    title: 'Resultados explicados en simple',
    text: 'Informes cortos y claros: qué se hizo, qué funcionó y qué vamos a cambiar.',
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
        className="section-num stroke-text text-ink/10 pointer-events-none absolute top-6 right-3 z-0 text-[26vw] lg:text-[15rem]"
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
              <h2 className="display text-ink relative mt-3 w-fit text-[9vw] leading-[0.88] sm:text-6xl lg:text-[4.5rem]">
                Estrategia antes que{' '}
                <span className="text-chili">anuncios.</span>
                <Star className="-top-11 right-0 w-11 rotate-12 sm:-top-9 sm:-right-16 sm:w-16" />
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-ink/75 mt-8 max-w-lg text-lg">
                Cada campaña arranca entendiendo tu negocio y a tu cliente.
                Recién después armo los anuncios, los reviso todas las semanas y
                ajusto lo que no rinde, para que tu inversión en Meta se
                convierta en ventas.
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
                <span className="display text-chili w-12 shrink-0 text-3xl">
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
