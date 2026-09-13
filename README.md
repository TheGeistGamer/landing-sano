# Sano · Landing page

Landing promocional de la app Sano. Astro (estático) + Tailwind CSS v4 + React (islas) y deploy en Cloudflare.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor local en `http://localhost:4321` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` localmente |
| `npm run deploy` | Build + `wrangler deploy` a Cloudflare |

## Estructura

```
src/
  pages/          Rutas (file-based): /, /terminos, /privacidad, 404
  layouts/        Layout base (SEO, fuentes, nav y footer)
  components/     Secciones en .astro; MobileMenu.tsx es una isla de React
  data/site.ts    URLs de tiendas, correo de soporte y links del menú
  data/legal.es.json  Textos legales (copia de la app)
  styles/global.css   Tokens de DESIGN.md + tema Tailwind
```

## Deploy en Cloudflare

1. `npx wrangler login` (una sola vez).
2. `npm run deploy`. Publica `dist/` como static assets en un Worker llamado `sano-landing` (ver `wrangler.jsonc`).
3. En el dashboard de Cloudflare, agrega el dominio personalizado (por ejemplo `sano.app`) al Worker.

## Pendientes

- URLs reales de App Store y Google Play en `src/data/site.ts`.
- Reemplazar los mockups en HTML por capturas reales si se desea.
- Mantener `src/data/legal.es.json` sincronizado con `Sano/src/i18n/locales/es/legal.json`.
