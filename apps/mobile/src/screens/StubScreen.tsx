import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C, SERIF } from '../theme';

/** Ekran-zaślepka. Port wizualny z web po zatwierdzeniu makiet (Etap portu mobile). */
export function StubScreen({ title, sub }: { title: string; sub: string }) {
  return (
    <View style={s.root}>
      <Text style={s.title}>{title}</Text>
      <Text style={s.sub}>{sub}</Text>
      <Text style={s.note}>Ekran w przygotowaniu — port z wersji web.</Text>
    </View>
  );
}

export const SearchScreen = () => <StubScreen title="Szukaj" sub="Wyszukiwarka, filtry i wyniki" />;
export const SellScreen = () => <StubScreen title="Dodaj ogłoszenie" sub="Zdjęcia, dane, atrybuty, cena, opis" />;
export const FavoritesScreen = () => <StubScreen title="Ulubione" sub="Zapisane oferty" />;
export const ProfileScreen = () => <StubScreen title="Profil" sub="Konto, zakupy, sprzedaże, ustawienia" />;

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg, alignItems: 'center', justifyContent: 'center', padding: 40 },
  title: { fontFamily: SERIF, fontSize: 26, color: C.ink, marginBottom: 8 },
  sub: { color: C.muted, textAlign: 'center', marginBottom: 16 },
  note: { color: C.gold, fontSize: 12, fontWeight: '600' },
});
