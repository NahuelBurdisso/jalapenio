import { Reveal } from '@/components/Reveal'

export function About() {
  return (
    <section
      id="sobre-mi"
      className="bg-char relative overflow-clip px-6 py-24 sm:px-10 lg:py-36"
    >
      {/* giant outline section number */}
      <span
        aria-hidden
        className="display stroke-text text-paper/20 pointer-events-none absolute -top-4 right-2 z-0 text-[28vw] sm:text-[20vw] lg:text-[16rem]"
      >
        02.
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Reveal>
            <p className="tape text-ink mb-3 inline-block -rotate-2 px-4 py-1 text-[11px] font-bold tracking-[0.25em] uppercase">
              Sobre mí
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display text-paper text-7xl sm:text-8xl lg:text-9xl">
              Sofía<span className="text-chili">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-paper/55 mt-6 max-w-md">
              Psicóloga de formación, estratega por vocación. El factor humano
              primero: cómo llegar de verdad al cliente.
            </p>
          </Reveal>
        </div>

        {/* torn paper bio card, slightly rotated */}
        <Reveal delay={0.1}>
          <div className="paper-card rotate-1 p-4 sm:p-6">
            <div className="text-ink/85 space-y-4 text-[15px] leading-relaxed">
              <p>
                Soy <strong>Sofía Herrero</strong>. Empecé mis estudios en 2018
                con la carrera de Psicología, que me aportó el factor humano de
                cómo llegar realmente al cliente.
              </p>
              <p>
                Hace un año estudio{' '}
                <strong>Marketing Digital en Cervantes</strong>. Me especializo
                en crear identidades visuales, campañas publicitarias y
                experiencias digitales que conectan emocionalmente con el
                público y cumplen los objetivos comerciales de cada cliente.
              </p>
              <p>
                Actualmente desarrollo{' '}
                <strong className="text-chili">Jalapeño</strong>, una agencia de
                marketing digital enfocada en construir marcas con personalidad,
                estrategia y contenido que genere impacto.
              </p>
              <p>
                Mi objetivo: combinar creatividad, análisis y comunicación para
                que las marcas se destaquen en entornos cada vez más
                competitivos.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
