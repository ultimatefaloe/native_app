import { Text, View, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export function ShoppingListCard({ item }) {
  const { name, id } = item;
  return (
    <View style= {[styles.container]}> 
      <Text style={[styles.text]}>{name}</Text>
      <AntDesign name="delete" size={24} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "skyblue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  text: {
    fontSize: 20,
    
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
