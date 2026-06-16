'use client';
import { useState, useRef, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { IMG, grosze } from '@modamarket/shared';
import { Icon, type IconName } from '../components/ui/Icon';
import { AccountLayout } from '../components/layout/AccountLayout';

const STEPS = ['Zdjęcia', 'Szczegóły', 'Cena i dostawa', 'Podsumowanie'];
const STANY = ['Nowy z metką', 'Nowy bez metki', 'Bardzo dobry', 'Dobry', 'Zadowalający'];

function Label({ children, req }: { children: ReactNode; req?: boolean }) {
  return <span className="block text-sm font-medium text-ink mb-2">{children}{req && <span className="text-gold"> *</span>}</span>;
}

function Select({ label, placeholder, req, options, swatchColor }: { label: string; placeholder: string; req?: boolean; options?: string[]; swatchColor?: string }) {
  const opts = options ?? ['Opcja A', 'Opcja B'];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  return (
    <div className="relative">
      <Label req={req}>{label}</Label>
      <div className="flex gap-2">
        <button type="button" onClick={() => setOpen((o) => !o)} className="input-base flex items-center justify-between gap-2 flex-1 text-left">
          <span className={`truncate ${value ? 'text-ink' : 'text-muted'}`}>{value || placeholder}</span>
          <Icon name="chevronDown" size={16} className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {swatchColor && <div className="w-12 rounded-lg border border-line shrink-0" style={{ background: swatchColor }} />}
      </div>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-30 cursor-default" aria-label="Zamknij" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 z-40 mt-1.5 card-surface p-1.5 shadow-[0_16px_40px_rgba(40,30,20,0.14)] max-h-60 overflow-y-auto">
            {opts.map((o) => (
              <button key={o} type="button" onClick={() => { setValue(o); setOpen(false); }} className={`w-full text-left px-3 py-2.5 rounded-lg text-[13px] transition-colors ${o === value ? 'bg-gold-soft text-ink font-semibold' : 'text-ink-soft hover:bg-bg'}`}>{o}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => {
        const done = i <= current;
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-pill flex items-center justify-center text-sm font-semibold ${done ? 'btn-gold text-white' : 'bg-surface border border-line text-muted'}`}>{i + 1}</div>
              <span className={`mt-2 text-[13px] whitespace-nowrap ${done ? 'text-ink font-medium' : 'text-muted'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-3 mb-6 ${i < current ? 'bg-gold' : 'bg-line'}`} />}
          </div>
        );
      })}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)} className={`w-11 h-6 rounded-pill p-0.5 shrink-0 transition-colors ${on ? 'bg-gold' : 'bg-line'}`}>
      <span className={`block w-5 h-5 rounded-pill bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  );
}

/* Wiersz-select (mobile): ikona + etykieta + wartość/placeholder + chevron, z rozwijaną listą */
function RowSelect({ icon, label, placeholder, options }: { icon: IconName; label: string; placeholder: string; options: string[] }) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState('');
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 border border-line rounded-xl px-3.5 py-3 bg-surface text-left">
        <Icon name={icon} size={18} className="text-ink-soft shrink-0" />
        <span className="text-[14px] text-ink leading-tight">{label}</span>
        <span className={`ml-auto pl-2 text-[13px] text-right truncate max-w-[55%] ${val ? 'text-ink font-medium' : 'text-muted'}`}>{val || placeholder}</span>
        <Icon name="chevronDown" size={16} className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-30 cursor-default" aria-label="Zamknij" onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 z-40 mt-1.5 card-surface p-1.5 shadow-[0_16px_40px_rgba(40,30,20,0.14)] max-h-60 overflow-y-auto">
            {options.map((o) => (
              <button key={o} type="button" onClick={() => { setVal(o); setOpen(false); }} className={`w-full text-left px-3 py-2.5 rounded-lg text-[13px] transition-colors ${o === val ? 'bg-gold-soft text-ink font-semibold' : 'text-ink-soft hover:bg-bg'}`}>{o}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const PHOTO_POOL = ['blazer', 'bag', 'hoodie', 'dressW', 'sneaker', 'nb', 'nuptse', 'trench', 'dress', 'belt'] as const;

export function SellPage() {
  const router = useRouter();
  const [stan, setStan] = useState(0);
  const [opis, setOpis] = useState('');
  const photos = [IMG.trench, IMG.blazer, IMG.dressW, IMG.trench];

  // stan formularza mobilnego
  const [mTitle, setMTitle] = useState('');
  const [mOpis, setMOpis] = useState('');
  const [protection, setProtection] = useState(true);
  const [negotiate, setNegotiate] = useState(false);
  const [mPhotos, setMPhotos] = useState<string[]>([IMG.blazer, IMG.bag, IMG.hoodie]);
  const addPhoto = () => setMPhotos((ps) => (ps.length >= 10 ? ps : [...ps, IMG[PHOTO_POOL[ps.length % PHOTO_POOL.length]]]));
  const removePhoto = (i: number) => setMPhotos((ps) => ps.filter((_, j) => j !== i));

  return (
    <AccountLayout active="dodaj">
      {/* ===================== MOBILE ===================== */}
      <div className="md:hidden -mt-2">
        {/* header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => router.back()} className="text-ink"><Icon name="arrowLeft" size={20} /></button>
          <h1 className="font-serif text-lg font-semibold text-ink flex-1 text-center pr-6">Dodaj ogłoszenie</h1>
        </div>

        {/* Zdjęcia (symulowane) */}
        <span className="block text-sm font-semibold text-ink mb-2">Zdjęcia</span>
        <div className="flex flex-wrap gap-2.5 mb-6">
          <button onClick={addPhoto} className="w-[84px] h-[84px] rounded-xl border-2 border-dashed border-gold/50 bg-gold-soft/40 flex flex-col items-center justify-center text-center shrink-0">
            <Icon name="camera" size={20} className="text-gold mb-1" />
            <span className="text-[10px] font-semibold text-ink leading-tight">Dodaj zdjęcia</span>
            <span className="text-[9px] text-muted">Maks. 10 zdjęć</span>
          </button>
          {mPhotos.map((src, i) => (
            <div key={i} className="relative w-[84px] h-[84px] rounded-xl bg-gold-soft bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${src}')` }}>
              <button onClick={() => removePhoto(i)} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-pill bg-ink text-white flex items-center justify-center shadow"><Icon name="x" size={11} /></button>
            </div>
          ))}
        </div>

        {/* Tytuł */}
        <span className="block text-sm font-semibold text-ink mb-2">Tytuł</span>
        <div className="input-base flex items-center gap-2 mb-5">
          <Icon name="tag" size={17} className="text-muted shrink-0" />
          <input value={mTitle} onChange={(e) => setMTitle(e.target.value)} className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted" placeholder="Wpisz tytuł ogłoszenia" />
        </div>

        {/* Opis — auto-rozwijany */}
        <span className="block text-sm font-semibold text-ink mb-2">Opis</span>
        <textarea
          value={mOpis}
          onChange={(e) => { setMOpis(e.target.value.slice(0, 2000)); const el = e.currentTarget; el.style.height = 'auto'; el.style.height = `${el.scrollHeight}px`; }}
          rows={3}
          className="input-base resize-none overflow-hidden min-h-[96px] mb-6"
          placeholder="Opisz produkt, jego stan, wymiary, materiał, itp."
        />

        {/* Cena */}
        <span className="block text-sm font-semibold text-ink mb-2">Cena</span>
        <div className="relative flex items-center mb-3">
          <input className="input-base pr-10" inputMode="numeric" placeholder="Wpisz cenę" />
          <span className="absolute right-4 text-sm text-muted">zł</span>
        </div>
        <label className="flex items-center justify-between mb-6 cursor-pointer">
          <span className="text-sm text-ink-soft">Cena do negocjacji</span>
          <Toggle on={negotiate} onChange={setNegotiate} />
        </label>

        {/* Pola szczegółów — wiersze */}
        <div className="space-y-2.5">
          <RowSelect icon="grid" label="Kategoria" placeholder="Wybierz kategorię" options={['Odzież damska', 'Odzież męska', 'Odzież dziecięca', 'Obuwie', 'Torebki', 'Akcesoria', 'Biżuteria']} />
          <RowSelect icon="tag" label="Marka" placeholder="Wybierz markę" options={['Zara', 'H&M', 'Nike', 'Adidas', 'New Balance', 'Mango', 'Gucci', 'Inna']} />
          <RowSelect icon="shield" label="Stan" placeholder="Wybierz stan" options={STANY} />
          <RowSelect icon="image" label="Kolor" placeholder="Wybierz kolor" options={['Beżowy', 'Czarny', 'Biały', 'Czerwony', 'Niebieski', 'Zielony', 'Brązowy']} />
          <RowSelect icon="hanger" label="Rozmiar" placeholder="Wybierz rozmiar" options={['XS', 'S', 'M', 'L', 'XL', '38', '40', '42', '44']} />
          <div className="flex items-center gap-3 border border-line rounded-xl px-3.5 py-3 bg-surface">
            <Icon name="sliders" size={18} className="text-ink-soft shrink-0" />
            <span className="text-[14px] text-ink shrink-0">Wymiary</span>
            <input className="flex-1 bg-transparent outline-none text-[13px] text-right placeholder:text-muted" placeholder="Podaj wymiary (np. dł. 60 cm, szer. 40 cm)" />
          </div>
          <RowSelect icon="box" label="Rozmiar przesyłki" placeholder="Wybierz rozmiar przesyłki" options={['Mała paczka', 'Średnia paczka', 'Duża paczka', 'Gabaryt']} />
        </div>

        {/* Ochrona kupujących */}
        <div className="flex items-center gap-2 bg-gold-soft/40 border border-line rounded-xl px-3.5 py-3 mt-4">
          <Icon name="shield" size={18} className="text-gold shrink-0" />
          <span className="flex-1 text-[13px] text-ink-soft">Chcę sprzedać z Ochroną Kupujących</span>
          <Toggle on={protection} onChange={setProtection} />
        </div>

        <button className="btn-gold w-full py-3.5 text-white font-semibold mt-6 mb-2">Opublikuj</button>
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden md:block">
      <h1 className="font-serif text-2xl md:text-[28px] font-semibold text-ink mb-7">Dodaj nowe ogłoszenie</h1>

      {/* Stepper */}
      <div className="card-surface px-6 md:px-10 py-6 mb-6">
        <Stepper current={0} />
      </div>

      {/* Zdjęcia + Szczegóły */}
      <div className="card-surface p-6 md:p-7 mb-6 grid lg:grid-cols-2 gap-7">
        {/* Zdjęcia */}
        <div>
          <h2 className="font-serif text-[17px] font-semibold text-ink mb-4">Zdjęcia produktu</h2>
          <button
            onClick={() => router.push('/sprzedaj/zdjecia')}
            className="w-full rounded-xl border-2 border-dashed border-line hover:border-gold transition-colors bg-bg/40 flex flex-col items-center justify-center text-center py-10 px-4"
          >
            <span className="w-12 h-12 rounded-pill bg-gold-soft text-gold flex items-center justify-center mb-3"><Icon name="bag" size={22} /></span>
            <span className="text-sm font-semibold text-ink">Przeciągnij zdjęcia tutaj<br />lub kliknij, aby dodać</span>
            <span className="text-xs text-muted mt-2">JPG, PNG do 10 MB (max. 10 zdjęć)</span>
          </button>
          <div className="flex flex-wrap gap-3 mt-4">
            {photos.map((src, i) => (
              <div key={i} className="relative w-[72px] h-[72px] rounded-lg bg-gold-soft bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }}>
                <button className="absolute -top-2 -right-2 w-5 h-5 rounded-pill bg-surface border border-line text-ink flex items-center justify-center shadow-sm"><Icon name="x" size={11} /></button>
              </div>
            ))}
            <button onClick={() => router.push('/sprzedaj/zdjecia')} className="w-[72px] h-[72px] rounded-lg border border-dashed border-line hover:border-gold flex items-center justify-center text-muted transition-colors">
              <Icon name="plus" size={18} />
            </button>
          </div>
        </div>

        {/* Szczegóły */}
        <div>
          <h2 className="font-serif text-[17px] font-semibold text-ink mb-4">Szczegóły produktu</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <Label req>Nazwa produktu</Label>
              <input className="input-base" placeholder="Np. Płaszcz wełniany oversize" />
            </label>
            <Select label="Kategoria" placeholder="Wybierz kategorię" req />
            <Select label="Marka" placeholder="Wybierz markę" req />
            <Select label="Rozmiar" placeholder="Wybierz rozmiar" req />
          </div>

          <div className="mt-4">
            <Label req>Stan produktu</Label>
            <div className="flex flex-wrap gap-2">
              {STANY.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setStan(i)}
                  className={`text-[13px] font-medium px-4 py-2 rounded-pill border transition-colors ${stan === i ? 'bg-gold-soft border-gold text-ink' : 'bg-surface border-line text-ink-soft hover:border-gold'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <label className="block mt-4">
            <Label req>Opis</Label>
            <textarea
              value={opis}
              onChange={(e) => setOpis(e.target.value.slice(0, 1000))}
              className="input-base h-32 resize-none"
              placeholder="Opisz produkt, jego stan, materiał, dopasowanie i inne istotne informacje…"
            />
            <span className="block text-right text-[11px] text-muted mt-1">{opis.length} / 1000</span>
          </label>
        </div>
      </div>

      {/* Cena + Dostawa + Podgląd */}
      <div className="card-surface p-6 md:p-7 mb-6 grid lg:grid-cols-3 gap-7">
        <div>
          <h2 className="font-serif text-[17px] font-semibold text-ink mb-4">Cena</h2>
          <label className="block">
            <Label req>Cena</Label>
            <div className="relative flex items-center">
              <input className="input-base pr-10" placeholder="0,00" />
              <span className="absolute right-4 text-sm text-muted">zł</span>
            </div>
          </label>
          <p className="text-xs text-muted mt-2">Zalecamy konkurencyjną cenę rynkową.</p>
        </div>

        <div>
          <h2 className="font-serif text-[17px] font-semibold text-ink mb-4">Dostawa</h2>
          <Select label="Sposób dostawy" placeholder="Wybierz sposób dostawy" req />
          <p className="flex items-center gap-1.5 text-xs text-muted mt-2"><Icon name="help" size={13} className="text-gold" /> Koszt dostawy określisz w kolejnym kroku.</p>
        </div>

        <div>
          <h2 className="font-serif text-[17px] font-semibold text-ink mb-4">Podgląd ogłoszenia</h2>
          <div className="flex gap-3">
            <div className="w-16 h-20 rounded-lg bg-gold-soft bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${IMG.trench}')` }} />
            <div className="min-w-0">
              <div className="text-sm font-medium text-ink leading-snug">Płaszcz wełniany oversize</div>
              <div className="text-xs text-muted mt-0.5">Marka</div>
              <div className="text-xs text-muted">Rozmiar · Stan</div>
              <div className="font-serif text-base font-bold text-ink mt-1">{grosze(0)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Akcje */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mb-8">
        <button className="px-7 py-3 rounded-pill border border-line text-ink font-semibold hover:border-gold transition-colors">Zapisz szkic</button>
        <button onClick={() => router.push('/platnosc')} className="btn-gold px-7 py-3 text-white">
          Dalej: Cena i dostawa <Icon name="arrowRight" size={17} />
        </button>
      </div>

      {/* Pasek zaufania */}
      <div className="border-t border-line pt-6 flex flex-wrap justify-center gap-x-10 gap-y-3 text-[13px] text-muted">
        {([
          { i: 'shield', t: 'Bezpieczne transakcje' },
          { i: 'check', t: 'Zweryfikowani sprzedawcy' },
          { i: 'lock', t: 'Ochrona kupujących' },
          { i: 'help', t: 'Wsparcie 24/7' },
        ] as { i: IconName; t: string }[]).map((b) => (
          <span key={b.t} className="flex items-center gap-2"><span className="text-gold"><Icon name={b.i} size={16} /></span>{b.t}</span>
        ))}
      </div>
      </div>
    </AccountLayout>
  );
}
