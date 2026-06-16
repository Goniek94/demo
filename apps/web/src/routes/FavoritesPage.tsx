'use client';
import { useRouter } from 'next/navigation';
import { FAVORITES, grosze } from '@modamarket/shared';
import { Icon } from '../components/ui/Icon';

export function FavoritesPage() {
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 pt-4 md:pt-6">
      <h1 className="font-serif text-2xl font-semibold text-ink flex items-center gap-2">
        <button className="md:hidden" onClick={() => router.back()}><Icon name="arrowLeft" size={20} /></button>
        Ulubione
      </h1>
      <p className="text-sm text-muted mb-5 mt-1">Masz {FAVORITES.length} zapisanych ofert</p>

      <div className="space-y-3">
        {FAVORITES.map((p) => (
          <div key={p.id} className="card-surface p-3 flex gap-3 items-center cursor-pointer" onClick={() => router.push(`/produkt/${p.id}`)}>
            <div className="w-20 h-20 rounded-lg bg-gold-soft bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${p.imageUrl}')` }} />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-ink truncate">{p.title} {p.brand}</div>
              <div className="text-xs text-muted">{p.brand}</div>
              <div className="font-bold text-ink mt-0.5">{grosze(p.price)}</div>
              <div className="text-[11px] text-muted mt-0.5">{p.size ? `Rozmiar ${p.size}  ` : ''}{p.color ? `Kolor: ${p.color}` : ''}</div>
            </div>
            <div className="flex flex-col items-center gap-3 pr-1" onClick={(e) => e.stopPropagation()}>
              <button><Icon name="heart" size={20} className="text-danger" fill="currentColor" /></button>
              <button><Icon name="trash" size={18} className="text-muted" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
