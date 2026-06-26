export const SITE = {
  url: 'https://jalapeno.studio',
  name: 'Jalapeño Studio',
  title: 'Jalapeño Studio — Marketing Digital',
  description:
    'Estrategia de marketing digital, branding y campañas para encender el potencial de tu marca. Por Sofía Herrero.',
  locale: 'es_AR',
  lang: 'es',
  ogImage: '/og-image.png',
  ogImageAlt: 'Jalapeño Studio — Marketing Digital. si no arde, no impacta.',
  themeColor: '#1e1d1c',
  // Contact / socials — confirm real values with Sofía before launch.
  email: 'hola@jalapeno.studio',
  sameAs: [] as string[], // e.g. ['https://instagram.com/...']
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  image: SITE.url + SITE.ogImage,
  email: SITE.email,
  founder: { '@type': 'Person', name: 'Sofía Herrero' },
  areaServed: 'AR',
  sameAs: SITE.sameAs,
}
