'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LISTINGS, grosze, conditionLabel, type Listing } from '@modamarket/shared';
import { Icon } from '../components/ui/Icon';
import { ShopCard } from '../components/product/ProductCard';

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4 border-b border-line last:border-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-semibold text-ink">{title}</span>
        <Icon name="chevronDown" size={15} className="text-muted" />
      </div>
      {children}
    </div>
  );
}

function Check({ label, checked }: { label: string; checked?: boolean }) {
  return (
    <label className="flex items-center gap-2.5 py-1 text-[13px] text-ink-soft cursor-pointer">
      <span className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-gold border-gold text-white' : 'border-line'}`}>
        {checked && <Icon name="check" size={11} />}
      </span>
      {label}
    </label>
  );
}

const COLORS = ['#1E1B16', '#6B4A2B', '#9A6B3F', '#C9A24B', '#F2E9D5', '#5B6650'];

/* ---- konfiguracja filtrów mobilnych (z realnych danych) ---- */
const FILTER_CATS: { name: string; slug: string; subs: string[] }[] = [
  { name: 'Odzież damska', slug: 'odziez-damska', subs: ['Sukienki', 'Bluzy', 'Spódnice', 'Marynarki', 'Płaszcze'] },
  { name: 'Odzież męska', slug: 'odziez-meska', subs: ['Koszule', 'Bluzy', 'Spodnie', 'Marynarki', 'Kurtki'] },
  { name: 'Odzież dziecięca', slug: 'odziez-dziecieca', subs: ['Body', 'Bluzy', 'Spodnie', 'Sukienki', 'Kurtki'] },
  { name: 'Obuwie', slug: 'obuwie', subs: ['Sneakersy', 'Botki', 'Szpilki', 'Sandały'] },
  { name: 'Torebki', slug: 'torebki', subs: ['Na ramię', 'Crossbody', 'Shopperki', 'Kopertówki'] },
  { name: 'Akcesoria', slug: 'akcesoria', subs: ['Paski', 'Czapki', 'Okulary', 'Szaliki'] },
  { name: 'Biżuteria', slug: 'bizuteria', subs: ['Naszyjniki', 'Kolczyki', 'Pierścionki'] },
];
const CAT_VALUE_TO_SLUG: Record<string, string> = {};
FILTER_CATS.forEach((c) => {
  CAT_VALUE_TO_SLUG[c.name] = c.slug;
  c.subs.forEach((s) => { if (!(s in CAT_VALUE_TO_SLUG)) CAT_VALUE_TO_SLUG[s] = c.slug; });
});

const uniq = (arr: (string | undefined)[]) => [...new Set(arr.filter(Boolean) as string[])];
const GROUPS: { key: string; options: string[] }[] = [
  { key: 'Kategoria', options: FILTER_CATS.map((c) => c.name) },
  { key: 'Rozmiar', options: uniq(LISTINGS.map((p) => p.size)) },
  { key: 'Kolor', options: uniq(LISTINGS.map((p) => p.color)) },
  { key: 'Stan', options: uniq(LISTINGS.map((p) => conditionLabel(p.condition))) },
  { key: 'Cena', options: ['do 100 zł', '100–300 zł', '300–700 zł', '700 zł+'] },
];
const SORTS = ['Trafność', 'Cena: rosnąco', 'Cena: malejąco', 'Najnowsze'];

function inPrice(priceGr: number, label: string) {
  const z = priceGr / 100;
  if (label === 'do 100 zł') return z < 100;
  if (label === '100–300 zł') return z >= 100 && z < 300;
  if (label === '300–700 zł') return z >= 300 && z < 700;
  if (label === '700 zł+') return z >= 700;
  return true;
}

