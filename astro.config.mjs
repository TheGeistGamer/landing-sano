// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Sitio estático: `astro build` genera `dist/` y Cloudflare lo sirve como assets
// (ver wrangler.jsonc). No necesita adapter SSR.
export default defineConfig({
  site: 'https://sano.app',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
