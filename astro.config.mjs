import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://missglamour.com.br',
  output: 'static',
  devToolbar: { enabled: false },
  // tudo em arquivo externo (sem script embutido): permite uma política de segurança (CSP) rígida
  // e deixa o navegador guardar em cache por 1 ano (ver public/_headers)
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  // gera /sitemap-index.xml com todas as páginas (home, /profissionais, /natal)
  integrations: [sitemap({ changefreq: 'weekly', lastmod: new Date(), filter: (page) => !page.includes('/404') })],
});
