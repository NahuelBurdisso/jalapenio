import { Reveal } from '@/components/Reveal'
import { LazyVideo } from '@/components/LazyVideo'
import { cn } from '@/lib/cn'
import { SERVICES } from '@/data/projects'

// brand-identity lockups (real assets from the brand manual)
const LOCKUPS: {
  src?: string
  video?: string
  poster?: string
  alt: string
  contain?: boolean // show the whole asset (no crop) — e.g. tall color palette
}[] = [
  {
    video: '/marca-video.mp4',
    poster: '/marca-video-poster.jpg',
    alt: 'Video del proceso de marca de jalapeño',
  },
  {
    src: '/colores-jalapeno.webp',
    alt: 'Paleta de colores de marca jalapeño: negro, blanco, rojo y oliva',
  },
  {
    src: '/marca-explicacion.webp',
    alt: 'SOY > JALAPEÑO — agencia de marketing visual y estratégico: si no arde, no impacta',
  },
]

export function Brand() {
  return (
    <section
      id="marca"
      className="bg-paper text-ink relative z-[2] overflow-clip px-6 py-24 sm:px-10 lg:py-36"
    >
      {/* crinkled white-plastic texture background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/fondo03.webp')" }}
      />
      {/* soft white veil: tames plastic highlights so dark type stays crisp */}
      <div
        aria-hidden
        className="bg-paper/35 absolute inset-0 -z-10"
      />
      <span
        aria-hidden
        className="display stroke-text text-ink/15 pointer-events-none absolute top-8 right-4 z-0 text-[26vw] lg:text-[15rem]"
      >
        03.
      </span>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <p className="text-chili text-[11px] font-bold tracking-[0.3em] uppercase">
            Mi marca
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display text-chili text-[16vw] leading-[0.82] sm:text-8xl lg:text-[9rem]">
            Jalapeño
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
                <span className="text-ink/65 text-sm">
                  Encendemos el potencial de tu marca.
                </span>
              </div>
            </div>
          </Reveal>

          {/* services */}
          <Reveal delay={0.12}>
            <ul className="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li
                  key={s}
                  className="group border-ink/10 flex items-center gap-3 border-b py-3"
                >
                  <span
                    aria-hidden
                    className="text-ink/30 group-hover:text-chili text-lg leading-none font-bold transition-colors"
                  >
                    *
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
            {LOCKUPS.map((l) => (
              <div
                key={l.alt}
                className={cn(
                  'ring-ink/10 overflow-hidden rounded-sm ring-1',
                  l.contain && 'bg-paper',
                )}
              >
                {l.video ? (
                  <LazyVideo
                    src={l.video}
                    poster={l.poster}
                    aria-label={l.alt}
                    className="aspect-[4/3] h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={l.src}
                    alt={l.alt}
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={675}
                    className={cn(
                      'aspect-[4/3] h-full w-full',
                      l.contain ? 'object-contain' : 'object-cover',
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
