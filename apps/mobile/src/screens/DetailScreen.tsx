import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { LISTINGS, USERS, grosze, conditionLabel } from '@modamarket/shared';
import { C, SERIF } from '../theme';

export function DetailScreen({ route, navigation }: any) {
  const id = route?.params?.id;
  const p = LISTINGS.find((l) => l.id === id) ?? LISTINGS[0];
  const seller = USERS[1];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }} style={{ backgroundColor: C.bg }}>
      <ImageBackground source={{ uri: p.imageUrl }} style={s.img}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}><Text style={{ fontSize: 18 }}>←</Text></TouchableOpacity>
      </ImageBackground>
      <View style={{ padding: 20 }}>
        <Text style={s.brand}>{p.brand}</Text>
        <Text style={s.title}>{p.title}</Text>
        <Text style={s.sub}>{conditionLabel(p.condition)} · {p.size ? 'Rozmiar ' + p.size : 'Uniwersalny'}</Text>
        <Text style={s.price}>{grosze(p.price)}</Text>

        <View style={s.trust}>
          {[['🛡️', 'Ochrona\nkupującego'], ['📦', 'Śledzona\nprzesyłka'], ['↩️', 'Zwroty\n14 dni']].map(([ic, tx], i) => (
            <View key={i} style={s.ti}><Text style={s.tiIc}>{ic}</Text><Text style={s.tiTx}>{tx}</Text></View>
          ))}
        </View>

        <Text style={s.h4}>OPIS</Text>
        <Text style={s.desc}>Produkt w stanie {conditionLabel(p.condition).toLowerCase()}. Oryginalny, sprawdzony przez moderację ModaMarket. Wysyłka w 24h.</Text>

        <View style={s.seller}>
          <View style={s.sav}><Text style={{ color: '#fff', fontFamily: SERIF, fontSize: 18 }}>{seller.displayName[0].toUpperCase()}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '600', color: C.ink }}>{seller.displayName}</Text>
            <Text style={{ fontSize: 12, color: C.muted }}>★ {seller.ratingAvg} · {seller.ratingCount} sprzedaży</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
          <TouchableOpacity style={s.btnGhost}><Text style={{ fontSize: 18 }}>💬</Text></TouchableOpacity>
          <TouchableOpacity style={s.btnDark}><Text style={s.btnDarkTx}>Kup teraz</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  img: { height: 380, padding: 16, backgroundColor: C.goldSoft },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: C.gold, fontWeight: '700' },
  title: { fontFamily: SERIF, fontSize: 25, fontWeight: '600', marginVertical: 4, color: C.ink },
  sub: { color: C.muted, fontSize: 14 },
  price: { fontFamily: SERIF, fontSize: 28, fontWeight: '700', marginVertical: 10, color: C.ink },
  trust: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: C.line, paddingVertical: 14, marginVertical: 8 },
  ti: { flex: 1, alignItems: 'center' }, tiIc: { fontSize: 18, marginBottom: 4 }, tiTx: { fontSize: 11, color: C.muted, textAlign: 'center' },
  h4: { fontSize: 11, letterSpacing: 1.5, color: C.muted, marginTop: 16, marginBottom: 8, fontWeight: '700' },
  desc: { fontSize: 14, lineHeight: 22, color: C.inkSoft },
  seller: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.surface, borderRadius: 14, padding: 14, marginTop: 16, borderWidth: 1, borderColor: C.line },
  sav: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.gold, alignItems: 'center', justifyContent: 'center' },
  btnDark: { flex: 1, backgroundColor: C.ink, borderRadius: 30, paddingVertical: 15, alignItems: 'center' },
  btnDarkTx: { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnGhost: { width: 54, borderWidth: 1, borderColor: C.ink, borderRadius: 30, paddingVertical: 13, alignItems: 'center', backgroundColor: C.surface },
});
