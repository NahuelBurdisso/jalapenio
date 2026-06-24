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

        {/* engraved brushed-metal presentation plate (pure CSS) */}
        <Reveal delay={0.1}>
          <div className="@container mx-auto w-full max-w-[24rem] lg:max-w-[27rem]">
            <div
              className="relative overflow-hidden rounded-[3cqw] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55),inset_0_3px_8px_rgba(255,255,255,0.55),inset_0_-6px_16px_rgba(0,0,0,0.3),0_40px_70px_-25px_rgba(0,0,0,0.65)]"
              style={{
                background:
                  'linear-gradient(128deg,#e9e7e2 0%,#f7f6f3 9%,#b4b2ac 24%,#eeece8 38%,#cfcdc7 50%,#f3f2ef 60%,#a6a49e 73%,#e6e4df 86%,#c2c0ba 100%)',
              }}
            >
              {/* brushed-metal lines */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, rgba(255,255,255,0.09) 0px, rgba(255,255,255,0.09) 1px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 3px)',
                }}
              />
              {/* real chrome micro-texture (reuses hero texture) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay"
                style={{ backgroundImage: "url('/fondo.webp')" }}
              />
              {/* bright diagonal specular streak + soft reflection + bottom falloff */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(118deg, transparent 30%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.15) 52%, transparent 60%), radial-gradient(120% 80% at 72% 16%, rgba(255,255,255,0.5), rgba(255,255,255,0) 55%), linear-gradient(180deg, rgba(255,255,255,0) 56%, rgba(0,0,0,0.12) 100%)',
                }}
              />

              {/* engraved content (deboss = dark fill + bottom white highlight) */}
              <div className="relative flex flex-col px-[9cqw] py-[9cqw] text-[#54545a]">
                <div className="flex items-baseline justify-between [text-shadow:0_1px_0_rgba(255,255,255,0.6)]">
                  <span className="display text-[6.5cqw] tracking-tight text-[#5b5b61]">
                    Jalapeño
                  </span>
                  <span className="text-[2.6cqw] font-bold tracking-[0.2em] text-[#6c6c72] uppercase">
                    Nº 01
                  </span>
                </div>
                <div className="mt-[4cqw] h-px w-full bg-black/15 shadow-[0_1px_0_rgba(255,255,255,0.5)]" />

                <div className="mt-[7cqw] [text-shadow:0_1px_0_rgba(255,255,255,0.55)]">
                  <p className="text-[3.6cqw] font-bold tracking-[0.16em] text-[#5a5a60] uppercase">
                    Marketing digital · Branding
                  </p>
                  <p className="mt-[3.5cqw] text-[4.2cqw] leading-snug text-[#5d5d63]">
                    Psicóloga de formación, estratega por vocación. Identidades,
                    campañas y contenido que conectan y venden.
                  </p>
                  <p className="mt-[5cqw] text-[3cqw] font-semibold tracking-[0.18em] text-[#71717a] uppercase">
                    Córdoba, AR
                  </p>
                </div>
              </div>

              {/* corner screws: plate looks bolted to the wall */}
              {[
                { pos: 'top-[3.5cqw] left-[3.5cqw]', rot: '28deg' },
                { pos: 'top-[3.5cqw] right-[3.5cqw]', rot: '-18deg' },
                { pos: 'bottom-[3.5cqw] left-[3.5cqw]', rot: '64deg' },
                { pos: 'bottom-[3.5cqw] right-[3.5cqw]', rot: '-52deg' },
              ].map((s) => (
                <div
                  key={s.pos}
                  aria-hidden
                  className={`absolute ${s.pos} h-[4.6cqw] w-[4.6cqw] rounded-full`}
                  style={{
                    background:
                      'radial-gradient(circle at 38% 30%, #f7f6f3 0%, #d2d0cb 36%, #8c8a84 70%, #6e6c67 88%, #b4b2ac 100%)',
                    boxShadow:
                      'inset 0 1.2px 1.2px rgba(255,255,255,0.9), inset 0 -1.6px 2.4px rgba(0,0,0,0.65), inset 0 0 0 0.4px rgba(0,0,0,0.35), 0 2.5px 3.5px rgba(0,0,0,0.55), 0 0.5px 1px rgba(0,0,0,0.45)',
                  }}
                >
                  {/* recessed countersink ring */}
                  <span className="absolute inset-[0.5cqw] rounded-full shadow-[inset_0_0.6cqw_0.8cqw_rgba(0,0,0,0.45),inset_0_-0.4cqw_0.5cqw_rgba(255,255,255,0.4)]" />
                  {/* slot groove */}
                  <span
                    className="absolute top-1/2 left-1/2 h-[0.8cqw] w-[2.9cqw] rounded-full"
                    style={{
                      transform: `translate(-50%,-50%) rotate(${s.rot})`,
                      background:
                        'linear-gradient(180deg, rgba(20,20,22,0.8), rgba(60,60,64,0.55))',
                      boxShadow:
                        'inset 0 0.6px 0.8px rgba(0,0,0,0.85), 0 0.9px 0 rgba(255,255,255,0.55)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
