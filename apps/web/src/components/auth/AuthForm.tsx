'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon, type IconName } from '../ui/Icon';
import { Field } from '../ui';
import { login, type AuthMode } from '../../lib/auth';

function Social({ label, icon }: { label: string; icon: IconName }) {
  return (
    <button className="flex-1 card-surface py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-ink hover:border-gold transition-colors">
      <Icon name={icon} size={16} /> {label}
    </button>
  );
}

export function AuthForm({ mode, onMode, onDone }: { mode: AuthMode; onMode: (m: AuthMode) => void; onDone?: () => void }) {
  const router = useRouter();
  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(false);

  const submit = () => {
    login();
    if (onDone) onDone(); // modal: zamknij i zostań na bieżącej stronie (np. home)
    else router.push('/'); // wejście z osobnej strony /logowanie → wróć na home
  };

  const isReg = mode === 'register';

  return (
    <div>
      <div className="text-center mb-7">
        <div className="w-14 h-14 rounded-pill bg-gold-soft text-gold flex items-center justify-center mx-auto mb-4"><Icon name={isReg ? 'userPlus' : 'lock'} size={24} /></div>
        <h1 className="font-serif text-3xl font-semibold text-ink">{isReg ? 'Załóż konto' : 'Zaloguj się'}</h1>
        <p className="text-sm text-muted mt-2 max-w-xs mx-auto">{isReg ? 'Dołącz do ModaMarket i odkrywaj świat mody.' : 'Witaj ponownie! Zaloguj się, aby kontynuować.'}</p>
      </div>

      <div className="space-y-4">
        <Field label="E-mail" placeholder="Wprowadź adres e-mail" type="email" right={<Icon name="mail" size={16} />} />
        <Field label="Hasło" placeholder="Wprowadź hasło" type={s1 ? 'text' : 'password'} right={<button onClick={() => setS1(!s1)}><Icon name="eye" size={16} /></button>} />
        {isReg && (
          <Field label="Potwierdź hasło" placeholder="Potwierdź hasło" type={s2 ? 'text' : 'password'} right={<button onClick={() => setS2(!s2)}><Icon name="eye" size={16} /></button>} />
        )}
      </div>

      {isReg ? (
        <label className="flex items-center gap-2 text-[13px] text-ink-soft mt-4 cursor-pointer">
          <input type="checkbox" className="accent-gold w-4 h-4" />
          <span>Akceptuję <a className="text-gold font-semibold">Regulamin</a> oraz <a className="text-gold font-semibold">Politykę prywatności</a>.</span>
        </label>
      ) : (
        <div className="flex items-center justify-between mt-3 text-[13px]">
          <label className="flex items-center gap-2 text-ink-soft cursor-pointer"><input type="checkbox" className="accent-gold w-4 h-4" /> Zapamiętaj mnie</label>
          <button className="text-gold font-semibold">Nie pamiętasz hasła?</button>
        </div>
      )}

      <button onClick={submit} className="btn-gold w-full py-3 text-white mt-5">{isReg ? 'Załóż konto' : 'Zaloguj się'}</button>

      <div className="flex items-center gap-3 my-5 text-xs text-muted">
        <span className="flex-1 h-px bg-line" /> lub kontynuuj z <span className="flex-1 h-px bg-line" />
      </div>
      <div className="flex gap-2.5">
        <Social label="Google" icon="user" />
        <Social label="Apple" icon="user" />
      </div>

      <p className="text-center text-sm text-muted mt-6">
        {isReg ? 'Masz już konto? ' : 'Nie masz konta? '}
        <button onClick={() => onMode(isReg ? 'login' : 'register')} className="text-gold font-semibold">
          {isReg ? 'Zaloguj się' : 'Załóż konto'}
        </button>
      </p>
    </div>
  );
}
