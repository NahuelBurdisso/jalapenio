export const SITE = {
  // Primary URL is www (the apex 308-redirects to www on Vercel).
  url: 'https://www.jalapeno.studio',
  name: 'Jalapeño Studio',
  title: 'Jalapeño Studio — Marketing Digital',
  description:
    'Estrategia de marketing digital, branding y campañas para encender el potencial de tu marca. Por Sofía Herrero.',
  locale: 'es_AR',
  lang: 'es',
  ogImage: '/og-image.png',
  ogImageAlt: 'Jalapeño Studio — Marketing Digital. si no arde, no impacta.',
  themeColor: '#1e1d1c',
  // Real contact channels (the ones shown on the site).
  phone: '+5493541523489',
  whatsapp: 'https://wa.me/5493541523489',
  instagram: 'https://instagram.com/herreropipi',
  sameAs: ['https://instagram.com/herreropipi'],
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  image: SITE.url + SITE.ogImage,
  telephone: SITE.phone,
  founder: { '@type': 'Person', name: 'Sofía Herrero' },
  areaServed: 'AR',
  sameAs: SITE.sameAs,
}
