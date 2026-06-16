'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ORDER, PAYMENT_METHODS, grosze, type PaymentMethod } from '@modamarket/shared';
import { Icon } from '../components/ui/Icon';

export function CheckoutPage() {
  const router = useRouter();
  const o = ORDER;
  const [method, setMethod] = useState<PaymentMethod>('BLIK');

  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-8">
      <h1 className="font-semibold text-ink mb-4">Podsumowanie zamówienia</h1>

      {/* Produkt */}
      <div className="card-surface p-3 flex gap-3 items-center mb-4">
        <div className="w-16 h-16 rounded-lg bg-gold-soft bg-cover bg-center" style={{ backgroundImage: `url('${o.listing.imageUrl}')` }} />
        <div className="flex-1">
          <div className="font-medium text-ink">{o.listing.title}</div>
          <div className="text-xs text-muted">Rozmiar: {o.listing.size} · {o.listing.color}</div>
          <div className="text-xs text-muted">1 × {grosze(o.listing.price)}</div>
        </div>
        <div className="font-semibold text-ink">{grosze(o.amount)}</div>
      </div>

      <div className="text-sm border-y border-line py-3 space-y-1 mb-1">
        <div className="flex justify-between"><span className="text-muted">Wartość produktów</span><span className="text-ink">{grosze(o.amount)}</span></div>
        <div className="flex justify-between"><span className="text-muted">Dostawa</span><span className="text-ink">{o.shippingFee === 0 ? '0,00 zł' : grosze(o.shippingFee)}</span></div>
      </div>
      <div className="flex justify-between items-center py-3 mb-4">
        <span className="font-semibold text-ink">Do zapłaty</span>
        <span className="font-serif text-xl font-bold text-ink">{grosze(o.amount + o.shippingFee)}</span>
      </div>

      {/* Metody płatności */}
      <span className="block font-semibold text-ink mb-2.5">Wybierz metodę płatności</span>
      <div className="space-y-2.5 mb-5">
        {PAYMENT_METHODS.map((pm) => (
          <button
            key={pm.method}
            onClick={() => setMethod(pm.method)}
            className={`w-full flex items-center gap-3 card-surface px-4 py-3.5 text-left ${method === pm.method ? 'ring-1 ring-gold border-gold' : ''}`}
          >
            <span className={`w-5 h-5 rounded-pill border-2 flex items-center justify-center ${method === pm.method ? 'border-gold' : 'border-line'}`}>
              {method === pm.method && <span className="w-2.5 h-2.5 rounded-pill bg-gold" />}
            </span>
            <span className="flex-1">
              <span className="block font-semibold text-ink text-sm">{pm.title}</span>
              <span className="block text-xs text-muted">{pm.sub}</span>
            </span>
            <Icon name="chevronRight" size={16} className="text-muted" />
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-ink text-sm">Status płatności</span>
        <span className="text-xs font-semibold text-success bg-success/10 px-3 py-1.5 rounded-pill">Gotowe do płatności</span>
      </div>
      <p className="flex items-center gap-1.5 text-xs text-muted mb-5"><Icon name="lock" size={13} /> Przekierujemy Cię do bezpiecznego serwisu płatności.</p>

      <button onClick={() => router.push(`/zamowienie/${o.id}`)} className="btn-gold w-full py-4 text-white font-semibold">
        <Icon name="lock" size={16} /> Zapłać {grosze(o.amount + o.shippingFee)}
      </button>
      <p className="text-center text-[11px] text-muted mt-3 leading-relaxed">
        Płatność obsługiwana przez zewnętrznego operatora.<br />Twoje dane są bezpieczne.
      </p>
    </div>
  );
}
