/**
 * Fotos do site. Prioridade: fotos do ensaio profissional (pasta "Captações" no Drive).
 * Foto de celular só quando não existir outra opção.
 */
import type { IconName } from '../components/icon-names';

/** Fotos que passam ao fundo do hero (tingidas de azul) */
export const heroReel = Array.from({ length: 16 }, (_, i) => `/img/reel/r${String(i).padStart(2, '0')}.webp`);

export interface Photo { src: string; alt: string }
export interface ProLine { id: string; title: string; icon: IconName; img?: string; alt: string; items: string; gallery?: Photo[] }

/** Linhas pra profissional (home e /profissionais) */
export const proLines: ProLine[] = [
  { id: 'nail', title: 'Nail design', icon: 'polish', img: '/img/pro/nail.webp', alt: 'Esmalte em gel sendo aplicado com pincel', items: 'Gel, base, top, esmalte e mais' },
  { id: 'lash', title: 'Lash design', icon: 'lash', img: '/img/pro/lash.webp', alt: 'Bandeja de tufos de cílios para extensão', items: 'Cílios, tufos, lash lifting e mais' },
  { id: 'sobrancelha', title: 'Sobrancelha', icon: 'tweezers', img: '/img/pro/sobrancelha.webp', alt: 'Caixa de henna para sobrancelha', items: 'Henna, pinça, lápis e mais' },
  { id: 'maquiagem', title: 'Maquiagem', icon: 'brush', img: '/img/pro/maquiagem-paleta.webp', alt: 'Paleta de sombras nude na mão', items: 'Paleta, blush, gloss e mais' },
  { id: 'ferramentas', title: 'Alicates e ferramentas', icon: 'scissors', img: '/img/pro/ferramentas.webp', alt: 'Alicate de cutícula profissional na embalagem', items: 'Alicate, espátula, lixa e mais' },
  // fotos de produto dos sites oficiais das marcas de depilação vendidas na loja
  { id: 'depilacao', title: 'Depilação', icon: 'wax', img: '/img/pro/depilacao-produtos.webp', alt: 'Ceras depilatórias quentes, óleo pós-depilação e dolomita', items: 'Cera, aquecedor e mais' },
];

export interface Category { title: string; img: string; alt: string; href?: string; ask?: string; brands?: string }

/** Pra você: o que tem além dos insumos */
export const categories: Category[] = [
  { title: 'Maquiagem', img: '/img/cat/maquiagem.webp', alt: 'Delineadores coloridos na mão', ask: 'as maquiagens' },
  { title: 'Presilhas e laços', img: '/img/cat/presilhas.webp', alt: 'Cartela de presilhas de cabelo', ask: 'as presilhas e laços' },
  { title: 'Joias em aço', img: '/img/cat/joias.webp', alt: 'Anéis dourados nas mãos', ask: 'as joias em aço' },
  // foto de banco gratuito (Unsplash, licença livre p/ uso comercial): unsplash.com/photos/91f8cb8b0168
  { title: 'Brincos e acessórios', img: '/img/cat/acessorios.webp', alt: 'Brincos dourados em gota sobre seda branca', ask: 'os brincos e acessórios' },
  { title: 'Relógios', img: '/img/cat/relogios.webp', alt: 'Relógios de pulseira de couro', ask: 'os relógios' },
  { title: 'Perfumes', img: '/img/cat/perfumes.webp', alt: 'Frascos de perfume', ask: 'os perfumes' },
  // foto de produto do site oficial da Labotrat (marca vendida na loja)
  { title: 'Cuidados pessoais', img: '/img/cat/cuidados-labotrat.webp', alt: 'Kit de banho com sabonete líquido, hidratante e esfoliante de melancia', ask: 'os produtos de cuidados pessoais' },
  { title: 'Decoração de festa', img: '/img/natal/capa-velas-lg.webp', alt: 'Velas de Natal acesas', href: '#temporada' },
];

const g = (cat: string, alts: string[]): Photo[] => alts.map((alt, i) => ({ src: `/img/pro/g/${cat}-${i + 1}.webp`, alt }));

/** Fotos extras por categoria (galeria da página /profissionais) */
export const proGallery: Record<string, Photo[]> = {
  nail: g('nail', [
    'Esmalte em gel magnético sendo aplicado',
    'Linha de esmaltes coloridos com pincel',
    'Esmalte em gel olho de gato com amostra na unha',
    'Potes de gel sólido para unhas',
    'Pedrarias vermelhas para decoração de unhas',
    'Cartela de unhas postiças vermelhas',
  ]),
  lash: g('lash', [
    'Kit de lash lifting em três etapas',
    'Kit de lash lifting aberto com os frascos',
    'Kit de produtos para lash designer em caixa',
    'Espuma de limpeza para cílios',
    'Cartela de cílios postiços',
  ]),
  sobrancelha: g('sobrancelha', [
    'Caixas de henna para sobrancelha em várias cores',
    'Pinça profissional para sobrancelha na embalagem',
    'Pinça de precisão para design de sobrancelha',
  ]),
  maquiagem: g('maquiagem', [
    'Blush compacto na mão',
    'Lip oil vermelho',
    'Delineador com amostra no dorso da mão',
    'Máscara de cílios rosa',
    'Blush compacto em tom terroso',
    'Gloss labial vermelho',
  ]),
  depilacao: g('depilacao', [
    'Cera depilatória hidrossolúvel em pote',
    'Cera depilatória quente em confetes',
    'Refil de cera roll-on',
  ]),
  ferramentas: g('ferramentas', [
    'Tesoura de cutícula profissional na embalagem',
    'Tesoura de precisão para manicure',
    'Espátulas e pushers de aço',
    'Rolo de lixa e lixa de unha profissional',
  ]),
};

