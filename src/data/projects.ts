export type Project = {
  id: string
  index: string
  client: string
  kind: string
  accent: string // tailwind text/bg color token name
  description: string
  objective: string
  highlights: string[]
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
    highlights: [
      'Sorteo campera puffer — collage halftone',
      'Promo Día del Amigo 2x1',
      'Campaña Día del Padre — dirección western',
      'Mes de Mayo — liquidación 50% off, clave neón',
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
