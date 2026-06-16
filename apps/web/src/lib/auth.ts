'use client';
import { useEffect, useState } from 'react';

const KEY = 'mm_auth';
const EVT = 'mm-auth-change';

export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(KEY) === '1';
}

export function login() {
  localStorage.setItem(KEY, '1');
  window.dispatchEvent(new Event(EVT));
}

export function logout() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVT));
}

/** Hook SSR-safe: zwraca false przy pierwszym renderze (zgodnie z serwerem),
 *  po zamontowaniu czyta realny stan i reaguje na login/logout oraz zmiany w innych kartach. */
export function useAuth(): boolean {
  const [authed, setAuthed] = useState(false);
  useEffect(() => {
    const sync = () => setAuthed(isLoggedIn());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return authed;
}

/* ---- Modal logowania (globalny) ---- */
export type AuthMode = 'login' | 'register';
const MODAL_EVT = 'mm-auth-modal';
let modal: { open: boolean; mode: AuthMode } = { open: false, mode: 'login' };

export function openAuth(mode: AuthMode = 'login') {
  modal = { open: true, mode };
  window.dispatchEvent(new Event(MODAL_EVT));
}
export function closeAuth() {
  modal = { ...modal, open: false };
  window.dispatchEvent(new Event(MODAL_EVT));
}
export function useAuthModal(): { open: boolean; mode: AuthMode } {
  const [state, setState] = useState(modal);
  useEffect(() => {
    const sync = () => setState({ ...modal });
    window.addEventListener(MODAL_EVT, sync);
    return () => window.removeEventListener(MODAL_EVT, sync);
  }, []);
  return state;
}
