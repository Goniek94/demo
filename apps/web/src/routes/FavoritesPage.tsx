'use client';
import { LISTINGS } from '@modamarket/shared';
import { AccountLayout } from '../components/layout/AccountLayout';
import { ShopCard } from '../components/product/ProductCard';

const FAV = LISTINGS.slice(0, 8);

export function FavoritesPage() {
  return (
    <AccountLayout active="ulubione">
      <h1 className="font-serif text-2xl md:text-[28px] font-semibold text-ink mb-1">Ulubione</h1>
      <p className="text-sm text-muted mb-6">Masz {FAV.length} zapisanych ofert</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {FAV.map((p) => <ShopCard key={p.id} p={p} />)}
      </div>
    </AccountLayout>
  );
}
