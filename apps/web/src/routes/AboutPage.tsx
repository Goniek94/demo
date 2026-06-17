'use client';
import { useRouter } from 'next/navigation';
import { Icon, type IconName } from '../components/ui/Icon';

const TRUST: { i: IconName; t: string }[] = [
  { i: 'award', t: 'Autentyczne produkty' },
  { i: 'users', t: 'Sprawdzona społeczność' },
  { i: 'shield', t: 'Bezpieczne transakcje' },
];

const FEATURES: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'award', title: 'Autentyczność', desc: 'Każdy produkt jest opisany rzetelnie, a sprzedawcy budują reputację w oparciu o zaufanie i uczciwość.' },
  { icon: 'shield', title: 'Bezpieczne zakupy', desc: 'Bezpieczne płatności, ochrona kupujących i wsparcie zespołu na każdym etapie transakcji.' },
  { icon: 'users', title: 'Społeczność premium', desc: 'Dołącz do społeczności miłośników mody premium. Wymieniaj się doświadczeniami i inspiracjami.' },
];

const STEPS: { n: string; icon: IconName; title: string; desc: string }[] = [
  { n: '01', icon: 'tag', title: 'Wystaw', desc: 'Dodaj ogłoszenie w kilka minut. Opisz produkt, dodaj zdjęcia i ustal cenę.' },
  { n: '02', icon: 'bag', title: 'Sprzedaj', desc: 'Zainteresowani kupują, Ty otrzymujesz płatność szybko i bezpiecznie.' },
  { n: '03', icon: 'shield', title: 'Kupuj z zaufaniem', desc: 'Przeglądaj tysiące ofert premium i kupuj od sprawdzonych sprzedawców.' },
];

const STATS: { icon: IconName; value: string; label: string; sub: string }[] = [
  { icon: 'hanger', value: '10 000+', label: 'OFERT', sub: 'Wyselekcjonowane produkty premium' },
  { icon: 'users', value: '2 500+', label: 'UŻYTKOWNIKÓW', sub: 'Aktywna społeczność miłośników mody' },
  { icon: 'star', value: '4,9/5', label: 'ŚREDNIA OCEN', sub: 'Na podstawie opinii użytkowników' },
];

export function AboutPage() {
  const router = useRouter();
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* hero */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
        <div>
          <div className="flex items-center gap-3 mb-5"><span className="text-[12px] tracking-[0.2em] font-semibold text-gold">O NAS</span><span className="w-10 h-px bg-gold/50" /></div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-ink leading-[1.08] mb-6">Moda premium<br />zaufana na nowo.</h1>
          <p className="text-ink-soft text-base md:text-lg leading-relaxed max-w-xl mb-8">ModaMarket to marketplace mody premium, który łączy pasję do stylu z zaufaniem i bezpieczeństwem. Kupuj i sprzedawaj autentyczne ubrania, obuwie, torebki i akcesoria od sprawdzonych użytkowników.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {TRUST.map((b) => <span key={b.t} className="flex items-center gap-2 text-[14px] text-ink-soft"><Icon name={b.i} size={17} className="text-gold" />{b.t}</span>)}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gold-soft">
          <img src="/hero1.png" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* cechy */}
      <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-16 md:mb-20">
        {FEATURES.map((f) => (
          <div key={f.title} className="card-surface p-6 md:p-7">
            <span className="w-14 h-14 rounded-pill bg-gold-soft text-gold flex items-center justify-center mb-4"><Icon name={f.icon} size={24} /></span>
            <h3 className="font-serif text-xl font-semibold text-ink mb-2">{f.title}</h3>
            <p className="text-sm text-ink-soft leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* jak to działa */}
      <div className="text-center mb-8"><span className="text-[12px] tracking-[0.2em] font-semibold text-gold">— JAK TO DZIAŁA —</span></div>
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16 md:mb-20">
        {STEPS.map((s) => (
          <div key={s.n} className="flex items-start gap-4">
            <span className="w-16 h-16 rounded-pill bg-gold-soft text-gold flex items-center justify-center shrink-0"><Icon name={s.icon} size={26} /></span>
            <div>
              <div className="font-serif text-2xl font-bold"><span className="text-gold/60">{s.n}</span> <span className="text-ink ml-1">{s.title}</span></div>
              <p className="text-sm text-ink-soft leading-relaxed mt-1.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* statystyki */}
      <div className="rounded-2xl border border-line px-6 md:px-10 py-8 grid sm:grid-cols-3 gap-6 mb-12" style={{ background: '#F6F1E8' }}>
        {STATS.map((st) => (
          <div key={st.label} className="flex items-center gap-4 justify-center sm:justify-start">
            <span className="w-14 h-14 rounded-pill bg-surface text-gold border border-gold/20 flex items-center justify-center shrink-0"><Icon name={st.icon} size={24} /></span>
            <div><div className="font-serif text-2xl font-bold text-ink">{st.value} <span className="text-[11px] font-semibold tracking-wide text-muted ml-1">{st.label}</span></div><div className="text-[12px] text-muted">{st.sub}</div></div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="card-surface px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div><h2 className="font-serif text-2xl font-semibold text-ink">Gotowa na coś wyjątkowego?</h2><p className="text-sm text-ink-soft mt-1">Odkryj świat mody premium lub dołącz do naszej społeczności sprzedawców.</p></div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button onClick={() => router.push('/szukaj')} className="px-6 py-3.5 rounded-pill border border-ink text-ink font-semibold hover:bg-ink hover:text-white transition-colors">Przeglądaj ogłoszenia</button>
          <button onClick={() => router.push('/sprzedaj')} className="btn-gold px-6 py-3.5 text-white font-semibold">Dodaj ogłoszenie</button>
        </div>
      </div>
    </div>
  );
}
