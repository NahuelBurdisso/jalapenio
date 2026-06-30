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
              Psicóloga de formación,{' '}
              <span className="text-chili font-semibold">
                estratega por vocación
              </span>
              . El factor humano primero: cómo llegar de verdad al cliente.
            </p>
          </Reveal>
        </div>

        {/* frosted-glass 3D presentation plate (pure CSS, real backdrop blur) */}
        <Reveal delay={0.1}>
          <div className="@container mx-auto w-full max-w-[26rem] [perspective:1200px] lg:max-w-[30rem]">
            <div
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] px-[9cqw] py-[12cqw] backdrop-blur-xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] hover:[transform:rotateX(4deg)_rotateY(-5deg)]"
              style={{
                boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.35), 0 40px 70px -25px rgba(0,0,0,0.75)',
              }}
            >
              {/* diagonal specular sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(125deg, rgba(255,255,255,0.20) 0%, transparent 32%, transparent 68%, rgba(255,255,255,0.07) 100%)',
                }}
              />
              {/* top light glow (glass edge catching light) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-1/3 h-2/3 bg-[radial-gradient(120%_80%_at_30%_0%,rgba(255,255,255,0.22),transparent_60%)]"
              />
              {/* red brand tint glowing through the glass */}
              <div
                aria-hidden
                className="bg-chili/30 pointer-events-none absolute -right-1/4 -bottom-1/3 h-2/3 w-2/3 rounded-full blur-3xl"
              />

              <div className="relative">
                <div className="flex items-baseline justify-between">
                  <span className="display text-paper text-[7cqw] tracking-tight">
                    Jalapeño
                  </span>
                  <span className="text-paper/45 text-[2.6cqw] font-bold tracking-[0.2em] uppercase">
                    Nº 01
                  </span>
                </div>
                <div className="mt-[4cqw] h-px w-full bg-white/15" />

                <p className="text-chili mt-[6cqw] text-[3.4cqw] font-bold tracking-[0.16em] uppercase">
                  Marketing digital · Branding
                </p>
                <p className="text-paper/80 mt-[3.5cqw] text-[4cqw] leading-snug">
                  Psicóloga de formación, estratega por vocación. Identidades,
                  campañas y contenido que conectan y venden.
                </p>
                <p className="text-paper/45 mt-[5cqw] text-[3cqw] font-semibold tracking-[0.18em] uppercase">
                  Córdoba, AR
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
