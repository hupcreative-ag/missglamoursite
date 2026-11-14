import { activeSeason, showCatalog } from '../config/site';
import type { Season } from './types';
import natal2026 from './natal-2026';

/** Registre aqui cada campanha criada em src/seasons/. */
const seasons: Record<string, Season> = {
  [natal2026.id]: natal2026,
};

export const season: Season | null = activeSeason ? seasons[activeSeason] ?? null : null;
export const catalog = showCatalog && season?.catalog ? season.catalog : null;

export function findProduct(image: string) {
  for (const c of catalog?.categories ?? []) {
    const p = c.products.find((p) => p.image === image);
    if (p) return { ...p, category: c.title };
  }
  return null;
}

export type { Season };
