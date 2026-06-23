import { Reveal } from '@/components/Reveal'

export function About() {
  return (
    <section
      id="sobre-mi"
      className="bg-char relative overflow-clip px-6 py-24 sm:px-10 lg:py-36"
    >
      {/* blurred red background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondo-sobre-mi.webp')" }}
      />
      {/* legibility scrim: darkest on the left where the type sits */}
      <div
        aria-hidden
        className="from-char/92 via-char/70 to-char/35 absolute inset-0 -z-10 bg-gradient-to-r"
      />

      {/* giant outline section number */}
      <span
        aria-hidden
        className="display stroke-text text-paper/20 pointer-events-none absolute -top-4 right-2 z-0 text-[28vw] sm:text-[20vw] lg:text-[16rem]"
      >
        02.
      </span>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
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
              Psicóloga de formación,{' '}
              <span className="text-chili font-semibold">
                estratega por vocación
              </span>
              . El factor humano primero: cómo llegar de verdad al cliente.
            </p>
          </Reveal>
        </div>

        {/* metalized ID-badge bio card: info written over the white card area */}
        <Reveal delay={0.1}>
          <div className="@container relative mx-auto w-full max-w-[70.4vh] lg:max-w-[83.5vh]">
            <img
              src="/credencial.webp"
              alt="Credencial de Sofía Herrero"
              width={1000}
              height={1137}
              className="h-auto w-full select-none"
              draggable={false}
            />
            {/* text sits inside the blank white card region; sizes use cqw so
                they scale proportionally with the card at any viewport */}
            <div
              className="text-ink absolute flex flex-col"
              style={{ left: '18.5%', right: '13.5%', top: '58%', bottom: '13%' }}
            >
              <h3 className="display text-ink text-[6.2cqw] leading-none">
                Sofía Herrero
              </h3>
              <p className="text-chili mt-[1.2cqw] text-[2.7cqw] font-bold tracking-[0.16em] uppercase">
                Marketing digital · Branding
              </p>
              <p className="text-ink/75 mt-auto text-[3.5cqw] leading-snug">
                Psicóloga de formación, estratega por vocación. Identidades,
                campañas y contenido que conectan y venden.
              </p>
              <p className="text-ink/45 mt-[1.8cqw] text-[2.7cqw] font-semibold tracking-[0.14em] uppercase">
                Córdoba, AR
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
