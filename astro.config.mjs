import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://missglamour.com.br',
  output: 'static',
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
  // gera /sitemap-index.xml com todas as páginas (home, /profissionais, /natal)
  integrations: [sitemap({ changefreq: 'weekly', lastmod: new Date() })],
});
