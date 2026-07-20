import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function ShoppingListCard({ item, onDelete, onUpdate }) {
  // const [checked, setChecked] = useState(false);
  const { name, id, isCompleted, createdAt, lastupdatedAt } = item;

  const deleteHandler = () => {
    Alert.alert(
      "Delete Shopping Item",
      `Are you sure you want to delete "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(id),
        },
      ],
    );
  };

  const toggleChecked = () => {
    // setChecked(!checked);
    onUpdate(id);
  };

  return (
    <Pressable
      onPress={toggleChecked}
      style={[styles.container, isCompleted && styles.completedContainer]}
    >
      <View style={styles.leftSection}>
        {isCompleted ? (
          <Feather name="check-circle" size={24} color="gray" />
        ) : (
          <MaterialIcons name="radio-button-unchecked" size={24} color="blue" />
        )}

        <View>
          <Text style={[styles.text, isCompleted && styles.strikethrough]}>
            {name}
          </Text>
          <Text
            style={[
              styles.dateTime,
              isCompleted && styles.completedDateTime,
            ]}
          >
            {isCompleted
              ? `Completed at: ${lastupdatedAt.toLocaleString()}`
              : `Created at: ${createdAt.toLocaleString()}`}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={deleteHandler}
        hitSlop={10}
        style={styles.deleteBtn}
      >
        <AntDesign name="delete" size={24} color="red" />
      </TouchableOpacity>
    </Pressable>
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

  // checkedContainer: {
  //   backgroundColor: "lightgray",
  // },
  completedContainer: {
    backgroundColor: "skyblue",
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
    color: "blue",
  },
  dateTime: {
    fontSize: 8,
    color: "blue",
  },

  strikethrough: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  completedDateTime: {
    color: "gray",
  },
});
