# Miss Glamour · site

Landing page / portal da Miss Glamour (Av. Sete de Setembro, Salvador). Astro estático, pronto para Cloudflare Pages.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera /dist
```

**Cloudflare Pages:** build command `npm run build`, output `dist`, Node 20+.

## Como o site é organizado

| Camada | Onde mexer |
|---|---|
| Dados da loja (WhatsApp, endereço, horários, áreas de entrega, Instagram) | `src/config/site.ts` |
| Campanha sazonal no ar (faixa do topo, título do hero, bloco da temporada) | `activeSeason` em `src/config/site.ts` |
| Vitrine/catálogo da campanha (seção na home + página `/natal`) | `showCatalog` em `src/config/site.ts` |
| Conteúdo de cada campanha | `src/seasons/<id>.ts` |
| Cores de cada tema | `body[data-season='<tema>']` em `src/styles/global.css` |

### Desligar o Natal (site base)
`activeSeason = null` → some a faixa, o hero volta para "Tudo pra sua bancada, entregue hoje." e o bloco de temporada sai.

### Só tirar o catálogo, mantendo a campanha
`showCatalog = false` → some a página `/natal` e o carrossel de destaques.

### Criar a próxima campanha (ex.: Carnaval)
1. Copie `src/seasons/natal-2026.ts` para `src/seasons/carnaval-2027.ts` e troque textos, `theme`, `countdownTo`, `highlights` e `catalog` (ou remova `catalog`).
2. Fotos em `public/img/<pasta>/` em `.webp`.
3. Registre em `src/seasons/index.ts`.
4. Se o tema tiver cores próprias, crie `body[data-season='carnaval'] { ... }` em `global.css`.
5. `activeSeason = 'carnaval-2027'`.

## Pendências antes de publicar
- Conferir com a loja: formas de pagamento (o FAQ cita crédito, débito, Pix e dinheiro), se há entrega aos sábados, horário de domingo/feriado.
- Endereço segue o perfil do Google: Av. Sete de Setembro, 624 - 216 - Centro, Salvador - BA, 40060-001. Se mudar no Google, mudar em `src/config/site.ts`.
- Preços e fotos do catálogo vêm do PDF "Catálogo Natal 2026"; revisar antes de cada atualização de estoque.

## Hospedagem, SEO e segurança
- **Hospedagem:** Cloudflare Pages, projeto `missglamoursite` (repo `hupcreative-ag/missglamoursite`, branch `main` publica sozinha). Domínio oficial `missglamour.com.br`; `www` redireciona 301 pro domínio (Redirect Rule no Cloudflare).
- **Cabeçalhos:** `public/_headers` (CSP, HSTS, X-Frame-Options, cache longo de `/_astro` e `/img`). Ao adicionar script ou serviço externo (ex.: pixel, mapa), liberar o domínio na CSP.
- **SEO:** sitemap automático (`@astrojs/sitemap`), `robots.txt`, imagens de compartilhamento `public/og.jpg` e `public/og-natal.jpg`, schema Store/WebSite no `Base.astro`. O endereço `.pages.dev` responde com `noindex`.
- **Cloudflare (painel):** Always Use HTTPS, TLS mínimo 1.2, TLS 1.3, Early Hints, HTTP/3, 0-RTT e Web Analytics ligados. Rocket Loader desligado (quebraria a CSP e as animações). Rastreadores de IA liberados (bom para aparecer em respostas de IA).
- **Endereço e horário:** iguais ao perfil do Google Meu Negócio. Se mudar um, mude o outro.
- **Trocar uma foto:** sempre salve com **nome novo** (ex.: `maquiagem-paleta.webp`) e atualize o caminho em `src/config/media.ts`. Imagens ficam 30 dias em cache no navegador e no Cloudflare; com o mesmo nome, a foto antiga continua aparecendo.
