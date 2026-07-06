import { Text, View, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";

export function ShoppingListCard({ item }) {
  const [completed, setCompleted] = useState(false);
  const { name, id } = item;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setCompleted(!completed)}
        style={styles.leftSection}
      >
        {completed ? (
          <Feather name="check-circle" size={24} color="black" />
        ) : (
          <MaterialIcons
            name="radio-button-unchecked"
            size={24}
            color="black"
          />
        )}

        <Text style={styles.text}>{name}</Text>
      </Pressable>

      <Pressable
        onPress={() => alert(`Delete item with id: ${id}`)}
        hitSlop={10}
        style={styles.deleteBtn}
      >
        <AntDesign name="delete" size={24} color="red" />
      </Pressable>
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
    alignItems: "center",
  },

  leftSection: {
    flex: 1, // Makes the entire left side occupy remaining space
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  deleteBtn: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 20,
  },
});