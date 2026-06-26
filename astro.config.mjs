import { defineConfig } from 'astro/config'
import { fileURLToPath, URL } from 'node:url'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Pure static output (default). Vercel auto-detects Astro and serves dist/.
// No adapter needed unless we later add SSR/ISR/analytics.
export default defineConfig({
  site: 'https://jalapeno.studio',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
})