/* ---- Mobile: karta wyniku ---- */
function MobileResult({ p }: { p: Listing }) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/produkt/${p.id}`)} className="card-surface overflow-hidden shadow-[0_6px_20px_rgba(40,30,20,0.05)]">
      <div className="relative aspect-[4/5] bg-gold-soft bg-cover bg-center" style={{ backgroundImage: `url('${p.imageUrl}')` }}>
        <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold bg-white/90 text-ink px-2 py-1 rounded-pill shadow-sm">{conditionLabel(p.condition)}</span>
        <button onClick={(e) => e.stopPropagation()} className="absolute top-2.5 right-2.5 w-9 h-9 rounded-pill bg-white/95 flex items-center justify-center shadow-sm">
          <Icon name="heart" size={16} className="text-ink" />
        </button>
      </div>
      <div className="p-3 text-center">
        <div className="font-serif text-[15px] font-bold text-ink leading-tight truncate">{p.title}</div>
        <div className="text-[12px] text-muted mt-0.5">{p.brand}</div>
        <div className="font-serif text-[17px] font-bold text-ink mt-1.5">{grosze(p.price)}</div>
      </div>
    </div>
  );
}

const TIMES = ['Dzisiaj, 09:20', 'Wczoraj, 20:15', '2 dni temu', '3 dni temu', '4 dni temu', 'Tydzień temu'];

/* ---- Mobile: wiersz listy (karta) ---- */
function ListRow({ p, i }: { p: Listing; i: number }) {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/produkt/${p.id}`)} className="card-surface p-3 flex gap-3.5 shadow-[0_4px_16px_rgba(40,30,20,0.04)]">
      <div className="w-[104px] h-[112px] rounded-xl bg-gold-soft bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${p.imageUrl}')` }} />
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-serif text-[16px] font-semibold text-ink leading-tight truncate">{p.title}</div>
            <div className="text-[13px] text-muted mt-0.5">{p.brand}</div>
          </div>
          <button onClick={(e) => e.stopPropagation()} className="w-9 h-9 rounded-pill border border-line flex items-center justify-center shrink-0 hover:border-gold transition-colors"><Icon name="heart" size={16} className="text-ink" /></button>
        </div>
        <span className="self-start text-[11px] font-semibold text-gold-deep bg-gold-soft/50 border border-gold/30 px-2.5 py-0.5 rounded-pill mt-1.5">{conditionLabel(p.condition)}</span>
        <div className="font-serif text-[18px] font-bold text-ink mt-1.5">{grosze(p.price)}</div>
        <div className="flex items-center justify-between mt-auto pt-1.5 text-[12px] text-muted">
          <span className="truncate">{p.size ?? 'One size'}{p.color ? ` · ${p.color}` : ''}</span>
          <span className="shrink-0">{TIMES[i % TIMES.length]}</span>
        </div>
      </div>
    </div>
  );
}

