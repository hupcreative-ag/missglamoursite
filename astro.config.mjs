import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://missglamour.com.br',
  output: 'static',
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
});
