'use client';
import { useState } from 'react';
import { CONVERSATION, IMG, grosze } from '@modamarket/shared';
import { Icon, type IconName } from '../components/ui/Icon';
import { Avatar } from '../components/ui';

type Convo = { id: string; name: string; avatar: string; product: string; productImg: string; last: string; time: string; unread?: number; dot?: 'gold' | 'gray'; online?: boolean };

const CONVOS: Convo[] = [
  { id: 'kasia90', name: 'Kasia90', avatar: IMG.avatar, product: 'Trencz klasyczny ZARA', productImg: IMG.trench, last: 'Dziękuję! Czy mogłaby Pani przesłać …', time: '09:20', unread: 1, online: true },
  { id: 'anna', name: 'Anna Kowalska', avatar: IMG.avatar, product: 'New Balance 530', productImg: IMG.nb, last: 'Czy buty są jeszcze dostępne?', time: '08:48', dot: 'gold', online: true },
  { id: 'vintage', name: 'VintageRoom', avatar: IMG.avatar, product: 'Torebka Furla', productImg: IMG.bag, last: 'Świetnie, dziękuję za informacje!', time: 'Wczoraj', dot: 'gold' },
  { id: 'tomek', name: 'TomekStyle', avatar: IMG.avatar, product: 'Sukienka midi', productImg: IMG.dress, last: 'Czy istnieje możliwość rezerwacji?', time: 'Wczoraj', dot: 'gray' },
  { id: 'ola', name: 'Ola Boutique', avatar: IMG.avatar, product: 'Loafersy skórzane', productImg: IMG.belt, last: 'Dziękuję za szybką odpowiedź!', time: '2 dni temu', online: true },
  { id: 'marek', name: 'Marek_88', avatar: IMG.avatar, product: 'Kurtka Nuptse', productImg: IMG.nuptse, last: 'Czy możliwa wysyłka jutro?', time: '2 dni temu', dot: 'gold', online: true },
  { id: 'lena', name: 'LenaStyle', avatar: IMG.avatar, product: 'Jeansy 501 Vintage', productImg: IMG.jeans, last: 'Dziękuję, biorę! 🙂', time: '3 dni temu', dot: 'gray' },
  { id: 'piotr', name: 'Piotr K.', avatar: IMG.avatar, product: 'Bluza z kapturem Nike', productImg: IMG.hoodie, last: 'Jaki dokładnie rozmiar?', time: '3 dni temu' },
  { id: 'zofia', name: 'Zofia92', avatar: IMG.avatar, product: 'Okulary Ray-Ban', productImg: IMG.sunglasses, last: 'Super, gorąco polecam!', time: '4 dni temu', online: true },
  { id: 'kuba', name: 'kuba_vintage', avatar: IMG.avatar, product: 'Marynarka slim', productImg: IMG.blazer, last: 'Czy cena do negocjacji?', time: '5 dni temu', dot: 'gold' },
];

const SYSTEM: { icon: IconName; title: string; text: string; time: string }[] = [
  { icon: 'bell', title: 'Powiadomienia', text: 'Twoje ogłoszenie „Sukienka letnia" zostało wyróżnione.', time: '09:30' },
  { icon: 'shield', title: 'Bezpieczeństwo', text: 'Pamiętaj, aby rozmawiać i płacić tylko w aplikacji ModaMarket.', time: 'Wczoraj' },
  { icon: 'help', title: 'Obsługa klienta', text: 'Dziękujemy za kontakt. Odpowiemy najszybciej, jak to możliwe.', time: '2 dni temu' },
];

const TABS = ['Odebrane', 'Wysłane', 'Inne'] as const;
type Tab = typeof TABS[number];

function Tabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div className="flex bg-surface border border-line rounded-pill p-1">
      {TABS.map((t) => (
        <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-pill text-[13px] font-semibold transition-colors flex items-center justify-center gap-1.5 ${tab === t ? 'btn-gold text-white' : 'text-ink-soft'}`}>
          {t}{t === 'Inne' && <span className="w-1.5 h-1.5 rounded-pill bg-gold" />}
        </button>
      ))}
    </div>
  );
}

function ConvoRow({ c, onOpen, onDelete }: { c: Convo; onOpen: () => void; onDelete: () => void }) {
  return (
    <div role="button" onClick={onOpen} className="w-full flex items-center gap-3.5 py-4 text-left cursor-pointer group">
      <div className="relative shrink-0">
        <img src={c.avatar} alt="" className="w-14 h-14 rounded-pill object-cover" />
        {c.online && <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-pill bg-success border-2 border-bg" />}
      </div>
      <div className="w-14 h-14 rounded-lg bg-gold-soft bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${c.productImg}')` }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[15.5px] font-semibold text-ink truncate">{c.name}</span>
          <span className="text-[12px] text-muted shrink-0">{c.time}</span>
        </div>
        <div className="text-[13px] text-ink-soft truncate mt-0.5">{c.product}</div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <span className="text-[13px] text-muted truncate">{c.last}</span>
          {c.unread ? (
            <span className="min-w-[18px] h-[18px] px-1 rounded-pill bg-gold text-white text-[11px] font-bold flex items-center justify-center shrink-0">{c.unread}</span>
          ) : c.dot ? (
            <span className={`w-2 h-2 rounded-pill shrink-0 ${c.dot === 'gold' ? 'bg-gold' : 'bg-muted'}`} />
          ) : null}
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onDelete(); }} aria-label="Usuń rozmowę" className="ml-1 w-8 h-8 rounded-pill flex items-center justify-center text-muted/60 hover:text-danger hover:bg-danger/10 transition-colors shrink-0">
        <Icon name="trash" size={16} />
      </button>
    </div>
  );
}

function SystemList() {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2.5 bg-gold-soft/50 border border-line rounded-xl p-3.5 text-[13px] text-ink-soft">
        <Icon name="help" size={16} className="text-gold shrink-0 mt-0.5" />
        W tej zakładce znajdziesz wiadomości systemowe oraz rozmowy niezwiązane z ogłoszeniami.
      </div>
      {SYSTEM.map((s) => (
        <div key={s.title} className="card-surface p-4 flex items-start gap-3">
          <span className="w-11 h-11 rounded-pill bg-gold-soft text-gold flex items-center justify-center shrink-0"><Icon name={s.icon} size={18} /></span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-semibold text-ink">{s.title}</span>
              <span className="text-[11px] text-muted shrink-0">{s.time}</span>
            </div>
            <p className="text-[13px] text-ink-soft mt-0.5">{s.text}</p>
          </div>
          <span className="w-2 h-2 rounded-pill bg-gold shrink-0 mt-1.5" />
        </div>
      ))}
    </div>
  );
}

