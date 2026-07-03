import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { ShoppingListCard } from "../components/ShoppingListCard";

// Move header component outside
// const ListHeader = ({ value, setValue, handleSubmit }) => (
//   <View>
//     <TextInput
//       placeholder="Add a new task..."
//       style={styles.input}
//       value={value}
//       onChangeText={setValue}
//       returnKeyType="done"
//       onSubmitEditing={() => {
//         handleSubmit(value);
//         setValue("");
//       }}
//     />
//   </View>
// );

const ListFooter = () => <Text style={[styles.listHeader]}>End of List</Text>;

export default function Index() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState([ ])

  const handleSubmit = (data) => {
    console.log("Adding:", data);
    setShoppingList([...shoppingList, { id: shoppingList.length + 1, name: data }]);
  };

  // useEffect(() => {
  //   console.log("Shopping List Updated:", shoppingList);
  // }, [shoppingList]);

  return (
    <FlatList
      style={styles.container}
      keyExtractor={(item) => item.id.toString()}
      data={shoppingList}
      extraData={shoppingList}
      renderItem={({ item }) => <ShoppingListCard item={item} />}
      ListHeaderComponent={
        <View>
          <TextInput
            placeholder="Add a new task..."
            style={styles.input}
            value={value}
            onChangeText={setValue}
            returnKeyType="done"
            onSubmitEditing={() => {
              handleSubmit(value);
              setValue("");
            }}
          />
        </View>
      }
      ListFooterComponent={<ListFooter />}
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
});
