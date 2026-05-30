import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import useItem from "../hooks/useItem";
import { TYPES } from "../constants";
import { Item, ItemType } from "../types/types";
import { HomeStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ItemsList from "../components/ItemsList";
import ScreenContainer from "../components/ScreenContainer";

type NavProps = NativeStackNavigationProp<HomeStackParamList, "Home">;

type Props = {
  navigation: NavProps;
};

const HomeScreen: FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<ItemType>("libro");
  const { getByType, getFinished, deleteItem } = useItem();

  const data = getByType(activeTab);     

  const handleDelete = (item: Item) => {
    Alert.alert("Eliminar", `¿Eliminar "${item.title}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteItem(item.id),
      },
    ]);
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi lista</Text>
        {/* <TouchableOpacity
          style={styles.addBtn}
          // onPress={() => navigation.navigate('AddItem')}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>+ Agregar</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.tabBar}>
        {TYPES.map((type) => (
          <TouchableOpacity
            key={type.key}
            style={[styles.tab, activeTab === type.key && styles.tabActive]}
            onPress={() => setActiveTab(type.key as ItemType)}
            activeOpacity={0.75}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === type.key && styles.tabTextActive,
              ]}
            >
              {type.emoji} {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ItemsList data={data} navigation={navigation} handleDelete={handleDelete} activeTab={activeTab} />
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 25,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  addBtn: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  // Tabs
  tabBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "#EBEBEB",
    borderRadius: 12,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#1A1A1A",
    fontWeight: "700",
  }
});