function Chat({ onBack, compact }: { onBack?: () => void; compact?: boolean }) {
  const c = CONVERSATION;
  return (
    <div className={`flex flex-col ${compact ? 'h-full' : 'h-[calc(100dvh-128px)]'}`}>
      {/* header rozmówcy */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-line">
        {onBack && <button onClick={onBack}><Icon name="arrowLeft" size={20} /></button>}
        <Avatar name={c.peer.displayName} src={c.peer.avatarUrl} size={40} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-ink leading-tight">{c.peer.displayName}</div>
          <div className="text-[11px] text-muted">{c.onlineLabel}</div>
        </div>
        <button className="text-muted"><Icon name="settings" size={18} /></button>
      </div>

      {/* karta produktu */}
      {c.listing && (
        <div className="m-3 card-surface p-2.5 flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg bg-gold-soft bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${c.listing.imageUrl}')` }} />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-ink truncate">{c.listing.title}</div>
            <div className="text-[14px] font-bold text-ink">{grosze(c.listing.price)}</div>
            <div className="text-[11px] text-success font-medium">Dostępny</div>
          </div>
          <Icon name="chevronRight" size={16} className="text-muted" />
        </div>
      )}

      {/* wiadomości */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 no-scrollbar">
        <div className="text-center text-[11px] text-muted my-2">Dzisiaj</div>
        {c.messages.map((m) => (
          <div key={m.id} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[78%] flex flex-col ${m.fromMe ? 'items-end' : 'items-start'}`}>
              {m.images ? (
                <div className="flex gap-1.5">
                  {m.images.map((img, i) => <div key={i} className="w-24 h-28 rounded-lg bg-gold-soft bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />)}
                </div>
              ) : (
                <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-snug ${m.fromMe ? 'bg-gold-soft text-ink rounded-br-md' : 'bg-surface border border-line rounded-bl-md'}`}>{m.body}</div>
              )}
              <div className="flex items-center gap-1 mt-0.5 text-[10px] text-muted px-1">
                {m.timeLabel}
                {m.fromMe && <Icon name="check" size={11} className={m.read ? 'text-gold' : 'text-muted'} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* pole wpisywania */}
      <div className="flex items-center gap-2 p-3 border-t border-line">
        <button className="text-muted"><Icon name="paperclip" size={20} /></button>
        <input className="flex-1 bg-surface border border-line rounded-pill px-4 py-2.5 text-sm outline-none placeholder:text-muted" placeholder="Napisz wiadomość..." />
        <button className="btn-gold w-10 h-10 rounded-pill text-white shrink-0"><Icon name="send" size={18} /></button>
      </div>
    </div>
  );
}

export function MessagesPage() {
  const [tab, setTab] = useState<Tab>('Odebrane');
  const [openId, setOpenId] = useState<string | null>(null);
  const [convos, setConvos] = useState(CONVOS);
  const removeConvo = (id: string) => setConvos((cs) => cs.filter((c) => c.id !== id));

  return (
    <div>
      {/* ===================== MOBILE ===================== */}
      <div className="md:hidden">
        {openId ? (
          <Chat onBack={() => setOpenId(null)} />
        ) : (
          <div className="px-4 pt-3">
            <h1 className="font-serif text-2xl font-semibold text-ink mb-4">Wiadomości</h1>
            <Tabs tab={tab} setTab={setTab} />
            {tab === 'Inne' ? (
              <div className="mt-4"><SystemList /></div>
            ) : (
              <>
                <div className="flex gap-2 mt-4 mb-1">
                  <div className="flex-1 flex items-center gap-2 bg-surface border border-line rounded-pill px-4 py-2.5">
                    <Icon name="search" size={17} className="text-muted" />
                    <input placeholder="Szukaj rozmowy lub produktu" className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted" />
                  </div>
                  <button className="w-11 rounded-pill bg-surface border border-line flex items-center justify-center text-ink shrink-0"><Icon name="sliders" size={18} /></button>
                </div>
                <div className="divide-y divide-line">
                  {convos.map((c) => <ConvoRow key={c.id} c={c} onOpen={() => setOpenId(c.id)} onDelete={() => removeConvo(c.id)} />)}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ===================== DESKTOP (2-pane) ===================== */}
      <div className="hidden md:block w-full max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <h1 className="font-serif text-2xl font-semibold text-ink mb-4">Wiadomości</h1>
        <div className="grid grid-cols-[360px_1fr] gap-6 h-[calc(100vh-240px)]">
          {/* lista */}
          <div className="card-surface flex flex-col overflow-hidden">
            <div className="p-3 border-b border-line">
              <Tabs tab={tab} setTab={setTab} />
            </div>
            <div className="flex-1 overflow-y-auto px-3">
              {tab === 'Inne' ? (
                <div className="py-3"><SystemList /></div>
              ) : (
                <div className="divide-y divide-line">
                  {convos.map((c) => (
                    <div key={c.id} className={`rounded-lg ${openId === c.id ? 'bg-gold-soft/40' : ''}`}>
                      <ConvoRow c={c} onOpen={() => setOpenId(c.id)} onDelete={() => removeConvo(c.id)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* czat */}
          <div className="card-surface overflow-hidden">
            <Chat compact />
          </div>
        </div>
      </div>
    </div>
  );
}
