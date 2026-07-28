import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Modal,
} from "react-native";
import AlbumCard from "../../components/AlbumCard";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import AlbumForm from "@/components/AlbumForm";

export default function Album() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchAlbums = async () => {
    setIsLoading(true);
    await fetch("https://jsonplaceholder.typicode.com/albums?userId=10")
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
      })
      .catch((err) => {
        console.error("Error fetching albums:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useState(() => {
    fetchAlbums();
  }, []);

  const deleteAlbum = () => {};
  const updateAlbum = () => {};

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading Albums...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 20,
        }}
        style={styles.container}
        keyExtractor={(item) => item.id}
        data={albums}
        extraData={albums}
        renderItem={({ item }) => (
          <AlbumCard
            album={item}
            onDelete={deleteAlbum}
            onUpdate={updateAlbum}
          />
        )}
        ListLoadingComponent={
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>Loading Albums...</Text>
          </View>
        }
      />

      <Pressable
        onPress={() => setIsModalVisible(true)}
        style={styles.fabButton}
      >
        <Feather name="plus-circle" size={24} color="#ffffff" />
      </Pressable>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
        style={styles.backdrop}
      >
        <View>
          <Pressable
            onPress={() => setIsModalVisible(false)}
            style={[styles.closeModal]}
          >
            <AntDesign name="close-circle" size={24} color="black" />
          </Pressable>
        </View>

        <AlbumForm refetch={fetchAlbums} onClose={() => setIsModalVisible(false)} />
      </Modal>
    </View>
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  fabButton: {
    position: "absolute",
    bottom: 24, // Positioned near bottom
    right: 20, // Positioned near left
    backgroundColor: "#2563eb", // Matching the blue theme
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    height: 80, // Explicit, reduced height
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    gap: 10,
  },
  closeModal: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
