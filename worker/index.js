// Worker delante de los assets estáticos de Astro. Solo corre para las rutas de
// `run_worker_first` (ver wrangler.jsonc); todo lo demás lo sirve Cloudflare directo.
//
// - /p/<código>  → sirve la página única /p/ (la lee el código desde la URL en el navegador).
// - /.well-known/apple-app-site-association → mismo archivo con Content-Type JSON,
//   que Apple exige para los Universal Links.

const BARCODE_PATH = /^\/p\/([0-9]{6,14})\/?$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/.well-known/apple-app-site-association') {
      const asset = await env.ASSETS.fetch(new URL('/.well-known/apple-app-site-association', url));
      return new Response(asset.body, {
        status: asset.status,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }

    if (BARCODE_PATH.test(url.pathname)) {
      const page = await env.ASSETS.fetch(new URL('/p/', url));
      return new Response(page.body, {
        status: page.status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
        },
      });
    }

    // /p/ sin código o con un código inválido: al inicio.
    if (url.pathname.startsWith('/p')) {
      return Response.redirect(new URL('/', url), 302);
    }

    return env.ASSETS.fetch(request);
  },
};
