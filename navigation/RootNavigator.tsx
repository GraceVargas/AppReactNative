import React from "react";
import { View, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../hooks/useAuth";
import HomeStack from "./HomeStack";
import SearchScreen from "../screens/SearchScreen";
import PersonScreen from "../screens/PersonScreen";
import { RootTabParamList } from "../types/navigation";
import AuthStack from "./AuthStack";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <AuthStack />;
  }

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"] = "help-outline";

          switch (route.name) {
            case "Inicio":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Buscar":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Perfil":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#6b7280",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 0,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Buscar" component={SearchScreen} options={{ tabBarBadge: 5 }} />
      <Tab.Screen name="Perfil" component={PersonScreen} options={{ tabBarLabel: "Mi cuenta" }} />
    </Tab.Navigator>
  );
}