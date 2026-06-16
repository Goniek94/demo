'use client';
import { useRouter } from 'next/navigation';
import { ORDER, ORDER_FLOW, orderStatusLabel, grosze, type OrderStatus } from '@modamarket/shared';
import { Icon, type IconName } from '../components/ui/Icon';

const STEP_META: Record<OrderStatus, { icon: IconName; desc: string }> = {
  PENDING: { icon: 'box', desc: 'Zamówienie zostało przyjęte' },
  PAID: { icon: 'card', desc: 'Płatność została zaksięgowana' },
  SHIPPED: { icon: 'truck', desc: 'Twoja paczka jest w drodze' },
  DELIVERED: { icon: 'box', desc: 'Paczka została dostarczona' },
  COMPLETED: { icon: 'check', desc: 'Zamówienie zostało zakończone' },
  CANCELLED: { icon: 'x', desc: '' }, REFUNDED: { icon: 'x', desc: '' }, DISPUTED: { icon: 'x', desc: '' },
};

export function OrderPage() {
  const router = useRouter();
  const o = ORDER;
  const currentIdx = ORDER_FLOW.indexOf(o.status);

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-8">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => router.back()}><Icon name="arrowLeft" size={20} /></button>
        <div>
          <h1 className="font-semibold text-ink">Zamówienie #{o.id}</h1>
          <p className="text-xs text-muted">Złożone: {o.placedAtLabel}</p>
        </div>
      </div>

      {/* Timeline */}
      <h3 className="font-semibold text-ink mb-3">Status zamówienia</h3>
      <div className="mb-6">
        {ORDER_FLOW.map((s, i) => {
          const done = i <= currentIdx;
          const active = i === currentIdx;
          const meta = STEP_META[s];
          return (
            <div key={s} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-pill flex items-center justify-center ${active ? 'bg-gold text-white' : done ? 'bg-gold-soft text-gold' : 'bg-surface border border-line text-muted'}`}>
                  <Icon name={meta.icon} size={18} />
                </div>
                {i < ORDER_FLOW.length - 1 && <div className={`w-0.5 flex-1 min-h-[28px] ${done ? 'bg-gold/40' : 'bg-line'}`} />}
              </div>
              <div className={`pb-5 ${active ? '' : 'opacity-90'}`}>
                <div className={`text-sm font-bold tracking-wide ${active ? 'text-gold' : 'text-ink'}`}>{orderStatusLabel(s).toUpperCase()}</div>
                <div className="text-xs text-muted">{meta.desc}</div>
                {active && <div className="text-xs text-muted">{o.placedAtLabel}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Produkt */}
      <span className="block text-[11px] font-bold tracking-wide text-muted mb-2">PRODUKT</span>
      <div className="card-surface p-3 flex gap-3 items-center mb-4">
        <div className="w-16 h-16 rounded-lg bg-gold-soft bg-cover bg-center" style={{ backgroundImage: `url('${o.listing.imageUrl}')` }} />
        <div className="flex-1">
          <div className="font-medium text-ink">{o.listing.title}</div>
          <div className="text-xs text-muted">{o.listing.color}, Rozmiar {o.listing.size}</div>
          <div className="text-xs text-muted">1 × {grosze(o.listing.price)}</div>
        </div>
        <div className="font-semibold text-ink">{grosze(o.amount)}</div>
      </div>

      {/* Szczegóły transakcji */}
      <div className="card-surface p-4 mb-3 text-sm">
        <span className="block text-[11px] font-bold tracking-wide text-muted mb-2">SZCZEGÓŁY TRANSAKCJI</span>
        <Line k="Numer zamówienia" v={`#${o.id}`} />
        <Line k="Data złożenia" v={o.placedAtLabel ?? ''} />
        <Line k="Suma zamówienia" v={grosze(o.amount)} />
      </div>

      <div className="card-surface p-4 mb-3 text-sm">
        <span className="block text-[11px] font-bold tracking-wide text-muted mb-2">DOSTAWA</span>
        <div className="flex items-center gap-2">
          <Icon name="truck" size={16} className="text-gold" />
          <div className="flex-1">
            <div className="text-ink">{o.shippingMethod}</div>
            <div className="text-xs text-muted">Dostawa przewidywana: 27.05.2024</div>
          </div>
          <span className="text-ink">{o.shippingFee === 0 ? '0,00 zł' : grosze(o.shippingFee)}</span>
        </div>
      </div>

      <div className="card-surface p-4 text-sm">
        <span className="block text-[11px] font-bold tracking-wide text-muted mb-2">PŁATNOŚĆ</span>
        <div className="flex items-center gap-2">
          <Icon name="card" size={16} className="text-gold" />
          <div className="flex-1">
            <div className="text-ink">{o.paymentMethod}</div>
            <div className="text-xs text-success">Płatność opłacona</div>
          </div>
          <span className="text-ink">{grosze(o.amount)}</span>
        </div>
      </div>
    </div>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between py-0.5">
      <span className="text-muted">{k}</span>
      <span className="text-ink font-medium">{v}</span>
    </div>
  );
}
