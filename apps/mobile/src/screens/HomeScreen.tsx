import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { CATEGORIES, LISTINGS, IMG, grosze, type Listing } from '@modamarket/shared';
import { C, SERIF } from '../theme';

export function HomeScreen({ navigation }: any) {
  const recent = [IMG.blazer, IMG.jeans, IMG.sneaker, IMG.cap];
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }} style={{ backgroundColor: C.bg }}>
      {/* Search */}
      <View style={s.searchRow}>
        <View style={s.search}>
          <Text style={{ color: C.muted }}>⌕</Text>
          <TextInput style={s.searchInput} placeholder="Szukaj produktów, marek, kategorii..." placeholderTextColor={C.muted} />
        </View>
        <TouchableOpacity style={s.filterBtn}><Text style={{ fontSize: 18 }}>⚙</Text></TouchableOpacity>
      </View>

      {/* Kategorie */}
      <SecHead title="Kategorie" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 18 }}>
        {CATEGORIES.map((c) => (
          <View key={c.id} style={{ alignItems: 'center', width: 66 }}>
            <Image source={{ uri: c.imageUrl }} style={s.catImg} />
            <Text style={s.catTxt}>{c.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Banner */}
      <ImageBackground source={{ uri: IMG.group }} style={s.banner} imageStyle={{ borderRadius: 16 }}>
        <View style={s.bannerOv} />
        <View style={{ padding: 18 }}>
          <Text style={s.bannerTitle}>Kup w zespole</Text>
          <Text style={s.bannerSub}>Zbierajcie się razem{'\n'}i kupujcie taniej!</Text>
          <TouchableOpacity style={s.bannerBtn}><Text style={{ color: '#fff', fontWeight: '600' }}>Sprawdź</Text></TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Polecane */}
      <SecHead title="Polecane dla Ciebie" big />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
        {LISTINGS.slice(0, 6).map((p: Listing) => (
          <TouchableOpacity key={p.id} style={s.pcard} activeOpacity={0.9} onPress={() => navigation.navigate('Detail', { id: p.id })}>
            <ImageBackground source={{ uri: p.imageUrl }} style={s.pimg} imageStyle={{ borderRadius: 12 }}>
              <View style={s.heart}><Text>♡</Text></View>
            </ImageBackground>
            <Text style={s.ptitle}>{p.title}</Text>
            <Text style={s.pbrand}>{p.brand}</Text>
            <Text style={s.pprice}>{grosze(p.price)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Ostatnio oglądane */}
      <SecHead title="Ostatnio oglądane" big />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
        {recent.map((r, i) => (
          <ImageBackground key={i} source={{ uri: r }} style={s.rimg} imageStyle={{ borderRadius: 12 }}>
            <View style={s.heart}><Text>♡</Text></View>
          </ImageBackground>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

function SecHead({ title, big }: { title: string; big?: boolean }) {
  return (
    <View style={s.secHead}>
      <Text style={[s.secTitle, big && { fontSize: 17 }]}>{title}</Text>
      <Text style={s.secLink}>Zobacz wszystkie</Text>
    </View>
  );
}

const s = StyleSheet.create({
  searchRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 12, marginBottom: 18 },
  search: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.surface, borderRadius: 30, paddingHorizontal: 16, paddingVertical: 13, borderWidth: 1, borderColor: C.line },
  searchInput: { flex: 1, fontSize: 14, color: C.ink },
  filterBtn: { width: 50, backgroundColor: C.surface, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.line },
  secHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 14, marginTop: 14 },
  secTitle: { fontSize: 16, fontWeight: '700', color: C.ink },
  secLink: { fontSize: 13, color: C.gold, fontWeight: '600' },
  catImg: { width: 64, height: 64, borderRadius: 32, marginBottom: 6, backgroundColor: C.goldSoft },
  catTxt: { fontSize: 11, textAlign: 'center', color: C.ink, lineHeight: 14 },
  banner: { margin: 16, height: 150, borderRadius: 16, overflow: 'hidden', justifyContent: 'center' },
  bannerOv: { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: 'rgba(240,233,213,0.55)' },
  bannerTitle: { fontFamily: SERIF, fontSize: 26, fontWeight: '700', color: C.ink },
  bannerSub: { color: C.ink, marginTop: 6, marginBottom: 14, fontSize: 13, lineHeight: 18 },
  bannerBtn: { backgroundColor: C.ink, alignSelf: 'flex-start', paddingHorizontal: 22, paddingVertical: 11, borderRadius: 24 },
  pcard: { width: 150 },
  pimg: { height: 170, borderRadius: 12, backgroundColor: C.goldSoft, padding: 8, alignItems: 'flex-end' },
  heart: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' },
  ptitle: { fontSize: 13, fontWeight: '600', color: C.ink, marginTop: 8 },
  pbrand: { fontSize: 11, color: C.muted, marginTop: 2 },
  pprice: { fontSize: 15, fontWeight: '700', color: C.ink, marginTop: 4 },
  rimg: { width: 120, height: 120, borderRadius: 12, backgroundColor: C.goldSoft, padding: 8, alignItems: 'flex-end' },
});
