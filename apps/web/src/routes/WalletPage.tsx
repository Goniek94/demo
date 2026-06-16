'use client';
import { useRouter } from 'next/navigation';
import { grosze } from '@modamarket/shared';
import { Icon } from '../components/ui/Icon';
import { AccountLayout } from '../components/layout/AccountLayout';

const AVAILABLE = 245000;
const TOTAL = 378000;
const PENDING = 133000;

const PAYOUTS = [
  { amount: 120000, date: '12.05.2024, 10:32', status: 'Zrealizowano' },
  { amount: 98000, date: '28.04.2024, 09:15', status: 'Zrealizowano' },
  { amount: 76000, date: '15.04.2024, 14:47', status: 'Zrealizowano' },
  { amount: 64000, date: '02.04.2024, 12:20', status: 'Zrealizowano' },
  { amount: 142000, date: '21.03.2024, 16:05', status: 'Zrealizowano' },
  { amount: 53000, date: '08.03.2024, 09:48', status: 'Zrealizowano' },
  { amount: 89000, date: '24.02.2024, 11:10', status: 'Zrealizowano' },
];

function PayoutRow({ p }: { p: { amount: number; date: string; status: string } }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="w-10 h-10 rounded-pill bg-gold-soft text-gold flex items-center justify-center shrink-0"><Icon name="card" size={17} /></span>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-medium text-ink">Wypłata na konto</div>
        <div className="text-[12px] text-muted">{p.date}</div>
      </div>
      <div className="text-right">
        <div className="text-[14px] font-bold text-ink">{grosze(p.amount)}</div>
        <div className="text-[12px] text-success font-medium">{p.status}</div>
      </div>
    </div>
  );
}

function SecurityNote() {
  return (
    <div className="flex items-center gap-3 bg-gold-soft/40 border border-line rounded-xl px-4 py-3">
      <Icon name="shield" size={20} className="text-gold shrink-0" />
      <div>
        <div className="text-[13px] font-semibold text-ink">Bezpieczne wypłaty</div>
        <div className="text-[12px] text-muted">Dbamy o bezpieczeństwo Twoich środków i poufność danych.</div>
      </div>
    </div>
  );
}

export function WalletPage() {
  const router = useRouter();
  return (
    <AccountLayout active="portfel">
      {/* nagłówek */}
      <div className="md:hidden flex items-center gap-3 mb-4">
        <button onClick={() => router.back()} className="text-ink"><Icon name="arrowLeft" size={20} /></button>
        <h1 className="font-serif text-lg font-semibold text-ink flex-1 text-center pr-6">Portfel</h1>
      </div>
      <h1 className="hidden md:block font-serif text-2xl font-semibold text-ink mb-6">Portfel</h1>

      <div className="md:max-w-3xl">
        {/* karta salda */}
        <div className="card-surface p-5 md:p-6 mb-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[13px] text-muted">Dostępne środki</div>
              <div className="font-serif text-[30px] md:text-4xl font-bold text-ink mt-1">{grosze(AVAILABLE)}</div>
              <div className="text-[13px] text-muted mt-2">Łączne saldo <span className="text-ink font-medium">{grosze(TOTAL)}</span></div>
            </div>
            <span className="w-14 h-14 rounded-pill bg-gold-soft text-gold flex items-center justify-center shrink-0"><Icon name="wallet" size={24} /></span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button className="btn-gold py-3 text-white font-semibold">Wypłać środki <Icon name="refresh" size={16} /></button>
            <button className="py-3 rounded-pill border border-line bg-surface text-ink font-semibold flex items-center justify-center gap-2 hover:border-gold transition-colors">Historia <Icon name="clock" size={16} /></button>
          </div>
        </div>

        {/* statystyki */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="card-surface p-4">
            <div className="text-[13px] text-muted">Dostępne do wypłaty</div>
            <div className="font-serif text-xl font-bold text-ink mt-1">{grosze(AVAILABLE)}</div>
          </div>
          <div className="card-surface p-4">
            <div className="text-[13px] text-muted">Oczekujące środki</div>
            <div className="font-serif text-xl font-bold text-ink mt-1">{grosze(PENDING)}</div>
          </div>
        </div>

        {/* ostatnie wypłaty */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-lg font-semibold text-ink">Ostatnie wypłaty</h2>
          <button className="text-[13px] font-semibold text-gold">Zobacz wszystkie</button>
        </div>
        <div className="card-surface px-4 divide-y divide-line mb-4">
          {PAYOUTS.map((p, i) => <PayoutRow key={i} p={p} />)}
        </div>

        <SecurityNote />
      </div>
    </AccountLayout>
  );
}
