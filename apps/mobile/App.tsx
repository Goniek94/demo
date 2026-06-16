import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { C, SERIF } from './src/theme';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { SearchScreen, SellScreen, FavoritesScreen, ProfileScreen } from './src/screens/StubScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: C.bg, card: C.surface, border: C.line, primary: C.gold, text: C.ink },
};

const ICONS: Record<string, string> = { Home: '⌂', Szukaj: '⌕', Ulubione: '♡', Profil: '☺' };

function Header() {
  return (
    <View style={s.header}>
      <Text style={{ fontSize: 18 }}>🧥</Text>
      <Text style={s.logo}>ModaMarket</Text>
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header />,
        tabBarActiveTintColor: C.gold,
        tabBarInactiveTintColor: C.muted,
        tabBarStyle: { backgroundColor: C.surface, borderTopColor: C.line, height: 64, paddingBottom: 8, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 10 },
        tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>{ICONS[route.name] ?? '•'}</Text>,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Szukaj" component={SearchScreen} />
      <Tab.Screen
        name="Dodaj"
        component={SellScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...(props as any)} style={s.addBtn}>
              <Text style={{ color: '#fff', fontSize: 26 }}>＋</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Ulubione" component={FavoritesScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: C.bg, paddingTop: 54, paddingBottom: 12, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 8, borderBottomWidth: 1, borderBottomColor: C.line },
  logo: { fontFamily: SERIF, fontSize: 20, fontWeight: '700', color: C.ink },
  addBtn: { top: -16, width: 52, height: 52, borderRadius: 26, backgroundColor: C.gold, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
});
