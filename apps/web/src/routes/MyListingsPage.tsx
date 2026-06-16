'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IMG, grosze } from '@modamarket/shared';
import { Icon } from '../components/ui/Icon';
import { AccountLayout } from '../components/layout/AccountLayout';

type Group = 'Kupione' | 'Sprzedane';
type Progress = 'Zrealizowane' | 'W trakcie realizacji';

const ITEMS: { img: string; title: string; brand: string; price: number; group: Group; progress: Progress; meta: string }[] = [
  { img: IMG.trench, title: 'Trencz klasyczny ZARA', brand: 'ZARA', price: 19900, group: 'Sprzedane', progress: 'Zrealizowane', meta: 'Sprzedano 12.05.2024' },
  { img: IMG.bag, title: 'Torebka na ramię Mango', brand: 'MANGO', price: 15900, group: 'Sprzedane', progress: 'W trakcie realizacji', meta: 'Wysłano 5 dni temu' },
  { img: IMG.sneaker, title: 'Sneakersy retro Adidas', brand: 'ADIDAS', price: 21900, group: 'Sprzedane', progress: 'Zrealizowane', meta: 'Sprzedano 18.04.2024' },
  { img: IMG.dressW, title: 'Sukienka wieczorowa', brand: 'LIPSY', price: 12900, group: 'Kupione', progress: 'Zrealizowane', meta: 'Odebrano 02.05.2024' },
  { img: IMG.nuptse, title: 'Kurtka puchowa', brand: 'RESERVED', price: 24900, group: 'Kupione', progress: 'W trakcie realizacji', meta: 'W drodze' },
  { img: IMG.nb, title: 'New Balance 530', brand: 'NEW BALANCE', price: 29900, group: 'Kupione', progress: 'Zrealizowane', meta: 'Odebrano 20.04.2024' },
];

const TOP_TABS = ['Wszystkie', 'Kupione', 'Sprzedane'] as const;
type TopTab = typeof TOP_TABS[number];

// etykieta plakietki + ton koloru wg statusu
function badgeOf(it: typeof ITEMS[number]): { label: string; tone: string } {
  if (it.progress === 'W trakcie realizacji') return { label: 'W trakcie realizacji', tone: 'bg-gold-soft text-gold-deep' };
  if (it.group === 'Sprzedane') return { label: 'Sprzedane', tone: 'bg-success/12 text-success' };
  return { label: 'Kupione', tone: 'bg-[#E6EEF6] text-[#3B6CA8]' };
}

function ListingRow({ it }: { it: typeof ITEMS[number] }) {
  const b = badgeOf(it);
  return (
    <div className="card-surface p-3 flex gap-3 items-center cursor-pointer hover:border-gold/50 transition-colors">
      <div className="w-[84px] h-[104px] rounded-lg bg-gold-soft bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${it.img}')` }} />
      <div className="flex-1 min-w-0 self-stretch flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-serif text-[15px] font-semibold text-ink leading-tight truncate">{it.title}</div>
            <div className="text-[12px] text-muted uppercase tracking-wide mt-0.5">{it.brand}</div>
            <div className="font-serif text-[17px] font-bold text-ink mt-1">{grosze(it.price)}</div>
          </div>
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-pill whitespace-nowrap flex items-center gap-1.5 shrink-0 ${b.tone}`}>
            <span className="w-1.5 h-1.5 rounded-pill bg-current opacity-70" /> {b.label}
          </span>
        </div>
        <div className="mt-auto pt-2 flex items-center gap-1.5 text-[12px] text-muted">
          <Icon name="box" size={13} /> {it.meta}
        </div>
      </div>
      <Icon name="chevronRight" size={18} className="text-gold shrink-0" />
    </div>
  );
}

export function MyListingsPage() {
  const router = useRouter();
  const [top, setTop] = useState<TopTab>('Wszystkie');
  const [sub, setSub] = useState<Progress | 'all'>('all');

  const subTabs: { key: Progress | 'all'; label: string }[] =
    top === 'Kupione'
      ? [{ key: 'all', label: 'Kupione' }, { key: 'W trakcie realizacji', label: 'W trakcie realizacji' }]
      : top === 'Sprzedane'
      ? [{ key: 'all', label: 'Sprzedane' }, { key: 'W trakcie realizacji', label: 'W trakcie realizacji' }]
      : [];

  const selectTop = (t: TopTab) => { setTop(t); setSub('all'); };

  const items = ITEMS.filter((it) => {
    if (top === 'Wszystkie') return true;
    if (it.group !== top) return false;
    if (sub === 'all') return it.progress === 'Zrealizowane';
    return it.progress === sub;
  });

  return (
    <AccountLayout active="oferty">
      <h1 className="font-serif text-2xl md:text-[28px] font-semibold text-ink mb-4 md:mb-6">Moje ogłoszenia</h1>

      {/* zakładki główne */}
      <div className="card-surface p-1.5 flex gap-1 mb-3">
        {TOP_TABS.map((t) => (
          <button key={t} onClick={() => selectTop(t)} className={`flex-1 py-2 rounded-pill text-[13px] font-semibold transition-colors ${top === t ? 'bg-gold-soft text-gold-deep' : 'text-ink-soft hover:bg-bg'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* podzakładki (po wejściu w Kupione/Sprzedane) */}
      {subTabs.length > 0 && (
        <div className="flex gap-2 mb-5">
          {subTabs.map((st) => (
            <button key={st.label} onClick={() => setSub(st.key)} className={`px-4 py-1.5 rounded-pill text-[12px] font-semibold border transition-colors ${sub === st.key ? 'bg-ink text-white border-ink' : 'bg-surface text-ink-soft border-line hover:border-gold'}`}>
              {st.label}
            </button>
          ))}
        </div>
      )}
      {subTabs.length === 0 && <div className="mb-5" />}

      <div className="space-y-3 md:max-w-3xl">
        {items.length > 0 ? (
          items.map((it) => <ListingRow key={it.title} it={it} />)
        ) : (
          <div className="card-surface py-12 text-center text-muted text-sm">Brak pozycji w tej zakładce.</div>
        )}
      </div>

      <button onClick={() => router.push('/sprzedaj')} className="btn-gold w-full md:max-w-3xl py-3.5 text-white font-semibold mt-5">
        <Icon name="plus" size={18} /> Dodaj ogłoszenie
      </button>
    </AccountLayout>
  );
}
