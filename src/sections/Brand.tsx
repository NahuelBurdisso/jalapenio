import { Reveal } from '@/components/Reveal'
import { SERVICES } from '@/data/projects'
import { cn } from '@/lib/cn'

function Lockup({ tone }: { tone: 'paper' | 'chili' | 'ink' }) {
  const bg =
    tone === 'paper' ? 'bg-paper' : tone === 'chili' ? 'bg-chili' : 'bg-ink'
  const word =
    tone === 'chili'
      ? 'text-paper'
      : tone === 'ink'
        ? 'text-paper'
        : 'text-chili'
  return (
    <div
      className={cn(
        'flex aspect-[4/3] items-center justify-center gap-2 rounded-sm',
        bg,
      )}
    >
      <img
        src="/estrella.png"
        alt=""
        aria-hidden
        className={cn(
          'h-9 w-auto shrink-0 object-contain',
          // chrome reads light, so darken it on the white lockup for contrast
          tone === 'paper' && 'brightness-[0.35] contrast-125',
        )}
      />
      <span className={cn('display text-2xl sm:text-3xl', word)}>Jalapeño</span>
    </div>
  )
}

export function Brand() {
  return (
    <section
      id="marca"
      className="bg-paper text-ink relative overflow-clip px-6 py-24 sm:px-10 lg:py-36"
    >
      {/* fire glow from bottom-right */}
      <div
        aria-hidden
        className="from-amber via-ember/60 pointer-events-none absolute right-[-5%] bottom-[-10%] h-[55vh] w-[40vh] rounded-full bg-gradient-to-t to-transparent opacity-70 blur-[90px]"
      />
      <span
        aria-hidden
        className="display stroke-text text-ink/15 pointer-events-none absolute top-8 right-4 z-0 text-[26vw] lg:text-[15rem]"
      >
        03
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="text-chili text-[11px] font-bold tracking-[0.3em] uppercase">
            Mi marca
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-[16vw] leading-[0.82] sm:text-8xl lg:text-[9rem]">
            Jala<span className="text-chili">peño</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal delay={0.08}>
            <div className="text-ink/75 max-w-lg space-y-5">
              <p className="text-lg">
                Jalapeño nace de una idea simple:{' '}
                <strong className="text-ink">
                  las marcas que destacan son las que generan una emoción.
                </strong>
              </p>
              <p>
                Así como un jalapeño aporta intensidad a una receta, aportamos
                personalidad, estrategia y diferenciación a cada proyecto.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="bg-ink text-paper rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase">
                  si no arde, no impacta
                </span>
                <span className="text-ink/50 text-sm">
                  Encendemos el potencial de tu marca.
                </span>
              </div>
            </div>
          </Reveal>

          {/* services */}
          <Reveal delay={0.12}>
            <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <li
                  key={s}
                  className="group border-ink/10 flex items-center gap-3 border-b py-3"
                >
                  <span className="display text-chili text-sm tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-ink/80 group-hover:text-chili text-sm font-medium transition-colors">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* logo lockups */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Lockup tone="paper" />
            <Lockup tone="chili" />
            <Lockup tone="ink" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
