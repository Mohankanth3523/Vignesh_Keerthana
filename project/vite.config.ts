import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Emits robots.txt and (when VITE_SITE_URL is set) sitemap.xml at build time,
 * so no domain is ever hard-coded.
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'wedding-seo-files',
    apply: 'build',
    generateBundle() {
      const url = siteUrl.replace(/\/$/, '');
      const robots = ['User-agent: *', 'Allow: /', url ? `Sitemap: ${url}/sitemap.xml` : ''].filter(Boolean).join('\n');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots}\n` });
      if (url) {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n</urlset>\n`;
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      }
    },
  };
}

/** Fills %VITE_SITE_URL% in index.html (empty string when not configured). */
function siteUrlInHtml(siteUrl: string): Plugin {
  return {
    name: 'wedding-site-url',
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%VITE_SITE_URL%', siteUrl.replace(/\/$/, '')) },
  };
}

/** Public address on Cloudflare Pages. Override with VITE_SITE_URL in .env. */
const DEFAULT_SITE_URL = 'https://vignesh-keerthana.pages.dev';

// `base: './'` keeps every asset path relative, so the built site works on
// Netlify, Vercel, GitHub Pages, Firebase Hosting or any sub-folder.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL || DEFAULT_SITE_URL;
  return {
    base: './',
    plugins: [siteUrlInHtml(siteUrl), react(), tailwindcss(), seoFiles(siteUrl)],
    define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) },
    build: {
      target: 'es2020',
      cssCodeSplit: false,
      assetsInlineLimit: 0,
    },
  };
});
