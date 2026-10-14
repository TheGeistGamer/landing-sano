// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Sitio estático: `astro build` genera `dist/` y Cloudflare lo sirve como assets
// (ver wrangler.jsonc). No necesita adapter SSR.
export default defineConfig({
  // Dominio personalizado del Worker `sano-landing` en Cloudflare.
  site: 'https://sano.infinitydev.agency',
  output: 'static',
  // CSS crítico inline: evita una petición bloqueante en el primer render.
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()],
  },
});
