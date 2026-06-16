'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { grosze, conditionLabel, type Listing } from '@modamarket/shared';
import { Icon } from '../ui/Icon';
import { Badge } from '../ui';

export function ProductCard({ p }: { p: Listing }) {
  const [fav, setFav] = useState(false);
  const router = useRouter();
  return (
    <div className="card-surface overflow-hidden cursor-pointer transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(40,30,20,0.10)]" onClick={() => router.push(`/produkt/${p.id}`)}>
      <div className="relative aspect-square bg-gold-soft bg-cover bg-center" style={{ backgroundImage: `url('${p.imageUrl}')` }}>
        {p.verified && <span className="absolute top-2.5 left-2.5"><Badge tone="dark"><Icon name="check" size={11} /> Zweryfikowane</Badge></span>}
        <button
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-pill bg-white/92 flex items-center justify-center"
          onClick={(e) => { e.stopPropagation(); setFav(!fav); }}
        >
          <Icon name="heart" size={16} className={fav ? 'text-danger' : 'text-ink'} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="px-4 pt-3 pb-4">
        <div className="text-[11px] font-bold uppercase tracking-wide text-gold">{p.brand}</div>
        <div className="text-[15px] font-medium mt-1 mb-1.5 text-ink">{p.title}</div>
        <div className="text-xs text-muted mb-2">{p.size ? `Rozm. ${p.size} · ` : ''}{conditionLabel(p.condition)}</div>
        <div className="font-serif text-[19px] font-bold text-ink">{grosze(p.price)}</div>
      </div>
    </div>
  );
}

/** Karta produktu w stylu desktop (makiety web Home / „Polecane oferty").
 *  oldPrice (w groszach) opcjonalnie pokazuje rabat: przekreślona cena + „-X%". */
export function ShopCard({ p, oldPrice }: { p: Listing; oldPrice?: number }) {
  const [fav, setFav] = useState(false);
  const router = useRouter();
  const pct = oldPrice && oldPrice > p.price ? Math.round((1 - p.price / oldPrice) * 100) : 0;
  return (
    <div className="group cursor-pointer" onClick={() => router.push(`/produkt/${p.id}`)}>
      <div className="relative aspect-[4/5] rounded-xl bg-gold-soft bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('${p.imageUrl}')` }}>
        {pct > 0 && <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-danger px-2 py-1 rounded-pill">-{pct}%</span>}
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-pill bg-white/90 flex items-center justify-center shadow-sm"
          onClick={(e) => { e.stopPropagation(); setFav(!fav); }}
        >
          <Icon name="heart" size={16} className={fav ? 'text-danger' : 'text-ink'} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="pt-3">
        <div className="text-[14px] font-medium text-ink leading-snug line-clamp-1">{p.title}</div>
        <div className="text-[12px] text-muted">{p.brand}</div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-semibold text-ink">{grosze(p.price)}</span>
          {pct > 0 && <span className="text-[12px] text-muted line-through">{grosze(oldPrice!)}</span>}
        </div>
      </div>
    </div>
  );
}

/** Wariant siatkowy 2-kolumnowy z makiety „Szukaj" (serce + ikona koszyka). */
export function ProductTile({ p }: { p: Listing }) {
  const router = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => router.push(`/produkt/${p.id}`)}>
      <div className="relative aspect-[3/4] rounded-lg bg-gold-soft bg-cover bg-center" style={{ backgroundImage: `url('${p.imageUrl}')` }}>
        <button className="absolute top-2 right-2 w-8 h-8 rounded-pill bg-white/92 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
          <Icon name="heart" size={15} className="text-ink" />
        </button>
      </div>
      <div className="text-[13px] font-medium mt-2 leading-tight text-ink line-clamp-2">{p.title}</div>
      <div className="text-[11px] text-muted">{p.brand}</div>
      <div className="flex items-center justify-between mt-0.5">
        <span className="font-semibold text-ink text-sm">{grosze(p.price)}</span>
        <span className="text-gold"><Icon name="tag" size={16} /></span>
      </div>
    </div>
  );
}
