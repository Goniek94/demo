'use client';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { Icon, type IconName } from '../ui/Icon';
import { logout } from '../../lib/auth';

type Key = 'przeglad' | 'oferty' | 'dodaj' | 'zamowienia' | 'ulubione' | 'wiadomosci' | 'portfel' | 'platnosci' | 'ustawienia';

const ITEMS: { key: Key; label: string; icon: IconName; href: string }[] = [
  { key: 'przeglad', label: 'Panel główny', icon: 'dashboard', href: '/profil' },
  { key: 'oferty', label: 'Moje ogłoszenia', icon: 'list', href: '/moje-ogloszenia' },
  { key: 'dodaj', label: 'Dodaj ogłoszenie', icon: 'plus', href: '/sprzedaj' },
  { key: 'zamowienia', label: 'Transakcje', icon: 'box', href: '/zamowienie' },
  { key: 'ulubione', label: 'Ulubione', icon: 'heart', href: '/ulubione' },
  { key: 'wiadomosci', label: 'Wiadomości', icon: 'chat', href: '/wiadomosci' },
  { key: 'portfel', label: 'Portfel', icon: 'wallet', href: '/portfel' },
  { key: 'ustawienia', label: 'Ustawienia konta', icon: 'settings', href: '/ustawienia' },
];

export function AccountLayout({ active, children }: { active: Key; children: ReactNode }) {
  const router = useRouter();
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 md:px-8 py-6 md:py-8">
      <div className="md:grid md:grid-cols-[260px_1fr] md:gap-8">
        <aside className="hidden md:block">
          <nav className="card-surface p-2 sticky top-24">
            {ITEMS.map((it) => (
              <button
                key={it.key}
                onClick={() => router.push(it.href)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  active === it.key ? 'bg-gold-soft text-ink font-semibold' : 'text-ink-soft hover:bg-bg'
                }`}
              >
                <Icon name={it.icon} size={18} className={active === it.key ? 'text-gold' : 'text-muted'} />
                {it.label}
              </button>
            ))}
            <div className="h-px bg-line my-2 mx-2" />
            <button onClick={() => { logout(); router.push('/'); }} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left text-danger hover:bg-bg">
              <Icon name="logout" size={18} /> Wyloguj się
            </button>
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
