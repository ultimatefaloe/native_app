import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { ShoppingListCard } from "../components/ShoppingListCard";
import { useShoppingList } from "@/hooks/useShoppingList.hook";

// export type TaskItems = {
//   id: string;
//   title: string;
//   isCompleted: boolean;
//   completedAt?: Date;
//   lastupdatedAt?: Date;
// };

export default function Index() {
  const [value, setValue] = useState("");
  const {
     shoppingList,
      createShoppingList,
      deleteShoppingList,
      updateShoppingList,
  } = useShoppingList();

  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item) => item.id.toString()}
      data={shoppingList}
      extraData={shoppingList}
      renderItem={({ item }) => (
        <ShoppingListCard
          item={item}
          onDelete={deleteShoppingList}
          onUpdate={updateShoppingList}
        />
      )}
      ListHeaderComponent={
        <View>
          <TextInput
            placeholder="Add a new task..."
            style={styles.input}
            value={value}
            onChangeText={setValue}
            returnKeyType="done"
            onSubmitEditing={() => {
              createShoppingList(value);
              setValue("");
            }}
          />
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyList}>
          <Text style={styles.emptyText}>Your Task List Is Empty</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "red",
  },
});
