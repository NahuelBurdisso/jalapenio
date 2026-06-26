import { Reveal } from '@/components/Reveal'
import { Marquee } from '@/components/Marquee'
import { PROJECTS, type Project } from '@/data/projects'
import { cn } from '@/lib/cn'

// literal classes so Tailwind's scanner keeps them
const ACCENT: Record<string, { text: string; chip: string; bar: string }> = {
  acid: { text: 'text-acid', chip: 'bg-acid text-ink', bar: 'bg-acid' },
  amber: { text: 'text-amber', chip: 'bg-amber text-ink', bar: 'bg-amber' },
  ember: { text: 'text-ember', chip: 'bg-ember text-paper', bar: 'bg-ember' },
}

function Card({ p, i }: { p: Project; i: number }) {
  const a = ACCENT[p.accent] ?? ACCENT.ember
  const tilt = i % 2 === 0 ? 'lg:rotate-[-1deg]' : 'lg:rotate-[1.2deg]'
  return (
    <Reveal delay={0.05 * i}>
      <article
        className={cn(
          'group border-paper/10 bg-ink/70 relative overflow-clip rounded-xl border p-7 backdrop-blur-sm transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-10 lg:hover:rotate-0',
          tilt,
        )}
      >
        <div className={cn('absolute inset-x-0 top-0 h-1', a.bar)} />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="lg:max-w-md">
            <div className="flex items-center gap-4">
              <span className="display stroke-text text-paper/40 text-5xl">
                {p.index}
              </span>
              <span
                className={cn(
                  'rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase',
                  a.chip,
                )}
              >
                {p.kind}
              </span>
            </div>
            <h3 className="display text-paper mt-3 text-6xl sm:text-7xl">
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

          <ul className="flex shrink-0 flex-col gap-2 lg:w-72">
            {p.highlights.map((h) => (
              <li
                key={h}
                className="border-paper/10 text-paper/70 flex items-start gap-2 border-b pb-2 text-sm"
              >
                <span className={cn('mt-1 text-xs', a.text)}>★</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {p.images.length > 0 && (
          <div
            className={cn(
              'mt-8 grid gap-3',
              p.images.length === 1
                ? 'grid-cols-1'
                : 'grid-cols-2 lg:grid-cols-4',
            )}
          >
            {p.images.map((img) => (
              <figure
                key={img.src}
                className="ring-paper/10 group/img bg-char/60 overflow-clip rounded-lg p-1 ring-1"
              >
                <picture>
                  <source
                    srcSet={img.src.replace(/\.jpg$/, '.webp')}
                    type="image/webp"
                  />
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={900}
                    className="aspect-video h-full w-full rounded-[5px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-[1.04]"
                  />
                </picture>
              </figure>
            ))}
          </div>
        )}
      </article>
    </Reveal>
  )
}

export function Projects() {
  return (
    <section
      id="proyectos"
      className="bg-char relative overflow-clip px-6 py-24 sm:px-10 lg:py-36"
    >
      <span
        aria-hidden
        className="display stroke-text text-paper/15 pointer-events-none absolute top-6 right-3 z-0 text-[26vw] lg:text-[15rem]"
      >
        04
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="text-ember text-[11px] font-bold tracking-[0.3em] uppercase">
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
