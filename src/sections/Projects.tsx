import { Reveal } from '@/components/Reveal'
import { Marquee } from '@/components/Marquee'
import { LazyVideo } from '@/components/LazyVideo'
import { PROJECTS, type Project } from '@/data/projects'
import { cn } from '@/lib/cn'

// literal classes so Tailwind's scanner keeps them
const ACCENT: Record<string, { text: string; chip: string; bar: string }> = {
  acid: { text: 'text-acid', chip: 'bg-acid text-ink', bar: 'bg-acid' },
  amber: { text: 'text-amber', chip: 'bg-amber text-ink', bar: 'bg-amber' },
  ember: { text: 'text-ember', chip: 'bg-ember text-paper', bar: 'bg-ember' },
}

type Media =
  | { kind: 'img'; src: string; alt: string }
  | { kind: 'video'; src: string; poster?: string; alt: string }

function Card({ p, i }: { p: Project; i: number }) {
  const a = ACCENT[p.accent] ?? ACCENT.ember
  const media: Media[] = [
    ...p.images.map((m) => ({ kind: 'img' as const, ...m })),
    ...(p.videos ?? []).map((m) => ({ kind: 'video' as const, ...m })),
  ]
  return (
    <Reveal delay={0.05 * i}>
      <article className="group border-paper/10 bg-ink/70 relative z-0 rounded-xl border p-7 backdrop-blur-sm hover:z-30 sm:p-10">
        <div className={cn('absolute inset-x-0 top-0 h-1', a.bar)} />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-md">
            <div className="flex items-center gap-4">
              <span className="display text-paper text-5xl">{p.index}</span>
              <span
                className={cn(
                  'rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase',
                  a.chip,
                )}
              >
                {p.kind}
              </span>
            </div>
            <h3 className="font-sans text-paper mt-3 text-4xl font-bold tracking-[0.04em] uppercase sm:text-5xl">
              {p.client}
            </h3>
            <p className="text-paper/65 mt-5 text-sm leading-relaxed">
              {p.description}
            </p>
            <p className="mt-4 text-sm">
              <span className={cn('font-bold uppercase', a.text)}>
                Objetivo ·{' '}
              </span>
              <span className="text-paper/75">{p.objective}</span>
            </p>
          </div>

          {media.length > 0 && (
            <div className="mt-8 flex flex-1 flex-wrap items-center justify-center gap-3 lg:mt-0 lg:max-w-[30rem]">
              {media.map((m) => (
                <div key={m.src} className="relative h-36 w-36 shrink-0">
                  <figure
                    className={cn(
                      'group/fig ring-paper/15 bg-char absolute top-1/2 left-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg p-1 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.7)] ring-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-50 hover:shadow-[0_36px_70px_-18px_rgba(0,0,0,0.85)]',
                      m.kind === 'img'
                        ? 'hover:h-[14rem] hover:w-[22rem]'
                        : 'hover:h-[22rem] hover:w-[12.375rem]',
                    )}
                  >
                    {m.kind === 'img' ? (
                      <img
                        src={m.src}
                        alt={m.alt}
                        loading="lazy"
                        decoding="async"
                        width={1600}
                        height={900}
                        className="h-full w-full rounded-[5px] object-cover group-hover/fig:object-contain"
                      />
                    ) : (
                      <LazyVideo
                        src={m.src}
                        poster={m.poster}
                        aria-label={m.alt}
                        className="h-full w-full rounded-[5px] object-cover"
                      />
                    )}
                  </figure>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}

export function Projects() {
  return (
    <section
      id="proyectos"
      className="bg-char relative z-[2] overflow-clip px-6 pt-24 pb-6 sm:px-10 lg:pt-36 lg:pb-8"
    >
      {/* red lacquer-box background — stretched so the box depth stays
          symmetric (ceiling at top, floor at bottom) like the original photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[length:100%_100%] bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondo4.webp')" }}
      />
      {/* soft scrim: deepens top/bottom so the heading + cards read on the red */}
      <div
        aria-hidden
        className="from-char/35 via-char/5 to-char/35 absolute inset-0 -z-10 bg-gradient-to-b"
      />
      <span
        aria-hidden
        className="display stroke-text text-paper/15 pointer-events-none absolute top-6 right-3 z-0 text-[26vw] lg:text-[15rem]"
      >
        04.
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="text-paper text-[11px] font-bold tracking-[0.3em] uppercase">
            Casos
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-paper text-[18vw] leading-none sm:text-9xl lg:text-[11rem]">
            Proyectos
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <Card key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>

      <div className="border-paper/10 relative z-10 mt-16 -rotate-1 border-y py-3">
        <Marquee
          reverse
          text="branding · contenido · meta ads · campañas"
          className="font-display text-paper/70 text-xl tracking-wide uppercase"
        />
      </div>
    </section>
  )
}
