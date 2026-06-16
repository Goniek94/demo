'use client';
import { useRouter } from 'next/navigation';
import { USERS, IMG, grosze } from '@modamarket/shared';
import { Icon, type IconName } from '../components/ui/Icon';
import { AccountLayout } from '../components/layout/AccountLayout';
import { logout } from '../lib/auth';

function StatCard({ label, value, growth, icon }: { label: string; value: string; growth: string; icon: IconName }) {
  return (
    <div className="card-surface p-5 hover:border-gold/60 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-11 h-11 rounded-pill bg-gold-soft text-gold flex items-center justify-center shrink-0"><Icon name={icon} size={19} /></span>
        <span className="text-[13px] text-muted">{label}</span>
      </div>
      <div className="font-serif text-[28px] leading-none font-bold text-ink">{value}</div>
      <div className="flex items-center gap-1.5 mt-3 text-[12px]">
        <span className="text-success font-semibold inline-flex items-center gap-0.5"><Icon name="chart" size={13} /> {growth}</span>
        <span className="text-muted">vs. zeszły miesiąc</span>
      </div>
    </div>
  );
}

function Panel({ title, action, children, className = '' }: { title: string; action?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`card-surface p-5 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-semibold text-ink">{title}</h3>
        {action && <button className="text-[13px] font-semibold text-gold flex items-center gap-1">{action} <Icon name="arrowRight" size={13} /></button>}
      </div>
      {children}
    </div>
  );
}

const STATUS: Record<string, string> = {
  'Nowe': 'bg-gold-soft text-gold-deep',
  'Opłacone': 'bg-success/12 text-success',
  'W realizacji': 'bg-[#E6EEF6] text-[#3B6CA8]',
  'Wysłane': 'bg-[#ECE7F6] text-[#6A52A3]',
  'Dostarczone': 'bg-success/12 text-success',
};

const MOBILE_STATS: { icon: IconName; label: string; value: string; growth: string }[] = [
  { icon: 'bag', label: 'Zakupy', value: '24', growth: '+12%' },
  { icon: 'tag', label: 'Sprzedaże', value: '18', growth: '+8%' },
  { icon: 'list', label: 'Aktywne ogłoszenia', value: '12', growth: '+5%' },
  { icon: 'star', label: 'Opinie', value: '4,9 / 5', growth: '+6%' },
];

const QUICK: { icon: IconName; label: string; href: string }[] = [
  { icon: 'list', label: 'Moje ogłoszenia', href: '/moje-ogloszenia' },
  { icon: 'plus', label: 'Dodaj ogłoszenie', href: '/sprzedaj' },
  { icon: 'box', label: 'Transakcje', href: '/zamowienie' },
  { icon: 'heart', label: 'Ulubione', href: '/ulubione' },
  { icon: 'chat', label: 'Wiadomości', href: '/wiadomosci' },
  { icon: 'wallet', label: 'Portfel', href: '/portfel' },
  { icon: 'settings', label: 'Ustawienia konta', href: '/ustawienia' },
  { icon: 'help', label: 'Pomoc', href: '/pomoc' },
  { icon: 'dashboard', label: 'Panel administracyjny', href: '/admin' },
];

export function ProfilePage() {
  const router = useRouter();
  const me = USERS[0];

  const orders = [
    { id: '#MM87531', prod: 'Trencz klasyczny ZARA', amount: grosze(29000), status: 'Nowe', date: '08.05.2025, 10:32' },
    { id: '#MM87530', prod: 'Torebka na ramię Mango', amount: grosze(22000), status: 'Opłacone', date: '08.05.2025, 09:15' },
    { id: '#MM87529', prod: 'Kurtka Nuptse TNF', amount: grosze(54000), status: 'W realizacji', date: '07.05.2025, 16:47' },
    { id: '#MM87528', prod: 'Sukienka letnia H&M', amount: grosze(15000), status: 'Wysłane', date: '07.05.2025, 14:21' },
    { id: '#MM87527', prod: 'Sneakersy retro Adidas', amount: grosze(31000), status: 'Dostarczone', date: '06.05.2025, 11:08' },
  ];

  const listings = [
    { img: IMG.trench, t: 'Trencz klasyczny ZARA', price: grosze(19900), views: 142, status: 'Aktywne' },
    { img: IMG.bag, t: 'Torebka na ramię Mango', price: grosze(15900), views: 89, status: 'Aktywne' },
    { img: IMG.nuptse, t: 'Kurtka Nuptse TNF', price: grosze(72000), views: 67, status: 'Aktywne' },
    { img: IMG.dressW, t: 'Sukienka wieczorowa', price: grosze(12900), views: 38, status: 'Szkic' },
  ];

  return (
    <AccountLayout active="przeglad">
      {/* ===================== MOBILE ===================== */}
      <div className="md:hidden">
        {/* karta powitalna */}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-gold-soft/60 p-4 mb-4">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.12] flex items-center justify-center text-gold pointer-events-none"><Icon name="hanger" size={150} /></div>
          <div className="relative flex items-center gap-4">
            <img src={me.avatarUrl} alt="" className="w-[78px] h-[78px] rounded-pill object-cover border-2 border-white shadow-sm shrink-0" />
            <div className="min-w-0">
              <h1 className="font-serif text-2xl font-semibold text-ink leading-tight">{me.displayName}</h1>
              <span className="inline-flex items-center gap-1.5 text-gold text-[14px] font-semibold mt-1"><Icon name="award" size={15} /> Zweryfikowana</span>
              <p className="text-[13px] text-ink-soft mt-1.5">Witaj ponownie w swoim panelu użytkownika.</p>
            </div>
          </div>
        </div>

        {/* staty 2×2 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {MOBILE_STATS.map((s) => (
            <div key={s.label} className="card-surface p-4">
              <span className="w-10 h-10 rounded-pill bg-gold-soft text-gold flex items-center justify-center mb-2"><Icon name={s.icon} size={17} /></span>
              <div className="text-[12px] text-muted leading-tight">{s.label}</div>
              <div className="font-serif text-2xl font-bold text-ink leading-none mt-1">{s.value}</div>
              <div className="flex items-center gap-1 mt-2 text-[11px]">
                <span className="text-success font-semibold inline-flex items-center gap-0.5"><Icon name="chart" size={11} /> {s.growth}</span>
                <span className="text-muted">vs. zeszły mies.</span>
              </div>
            </div>
          ))}
        </div>

        {/* Szybki dostęp */}
        <div className="card-surface p-2 mb-3">
          <h3 className="font-serif text-lg font-semibold text-ink px-3 pt-2 pb-1">Szybki dostęp</h3>
          <div className="divide-y divide-line">
            {QUICK.map((m) => (
              <button key={m.label} onClick={() => router.push(m.href)} className="w-full flex items-center gap-3.5 px-3 py-3.5 text-left">
                <span className="w-10 h-10 rounded-pill bg-gold-soft text-gold flex items-center justify-center shrink-0"><Icon name={m.icon} size={18} /></span>
                <span className="flex-1 text-[15px] text-ink">{m.label}</span>
                <Icon name="chevronRight" size={18} className="text-muted" />
              </button>
            ))}
          </div>
        </div>

        {/* Wyloguj */}
        <button onClick={() => { logout(); router.push('/'); }} className="w-full card-surface flex items-center gap-3.5 px-4 py-3.5 text-danger font-semibold text-[15px] mb-2">
          <span className="w-10 h-10 rounded-pill bg-danger/10 flex items-center justify-center shrink-0"><Icon name="logout" size={18} /></span>
          Wyloguj się
        </button>
      </div>

      {/* ===================== DESKTOP ===================== */}
      <div className="hidden md:block">
      {/* Tytuł */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl md:text-[28px] font-semibold text-ink">Panel główny</h1>
          <p className="text-sm text-muted mt-1">Przegląd Twojej aktywności na ModaMarket.</p>
        </div>
        <button className="hidden md:inline-flex btn-gold px-5 py-2.5 text-white text-sm">Edytuj profil</button>
      </div>

      {/* Baner powitalny */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gold-soft/60 p-6 md:p-7 mb-6">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.12] flex items-center justify-center text-gold pointer-events-none">
          <Icon name="hanger" size={180} />
        </div>
        <div className="relative flex items-center gap-5">
          <span className="w-16 h-16 rounded-pill bg-surface border border-gold/30 text-gold flex items-center justify-center shrink-0 shadow-sm"><Icon name="crown" size={28} /></span>
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-semibold text-ink">Witaj ponownie, {me.displayName.split(' ')[0]}!</h2>
            <p className="text-[13px] md:text-sm text-ink-soft mt-1 max-w-lg">Miło Cię znów widzieć. Poniżej znajdziesz swoje statystyki, najnowsze zamówienia i ostatnią aktywność.</p>
          </div>
        </div>
      </div>

      {/* Staty */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatCard label="Zakupy" value="24" growth="+12%" icon="bag" />
        <StatCard label="Sprzedaże" value="18" growth="+8%" icon="tag" />
        <StatCard label="Aktywne ogłoszenia" value="12" growth="+5%" icon="list" />
        <StatCard label="Zarobiono łącznie" value={grosze(186000)} growth="+18%" icon="wallet" />
      </div>

      {/* Zamówienia + aktywność */}
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        <Panel title="Najnowsze zamówienia" action="Zobacz wszystkie" className="lg:col-span-2">
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wide text-muted border-b border-line">
                  <th className="font-medium py-2.5 px-1">ID</th>
                  <th className="font-medium py-2.5 px-1">Produkt</th>
                  <th className="font-medium py-2.5 px-1">Kwota</th>
                  <th className="font-medium py-2.5 px-1">Status</th>
                  <th className="font-medium py-2.5 px-1">Data</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-line last:border-0 hover:bg-bg/60 transition-colors">
                    <td className="py-3 px-1 text-[13px] font-semibold text-ink whitespace-nowrap">{o.id}</td>
                    <td className="py-3 px-1 text-[13px] text-ink-soft">{o.prod}</td>
                    <td className="py-3 px-1 text-[13px] font-semibold text-ink whitespace-nowrap">{o.amount}</td>
                    <td className="py-3 px-1"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-pill whitespace-nowrap ${STATUS[o.status]}`}>{o.status}</span></td>
                    <td className="py-3 px-1 text-[12px] text-muted whitespace-nowrap">{o.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Twoje ogłoszenia" action="Zarządzaj">
          <div className="divide-y divide-line -my-1">
            {listings.map((l, i) => (
              <div key={i} className="flex items-center gap-3 py-3">
                <div className="w-12 h-14 rounded-lg bg-gold-soft bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${l.img}')` }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-ink leading-snug truncate">{l.t}</div>
                  <div className="text-[13px] font-semibold text-ink mt-0.5">{l.price}</div>
                  <div className="text-[11px] text-muted mt-0.5 flex items-center gap-1"><Icon name="eye" size={12} /> {l.views} wyświetleń</div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-pill whitespace-nowrap ${l.status === 'Aktywne' ? 'bg-success/12 text-success' : 'bg-line text-muted'}`}>{l.status}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      </div>
    </AccountLayout>
  );
}
