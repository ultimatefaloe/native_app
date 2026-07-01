import { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { ShoppingListCard } from "../components/ShoppingListCard";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const shoppingList = [
    { id: 1, name: "Coffee" },
    { id: 2, name: "Milk" },
    { id: 3, name: "Sugar" },
    { id: 4, name: "Bread" },
    { id: 5, name: "Eggs" },
    { id: 6, name: "Butter" },
    { id: 7, name: "Cheese" },
    { id: 8, name: "Yogurt" },
    { id: 9, name: "Orange Juice" },
    { id: 10, name: "Cereal" },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const onEndReached = () => {
    // loadingNewData({ page: 2, limit: 50 });
    console.log('Load new data when end of list is reached');
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        data={shoppingList}
        renderItem={({ item }) => <ShoppingListCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <Text style={[styles.listHeader]}>Shopping List</Text>
        )}
        ListFooterComponent={() => (
          <Text style={[styles.listHeader]}>End of List</Text>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "skyblue" }} />
        )}
        // numColumns={4}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={onEndReached} // pagination
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    fontSize: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: "skyblue",
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  listHeader: {
    color: "blue",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center",
  },
});
