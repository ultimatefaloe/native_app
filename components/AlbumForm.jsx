import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const AlbumForm = ({ refetch, onClose }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    const payload = {
      title,
      userId: 10,
    };

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Added album:", data);
      refetch(); // Call the refetch function to update the album list
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  return (
    <View>
      <View style={styles.modalContent}>
        <View>
          <Text>Title:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter album title"
            onChangeText={(t) => setTitle(t)}
            keyboardType="default"
            returnKeyType="done"
          />
        </View>

        <Button
          style={[styles.button]}
          onPress={handleSubmit}
          title="Add Album"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: "85%",
    height: 80, // Explicit, reduced height
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    gap: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AlbumForm;
