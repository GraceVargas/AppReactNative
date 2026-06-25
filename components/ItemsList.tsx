import React, { FC } from "react";
import { StyleSheet, FlatList } from "react-native";
import { EmptyState } from "../components/EmptyState";
import { ItemCard } from "../components/ItemCard";
import { ItemType } from "../types/types";

type Props = {
  data: any[];
  navigation: any;
  handleDelete: (item: any) => void;
  activeTab: ItemType;
};

const ItemsList: FC<Props> = ({ data, navigation, handleDelete, activeTab }) => {

    return (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <ItemCard
                variant="item"
                item={item}
                onPress={() =>
                  navigation.navigate("ItemDetail", { itemId: item.id })
                }
                onDelete={() => handleDelete(item)}
              />
            )}
            ListEmptyComponent={
              <EmptyState tab={activeTab} navigation={navigation} />
            }
          />
    );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});


export default ItemsList;