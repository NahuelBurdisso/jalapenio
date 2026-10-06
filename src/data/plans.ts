// Planes de pauta 2026 — textos y precios del PDF "Planes de pauta 2026".
// Para cambiar un precio o un ítem, editá solo este archivo.

export type Plan = {
  id: string
  index: string
  name: string
  tagline: string
  price: string
  featured?: boolean
  badge?: string
  intro?: string // "Todo lo del plan X, más:"
  items: { strong?: string; text: string }[]
}

// Mostrar u ocultar todos los precios de la sección de un solo cambio.
export const SHOW_PRICES = true

export const PLANS: Plan[] = [
  {
    id: 'suave',
    index: '01',
    name: 'Suave',
    tagline: 'Para arrancar con pauta sin complicarte.',
    price: '$180.000',
    items: [
      {
        strong: 'Remarketing:',
        text: 'volvemos a buscar a quienes ya te vieron, te escribieron o te compraron.',
      },
      {
        strong: 'Un objetivo por mes:',
        text: 'ventas, mensajes o visitas a tu tienda.',
      },
      { strong: 'Hasta 2 campañas', text: 'activas.' },
      {
        strong: '4 piezas editadas',
        text: 'para anuncios, con tus fotos y videos.',
      },
      { text: 'Textos de los anuncios escritos por mí.' },
      { strong: 'Informe mensual', text: 'en lenguaje claro.' },
    ],
  },
  {
    id: 'picante',
    index: '02',
    name: 'Picante',
    tagline: 'Para vender todos los meses, no de a ratos.',
    price: '$300.000',
    featured: true,
    badge: 'El recomendado',
    intro: 'Todo lo del plan Suave, más:',
    items: [
      {
        strong: 'Remarketing y búsqueda de clientes nuevos,',
        text: 'en ese orden.',
      },
      { strong: 'Hasta 4 campañas', text: 'activas.' },
      {
        strong: 'Pruebas de anuncios:',
        text: 'se lanzan varias versiones y se queda la que mejor rinde.',
      },
      { strong: '8 piezas editadas', text: 'por mes: placas y reels cortos.' },
      {
        strong: 'Informe cada 15 días',
        text: 'y una reunión mensual de 30 minutos.',
      },
    ],
  },
  {
    id: 'arde',
    index: '03',
    name: 'Arde',
    tagline: 'Para tiendas online que quieren crecer en serio.',
    price: '$450.000',
    badge: 'Tiendas online',
    intro: 'Todo lo del plan Picante, más:',
    items: [
      {
        strong: 'Anuncios de catálogo',
        text: 'conectados a tu Tiendanube: cada persona ve los productos que miró.',
      },
      {
        strong: 'Medición de ventas reales:',
        text: 'sabés qué venta vino de qué anuncio.',
      },
      { strong: '12 piezas editadas', text: 'por mes.' },
      { strong: 'Revisión semanal', text: 'de campañas y presupuesto.' },
      { strong: 'Informe semanal', text: 'y reunión mensual.' },
    ],
  },
]

export const SETUP = {
  price: '$60.000',
  oldPrice: '$120.000',
  items: [
    'Orden de tu portfolio comercial, página e Instagram.',
    'Píxel y medición de conversiones, para saber qué anuncio trae ventas.',
    'Públicos de remarketing listos para usar.',
    'Catálogo de productos, si tenés tienda online.',
  ],
}

export const EXTRAS = [
  { label: 'Reel extra editado (con tu material)', price: 'desde $25.000' },
  { label: 'Placa o pieza extra para anuncios', price: 'desde $12.000' },
  { label: 'Auditoría de tu cuenta', price: 'Gratis' },
]