export function SearchPage() {
  const grid = LISTINGS.slice(0, 4);
  const more = LISTINGS.slice(0, 5);
  const chips = ['Torebki', 'Skóra', '50–1000 zł', 'Brązowy'];

  // stan filtrów mobilnych
  const [open, setOpen] = useState<string | null>(null);
  const [catOpen, setCatOpen] = useState<string | null>(null);
  const [sel, setSel] = useState<Record<string, string[]>>({});
  const [sort, setSort] = useState('Trafność');
  const [sortOpen, setSortOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const toggle = (group: string, value: string) =>
    setSel((prev) => {
      const cur = prev[group] ?? [];
      return { ...prev, [group]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });
  const activeCount = Object.values(sel).reduce((a, s) => a + s.length, 0);

  const results = useMemo(() => {
    let r = LISTINGS.filter((p) => {
      for (const g of GROUPS) {
        const s = sel[g.key];
        if (!s || !s.length) continue;
        if (g.key === 'Kategoria' && !s.some((n) => CAT_VALUE_TO_SLUG[n] === p.categorySlug)) return false;
        if (g.key === 'Rozmiar' && !s.includes(p.size ?? '')) return false;
        if (g.key === 'Kolor' && !s.includes(p.color ?? '')) return false;
        if (g.key === 'Stan' && !s.includes(conditionLabel(p.condition))) return false;
        if (g.key === 'Cena' && !s.some((l) => inPrice(p.price, l))) return false;
      }
      return true;
    });
    if (sort === 'Cena: rosnąco') r = [...r].sort((a, b) => a.price - b.price);
    else if (sort === 'Cena: malejąco') r = [...r].sort((a, b) => b.price - a.price);
    else if (sort === 'Najnowsze') r = [...r].sort((a, b) => b.id.localeCompare(a.id));
    return r;
  }, [sel, sort]);

  return (
    <div>
      {/* ===================== MOBILE ===================== */}
      <div className="md:hidden px-4 pt-3">
        {/* szukaj */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 bg-surface border border-line rounded-pill px-4 py-2.5">
            <Icon name="search" size={17} className="text-muted" />
            <input placeholder="Szukaj marek, produktów, stylów…" className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted" />
          </div>
          <button onClick={() => activeCount && setSel({})} className="relative w-11 rounded-pill bg-surface border border-line flex items-center justify-center text-ink shrink-0">
            <Icon name="sliders" size={18} />
            {activeCount > 0 && <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-pill bg-gold text-white text-[10px] font-bold flex items-center justify-center">{activeCount}</span>}
          </button>
        </div>

        {/* pigułki filtrów */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {GROUPS.map((g) => {
            const n = sel[g.key]?.length ?? 0;
            const isOpen = open === g.key;
            return (
              <button
                key={g.key}
                onClick={() => { setOpen(isOpen ? null : g.key); setSortOpen(false); }}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[13px] font-medium border transition-colors ${n > 0 ? 'bg-gold-soft border-gold text-ink' : 'bg-surface border-line text-ink'}`}
              >
                {g.key}{n > 0 && ` · ${n}`} <Icon name="chevronDown" size={14} className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            );
          })}
        </div>

        {/* rozwinięty panel opcji */}
        {open && (
          <div className="card-surface p-4 mt-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-ink">{open}</span>
              {(sel[open]?.length ?? 0) > 0 && <button onClick={() => setSel((p) => ({ ...p, [open]: [] }))} className="text-[12px] font-semibold text-gold">Wyczyść</button>}
            </div>
            {open === 'Kategoria' ? (
              <div className="space-y-2">
                {FILTER_CATS.map((c) => {
                  const checked = sel['Kategoria']?.includes(c.name);
                  const expanded = catOpen === c.name;
                  return (
                    <div key={c.slug} className="border border-line rounded-xl overflow-hidden">
                      <div onClick={() => setCatOpen(expanded ? null : c.name)} className={`flex items-center gap-2 px-3 py-2.5 text-[13px] cursor-pointer select-none ${checked ? 'text-ink font-semibold' : 'text-ink-soft'}`}>
                        <button onClick={(e) => { e.stopPropagation(); toggle('Kategoria', c.name); }} className={`w-5 h-5 rounded-pill border flex items-center justify-center shrink-0 ${checked ? 'bg-gold border-gold text-white' : 'border-line'}`} aria-label="Zaznacz">{checked && <Icon name="check" size={12} />}</button>
                        <span className="flex-1">{c.name}</span>
                        <Icon name="chevronDown" size={16} className={`text-muted transition-transform ${expanded ? 'rotate-180' : ''}`} />
                      </div>
                      {expanded && (
                        <div className="flex flex-wrap gap-2 px-3 pb-3 pt-1 bg-bg/40">
                          {c.subs.map((sub) => {
                            const sc = sel['Kategoria']?.includes(sub);
                            return (
                              <button key={sub} onClick={() => toggle('Kategoria', sub)} className={`inline-flex items-center gap-1 rounded-pill px-3 py-1.5 text-[12px] border transition-colors ${sc ? 'bg-ink text-white border-ink' : 'bg-surface text-ink-soft border-line'}`}>
                                {sc && <Icon name="check" size={11} />}{sub}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {GROUPS.find((g) => g.key === open)!.options.map((opt) => {
                  const checked = sel[open]?.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => toggle(open, opt)}
                      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-[13px] border transition-colors ${checked ? 'bg-ink text-white border-ink' : 'bg-surface text-ink-soft border-line'}`}
                    >
                      {checked && <Icon name="check" size={12} />}{opt}
                    </button>
                  );
                })}
              </div>
            )}
            <button onClick={() => setOpen(null)} className="btn-gold w-full py-2.5 text-white text-sm mt-4">Pokaż {results.length} wyników</button>
          </div>
        )}

        {/* licznik + widok + sort */}
        <div className="flex items-center justify-between mt-3 mb-4 relative">
          <span className="text-[13px] text-muted">{results.length} wyników</span>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-surface border border-line rounded-pill p-0.5">
              <button onClick={() => setView('grid')} className={`w-7 h-7 rounded-pill flex items-center justify-center ${view === 'grid' ? 'bg-gold-soft text-gold' : 'text-muted'}`}><Icon name="grid" size={15} /></button>
              <button onClick={() => setView('list')} className={`w-7 h-7 rounded-pill flex items-center justify-center ${view === 'list' ? 'bg-gold-soft text-gold' : 'text-muted'}`}><Icon name="list" size={15} /></button>
            </div>
            <button onClick={() => { setSortOpen((o) => !o); setOpen(null); }} className="flex items-center gap-1 text-[13px] text-ink">
              {sort} <Icon name="chevronDown" size={14} className={`text-muted transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {sortOpen && (
            <div className="absolute right-0 top-8 z-20 w-48 card-surface p-1.5 shadow-lg">
              {SORTS.map((s) => (
                <button key={s} onClick={() => { setSort(s); setSortOpen(false); }} className={`w-full text-left px-3 py-2 rounded-lg text-[13px] ${s === sort ? 'bg-gold-soft text-ink font-semibold' : 'text-ink-soft hover:bg-bg'}`}>{s}</button>
              ))}
            </div>
          )}
        </div>

        {/* wyniki */}
        {results.length === 0 ? (
          <div className="text-center py-12 text-muted text-sm">Brak wyników dla wybranych filtrów.<br /><button onClick={() => setSel({})} className="text-gold font-semibold mt-2">Wyczyść filtry</button></div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
            {results.map((p) => <MobileResult key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((p, i) => <ListRow key={p.id} p={p} i={i} />)}
          </div>
        )}
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden md:block w-full max-w-[1760px] mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-[240px_1fr] gap-8">
          <aside>
            <div className="card-surface p-4 sticky top-24">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-ink">Filtry</span>
                <button className="text-[12px] font-semibold text-gold">Wyczyść</button>
              </div>
              <FilterGroup title="Kategorie">
                <Check label="Torebki" checked />
                <Check label="Torebki crossbody" />
                <Check label="Shopperki" />
                <Check label="Na ramię" />
                <Check label="Kopertówki" />
                <button className="text-[12px] text-gold mt-1">Pokaż więcej</button>
              </FilterGroup>
              <FilterGroup title="Rozmiar">
                {['XS', 'S', 'M', 'L', 'XL'].map((s) => <Check key={s} label={s} checked={s === 'M'} />)}
              </FilterGroup>
              <FilterGroup title="Cena">
                <input type="range" className="w-full accent-gold" />
                <div className="flex justify-between text-[12px] text-muted mt-1"><span>50 zł</span><span>1000+ zł</span></div>
              </FilterGroup>
              <FilterGroup title="Kolor">
                <div className="flex gap-2 flex-wrap">
                  {COLORS.map((c) => <span key={c} className="w-6 h-6 rounded-pill border border-line" style={{ background: c }} />)}
                </div>
              </FilterGroup>
              <FilterGroup title="Materiał">
                <Check label="Skóra" checked />
                <Check label="Zamsz" />
                <Check label="Tkanina" />
                <Check label="Nylon" />
              </FilterGroup>
            </div>
          </aside>

          <div className="min-w-0">
            <h1 className="font-serif text-2xl font-semibold text-ink">Wyniki dla „torebka skórzana"</h1>
            <p className="text-sm text-muted mb-4">324 wyniki</p>

            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[13px] text-muted">Wybrane:</span>
                {chips.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 bg-surface border border-line rounded-pill px-3 py-1.5 text-[12px] text-ink">
                    {c} <button className="text-muted hover:text-danger"><Icon name="x" size={12} /></button>
                  </span>
                ))}
              </div>
              <button className="flex items-center gap-2 text-sm text-ink"><span className="text-muted">Sortuj:</span> Trafność <Icon name="chevronDown" size={14} /></button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              {grid.map((p) => <ShopCard key={p.id} p={p} />)}
            </div>

            <h2 className="font-serif text-xl font-semibold text-ink mb-4">Może Ci się spodobać</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {more.map((p) => <ShopCard key={'m' + p.id} p={p} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
