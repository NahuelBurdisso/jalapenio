export type ProjectImage = { src: string; alt: string }
export type ProjectVideo = { src: string; poster?: string; alt: string }

export type Project = {
  id: string
  index: string
  client: string
  kind: string
  accent: string // tailwind text/bg color token name
  description: string
  objective: string
  highlights: string[]
  images: ProjectImage[]
  videos?: ProjectVideo[] // vertical 9:16 reels, muted, side by side
}

export const PROJECTS: Project[] = [
  {
    id: 'amnesia',
    index: '01',
    client: 'Amnesia',
    kind: 'Manejo de redes + rebranding',
    accent: 'acid',
    description:
      'Rediseño completo de la identidad de marca: paleta, tipografía y aplicaciones. Diseño de publicaciones, acciones de marketing y producción de contenido.',
    objective: 'Modernizar la imagen de la marca para impulsar su crecimiento.',
    highlights: [],
    images: [
      {
        src: '/projects/amnesia-1.webp',
        alt: 'Amnesia — grilla de contenido “buzo o suéter”',
      },
      {
        src: '/projects/amnesia-2.webp',
        alt: 'Amnesia — sorteo campera puffer, collage halftone',
      },
    ],
    videos: [
      {
        src: '/projects/amnesia-4.mp4',
        poster: '/projects/amnesia-4-poster.jpg',
        alt: 'Amnesia — reel de contenido',
      },
      {
        src: '/projects/amnesia-5.mp4',
        poster: '/projects/amnesia-5-poster.jpg',
        alt: 'Amnesia — reel de contenido',
      },
    ],
  },
  {
    id: 'marea',
    index: '02',
    client: 'Marea',
    kind: 'Community management + contenido',
    accent: 'amber',
    description:
      'Community manager: acercamiento al público de la marca, creación de contenido y acciones administrativas de marketing.',
    objective: 'Humanización de la marca — mostrar lo que hay detrás.',
    highlights: [
      'Desfile Paseo del Jockey — 28 sep. 2024',
      'Dirección de looks sobre la nueva colección',
      'Cobertura backstage y muestra digital',
      'Concepto: “fluí como la marea”',
    ],
    images: [
      {
        src: '/projects/marea-1.webp',
        alt: 'Marea — desfile Paseo del Jockey, backstage y looks',
      },
    ],
    videos: [
      {
        src: '/projects/marea-2.mp4',
        poster: '/projects/marea-2-poster.jpg',
        alt: 'Marea — reel del desfile',
      },
      {
        src: '/projects/marea-3.mp4',
        poster: '/projects/marea-3-poster.jpg',
        alt: 'Marea — reel del desfile',
      },
    ],
  },
  {
    id: 'meta-ads',
    index: '03',
    client: 'Meta Ads',
    kind: 'Publicidad pagada',
    accent: 'ember',
    description:
      'Proyecto de publicidad en Meta Ads para promociones específicas en fechas particulares.',
    objective: 'Lograr más clicks y más ventas con segmentación por fecha.',
    highlights: [
      'Segmentación por audiencia y fecha',
      'Creatividades por promoción',
      'Optimización por CTR y conversión',
    ],
    images: [
      {
        src: '/projects/metaads-1.webp',
        alt: 'Meta Ads — campaña promo Mes de Mayo, liquidación 50% off',
      },
      {
        src: '/projects/metaads-2.webp',
        alt: 'Meta Ads — campaña Día del Padre para Amnesia, dirección western',
      },
      {
        src: '/projects/metaads-3.webp',
        alt: 'Meta Ads — promo Día del Amigo 2x1 para Amnesia',
      },
    ],
  },
]

export const SERVICES = [
  'Estrategia de marketing digital',
  'Gestión de redes sociales',
  'Branding e identidad visual',
  'Producción de contenido',
  'Publicidad en Meta Ads',
  'Diseño gráfico',
  'Desarrollo de campañas',
]
