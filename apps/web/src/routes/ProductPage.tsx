'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LISTINGS, USERS, IMG, grosze, conditionLabel } from '@modamarket/shared';
import { Icon, type IconName } from '../components/ui/Icon';
import { Avatar, Button } from '../components/ui';

const TRUST: { icon: IconName; label: string }[] = [
  { icon: 'shield', label: 'Ochrona kupującego' },
  { icon: 'truck', label: 'Śledzona przesyłka' },
  { icon: 'box', label: 'Zwroty 14 dni' },
];

const CAT_LABEL: Record<string, string> = {
  'odziez-damska': 'Odzież damska',
  'odziez-meska': 'Odzież męska',
  'obuwie': 'Obuwie',
  'torebki': 'Torebki',
  'akcesoria': 'Akcesoria',
  'bizuteria': 'Biżuteria',
};

export function ProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const p = LISTINGS.find((l) => l.id === params.id) ?? LISTINGS[0];
  const seller = USERS[0];
  const gallery = [p.imageUrl, IMG.blazer, IMG.trench, IMG.sneaker, IMG.nb];

  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const details: { icon: IconName; label: string; value: string }[] = [
    { icon: 'shield', label: 'Stan', value: conditionLabel(p.condition) },
    { icon: 'hanger', label: 'Rozmiar', value: p.size ?? 'Uniwersalny' },
    { icon: 'tag', label: 'Kolor', value: p.color ?? '—' },
    { icon: 'bag', label: 'Kategoria', value: CAT_LABEL[p.categorySlug] ?? '—' },
    { icon: 'crown', label: 'Marka', value: p.brand ?? '—' },
    { icon: 'refresh', label: 'Materiał', value: 'Tekstylia' },
  ];

  return (
    <div>
      {/* ===================== MOBILE ===================== */}
      <div className="md:hidden">
        {/* zdjęcie główne */}
        <div className="relative aspect-[4/3] bg-gold-soft bg-cover bg-center" style={{ backgroundImage: `url('${gallery[active]}')` }}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-pill bg-white/92 flex items-center justify-center shadow-sm"><Icon name="heart" size={18} className="text-ink" /></button>
        </div>

        {/* miniatury */}
        <div className="flex gap-2.5 px-4 py-3 overflow-x-auto no-scrollbar">
          {gallery.map((src, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-[68px] h-[68px] rounded-xl bg-gold-soft bg-cover bg-center shrink-0 ${i === active ? 'ring-2 ring-gold' : 'border border-line'}`} style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>

        <div className="px-4 pb-6">
          {/* nagłówek */}
          <div className="text-center">
            <div className="text-[12px] tracking-[0.18em] uppercase text-gold font-bold">{p.brand}</div>
            <h1 className="font-serif text-[26px] font-semibold text-ink mt-1">{p.title}</h1>
            <div className="text-[13px] text-muted mt-1">{conditionLabel(p.condition)} · {p.size ? `Rozmiar ${p.size}` : 'Uniwersalny'}{p.color ? ` · ${p.color}` : ''}</div>
            <div className="font-serif text-[28px] font-bold text-ink mt-3">{grosze(p.price)}</div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mt-5">
            <button onClick={() => router.push('/platnosc')} className="flex-1 btn-dark py-3.5 text-white font-semibold rounded-pill">Kup teraz</button>
            <button onClick={() => router.push('/kup-w-zespole')} className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-pill border border-gold text-ink font-semibold"><Icon name="users" size={17} className="text-gold" /> Kup w grupie</button>
          </div>

          {/* Detale */}
          <div className="card-surface p-4 mt-6">
            <h3 className="font-serif text-lg font-semibold text-ink mb-3">Detale</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {details.map((d) => (
                <div key={d.label} className="flex items-center gap-2.5 border border-line rounded-xl px-3 py-2.5">
                  <Icon name={d.icon} size={17} className="text-gold shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[11px] text-muted leading-tight">{d.label}</div>
                    <div className="text-[13px] font-semibold text-ink truncate">{d.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Opis */}
          <div className="mt-6">
            <h3 className="font-serif text-lg font-semibold text-ink mb-2">Opis</h3>
            <p className={`text-sm leading-relaxed text-ink-soft ${expanded ? '' : 'line-clamp-2'}`}>
              Klasyczny produkt {p.brand} w ponadczasowej, {p.color?.toLowerCase() ?? 'uniwersalnej'} kolorystyce. Wygodny, lekki i idealny na co dzień. Wysokiej jakości materiały zapewniają trwałość i komfort. Oryginalny, sprawdzony przez moderację ModaMarket. Wysyłka w 24h.
            </p>
            <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-[13px] font-semibold text-gold mt-1.5">
              {expanded ? 'Pokaż mniej' : 'Pokaż więcej'} <Icon name={expanded ? 'chevronDown' : 'chevronRight'} size={14} className={expanded ? 'rotate-180' : ''} />
            </button>
          </div>

          {/* Sprzedawca */}
          <div className="card-surface p-3.5 mt-6 flex items-center gap-3">
            <Avatar name={seller.displayName} src={seller.avatarUrl} size={48} />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-ink">{seller.displayName}</div>
              <div className="text-[12px] text-muted flex items-center gap-1"><Icon name="star" size={12} className="text-gold" fill="currentColor" /> {seller.ratingAvg} · {seller.ratingCount} opinie</div>
              <div className="text-[12px] text-gold font-medium flex items-center gap-1 mt-0.5"><Icon name="shield" size={12} /> Zweryfikowany sprzedawca</div>
            </div>
            <button onClick={() => router.push('/wiadomosci')} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-pill border border-line text-[13px] font-semibold text-ink"><Icon name="chat" size={15} /> Napisz</button>
          </div>

          {/* Zaufanie */}
          <div className="flex border-t border-line mt-6 pt-4">
            {TRUST.map((t) => (
              <div key={t.label} className="flex-1 flex flex-col items-center gap-1 text-center">
                <span className="text-gold"><Icon name={t.icon} size={18} /></span>
                <span className="text-[11px] text-muted leading-tight px-1">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden md:block w-full max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="relative aspect-[4/5] rounded-2xl bg-gold-soft bg-cover bg-center" style={{ backgroundImage: `url('${gallery[active]}')` }}>
              <button onClick={() => router.back()} className="absolute top-4 left-4 w-10 h-10 rounded-pill bg-white/92 flex items-center justify-center"><Icon name="arrowLeft" size={18} /></button>
              <button className="absolute top-4 right-4 w-10 h-10 rounded-pill bg-white/92 flex items-center justify-center"><Icon name="heart" size={18} className="text-ink" /></button>
            </div>
            <div className="flex gap-3 mt-3">
              {gallery.map((src, i) => (
                <button key={i} onClick={() => setActive(i)} className={`w-20 h-20 rounded-xl bg-gold-soft bg-cover bg-center ${i === active ? 'ring-2 ring-gold' : 'border border-line'}`} style={{ backgroundImage: `url('${src}')` }} />
              ))}
            </div>
          </div>

          <div>
            <div className="text-[12px] tracking-widest uppercase text-gold font-bold">{p.brand}</div>
            <h1 className="font-serif text-4xl font-semibold my-1.5 text-ink">{p.title}</h1>
            <div className="text-muted text-sm">{conditionLabel(p.condition)} · {p.size ? `Rozmiar ${p.size}` : 'Uniwersalny'}{p.color ? ` · ${p.color}` : ''}</div>
            <div className="font-serif text-[34px] font-bold my-4 text-ink">{grosze(p.price)}</div>

            <div className="flex gap-3 mb-6">
              <button onClick={() => router.push('/platnosc')} className="btn-dark px-8 py-3.5 text-white font-semibold rounded-pill">Kup teraz</button>
              <button onClick={() => router.push('/kup-w-zespole')} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-pill border border-gold text-ink font-semibold"><Icon name="users" size={18} className="text-gold" /> Kup w grupie</button>
            </div>

            <div className="card-surface p-5 mb-5">
              <h3 className="font-serif text-lg font-semibold text-ink mb-3">Detale</h3>
              <div className="grid grid-cols-2 gap-3">
                {details.map((d) => (
                  <div key={d.label} className="flex items-center gap-2.5 border border-line rounded-xl px-3.5 py-3">
                    <Icon name={d.icon} size={18} className="text-gold shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[11px] text-muted">{d.label}</div>
                      <div className="text-sm font-semibold text-ink truncate">{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="font-serif text-lg font-semibold text-ink mb-2">Opis</h3>
            <p className="text-sm leading-relaxed text-ink-soft mb-5">Klasyczny produkt {p.brand} w ponadczasowej kolorystyce. Wygodny, lekki i idealny na co dzień. Wysokiej jakości materiały zapewniają trwałość i komfort. Oryginalny, sprawdzony przez moderację ModaMarket.</p>

            <div className="card-surface p-4 flex items-center gap-3">
              <Avatar name={seller.displayName} src={seller.avatarUrl} size={48} />
              <div className="flex-1">
                <div className="font-semibold text-ink">{seller.displayName}</div>
                <div className="text-xs text-muted flex items-center gap-1"><Icon name="star" size={12} className="text-gold" fill="currentColor" /> {seller.ratingAvg} · {seller.ratingCount} opinie · <span className="text-gold">Zweryfikowany</span></div>
              </div>
              <Button variant="ghost" onClick={() => router.push('/wiadomosci')}><Icon name="chat" size={18} /> Wyślij wiadomość</Button>
            </div>

            <div className="flex border-t border-line mt-6 pt-4">
              {TRUST.map((t) => (
                <div key={t.label} className="flex-1 flex flex-col items-center gap-1 text-center">
                  <span className="text-gold"><Icon name={t.icon} size={18} /></span>
                  <span className="text-[11px] text-muted">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
