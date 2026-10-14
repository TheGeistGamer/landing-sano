import type { APIRoute } from 'astro';

// Solo páginas indexables (sin /p/ ni 404).
const PAGES = [
  { path: '/', priority: '1.0' },
  { path: '/privacidad', priority: '0.3' },
  { path: '/terminos', priority: '0.3' },
];

export const GET: APIRoute = ({ site }) => {
  const urls = PAGES.map(
    (p) => `  <url><loc>${new URL(p.path, site)}</loc><priority>${p.priority}</priority></url>`,
  ).join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
