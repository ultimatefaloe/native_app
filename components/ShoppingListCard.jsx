import { Text, View, StyleSheet } from "react-native";

export function ShoppingListCard({ item }) {
  const { name, id } = item;
  return (
    <View >
      <Text style={[styles.text]}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: "skyblue",
    paddingHorizontal: 20,
    paddingVertical: 10,
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
