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
- Conferir o pin do mapa (endereço do catálogo: Av. Sete de Setembro, 624, Ed. Totonia, Loja 002).
- Preços e fotos do catálogo vêm do PDF "Catálogo Natal 2026"; revisar antes de cada atualização de estoque.
