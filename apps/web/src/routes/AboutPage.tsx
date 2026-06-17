'use client';
import { Icon, type IconName } from '../components/ui/Icon';
import { openAuth } from '../lib/auth';

const STATS: { value: string; label: string }[] = [
  { value: '12k+', label: 'Użytkowników' },
  { value: '98%', label: 'Pozytywnych ocen' },
  { value: '50k+', label: 'Transakcji' },
];

const FEATURES: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'award', title: 'Autentyczność', desc: 'Każdy produkt jest opisany rzetelnie, a sprzedawcy budują reputację w oparciu o zaufanie i uczciwość.' },
  { icon: 'shield', title: 'Bezpieczne zakupy', desc: 'Bezpieczne płatności, ochrona kupujących i wsparcie zespołu na każdym etapie transakcji.' },
  { icon: 'users', title: 'Społeczność premium', desc: 'Dołącz do społeczności miłośników mody premium. Wymieniaj się doświadczeniami i inspiracjami.' },
];

const STEPS: { n: string; title: string; desc: string }[] = [
  { n: '01', title: 'Wystaw lub znajdź', desc: 'Dodaj ogłoszenie w kilka minut albo przeglądaj sprawdzone oferty.' },
  { n: '02', title: 'Kup bezpiecznie', desc: 'Płatność chroniona, a środki trafiają do sprzedawcy po odbiorze.' },
  { n: '03', title: 'Buduj reputację', desc: 'Oceny i opinie tworzą zaufaną społeczność premium.' },
];

export function AboutPage() {
  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 md:px-8 py-12 md:py-16">
      {/* hero */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[12px] tracking-[0.25em] font-semibold text-gold">— O NAS —</span>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink leading-[1.1] mt-4 mb-5">Tworzymy modę,<br />której można ufać</h1>
        <p className="text-ink-soft text-base md:text-lg leading-relaxed">ModaMarket to miejsce, gdzie pasja do stylu spotyka się z bezpieczeństwem. Kupuj i sprzedawaj autentyczne ubrania, obuwie i akcesoria w społeczności sprawdzonych użytkowników.</p>
      </div>

      {/* statystyki */}
      <div className="grid grid-cols-3 max-w-xl mx-auto mt-12 mb-16 md:mb-20">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-bold text-gold">{s.value}</div>
            <div className="text-[11px] md:text-xs tracking-wide uppercase text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* cechy */}
      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line border-y border-line mb-16 md:mb-20">
        {FEATURES.map((f) => (
          <div key={f.title} className="px-6 py-7 md:py-8">
            <span className="w-12 h-12 rounded-pill bg-gold-soft text-gold flex items-center justify-center mb-4"><Icon name={f.icon} size={20} /></span>
            <h3 className="font-serif text-xl font-semibold text-ink mb-2">{f.title}</h3>
            <p className="text-sm text-ink-soft leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* jak to działa */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16 md:mb-20">
        <div>
          <span className="text-[12px] tracking-[0.22em] font-semibold text-gold">JAK TO DZIAŁA</span>
          <div className="mt-6 space-y-7">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span className="font-serif text-2xl font-bold text-gold/50 shrink-0 w-8">{s.n}</span>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-ink">{s.title}</h4>
                  <p className="text-sm text-ink-soft leading-relaxed mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gold-soft">
          <img src="/hero2.png" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* CTA */}
      <div className="text-center max-w-lg mx-auto">
        <h2 className="font-serif text-3xl font-semibold text-ink mb-3">Dołącz do ModaMarket</h2>
        <p className="text-ink-soft mb-6">Zacznij kupować i sprzedawać modę premium już dziś.</p>
        <button onClick={() => openAuth('register')} className="btn-gold px-8 py-3.5 text-white font-semibold">Załóż konto</button>
      </div>
    </div>
  );
}
