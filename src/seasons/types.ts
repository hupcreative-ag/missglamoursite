export interface Product {
  name: string;
  detail: string;
  /** Texto de preço como no catálogo. null = valor sob consulta. */
  price: string | null;
  voltage?: '127V' | 'Bivolt';
  image: string;
  /** Marca a peça como esgotada (continua na vitrine, mas sem pedido). */
  soldOut?: boolean;
}

export interface Category {
  id: string;
  kicker: string;
  title: string;
  lead: string;
  products: Product[];
}

export interface Catalog {
  slug: string;
  title: string;
  intro: string;
  categories: Category[];
}

export interface Season {
  id: string;
  name: string;
  /** Tema visual aplicado em <body data-season>. Definido em global.css. */
  theme: string;
  /** Faixa fina no topo do site. */
  ribbon: { text: string; cta: string; href: string };
  /** Sobrescreve o hero do site base. */
  hero: { title: string[]; lead: string; badge?: string };
  /** Bloco da campanha na home. */
  feature: {
    title: string;
    lead: string;
    honesty: string;
    countdownTo?: string; // ISO, horário de Salvador
    countdownLabel?: string;
    image: string;
    perks: { title: string; text: string }[];
  };
  /**
   * Banner decorativo da página de links da bio (/links). Só aparece quando a campanha
   * tem catálogo ligado (showCatalog) e leva direto pra página do catálogo.
   * A decoração (luzes, bandeirinhas, confete, morcegos…) vem do `theme`:
   * natal · sao-joao · carnaval · halloween. Outro tema usa um brilho genérico.
   */
  bio?: {
    kicker: string;
    title: string;
    text: string;
    cta: string;
    /** Caminho em /public. Foto escura/contrastada funciona melhor. */
    image?: string;
    imageAlt?: string;
  };
  /** Destaques (nomes de imagem do catálogo) para o carrossel da home. */
  highlights?: string[];
  catalog?: Catalog;
}
