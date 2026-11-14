/**
 * MISS GLAMOUR · configuração central do site
 * ------------------------------------------------------------------
 * Tudo que muda com frequência mora aqui.
 *
 *  - activeSeason: qual campanha sazonal está no ar (ou null para o site base).
 *      Campanhas ficam em src/seasons/<id>.ts. Para trocar de época, crie o
 *      arquivo da nova campanha, registre em src/seasons/index.ts e troque o id.
 *  - showCatalog: liga/desliga a vitrine de produtos da campanha (seção na home
 *      + página /<catalogo>). A campanha precisa ter `catalog` definido.
 */
export const activeSeason: string | null = 'natal-2026';
export const showCatalog = true;

export const store = {
  name: 'Miss Glamour',
  tagline: 'A beleza que você merece!',
  url: 'https://missglamour.com.br',
  whatsapp: '5571996285221',
  whatsappLabel: '(71) 99628-5221',
  instagram: 'missglamourav7',
  /** Endereço idêntico ao perfil da loja no Google (Google Meu Negócio). Não alterar sem atualizar lá também. */
  address: {
    street: 'Av. Sete de Setembro, 624 - 216',
    district: 'Centro',
    city: 'Salvador',
    state: 'BA',
    postalCode: '40060-001',
    reference: 'Perto da Praça da Piedade',
  },
  geo: { lat: -12.9829622, lng: -38.5156011 },
  /** Link direto pro perfil da loja no Google Maps */
  mapsUrl: 'https://maps.google.com/?cid=2729939255608775218',
  mapsEmbed: 'https://www.google.com/maps?q=-12.9829622,-38.5156011&z=17&output=embed',
  /** 0 = domingo … 6 = sábado. null = horário especial. */
  hours: {
    0: null,
    1: [8, 18],
    2: [8, 18],
    3: [8, 18],
    4: [8, 18],
    5: [8, 18],
    6: [8, 16],
  } as Record<number, [number, number] | null>,
  hoursLabel: [
    { days: 'Segunda a sexta', time: '8h às 18h' },
    { days: 'Sábado', time: '8h às 16h' },
    { days: 'Domingos e feriados', time: 'Horário especial' },
  ],
  /** Pedidos feitos até este horário saem no mesmo dia. */
  sameDayCutoff: 10,
  deliveryAreas: ['Salvador', 'Lauro de Freitas', 'Simões Filho'],
};

/** Monta um link de WhatsApp com mensagem pronta. */
export function wa(message?: string) {
  const base = `https://wa.me/${store.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Mesmo formato do Google: Av. Sete de Setembro, 624 - 216 - Centro, Salvador - BA, 40060-001 */
export const fullAddress = `${store.address.street} - ${store.address.district}, ${store.address.city} - ${store.address.state}, ${store.address.postalCode}`;
