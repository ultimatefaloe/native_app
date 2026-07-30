import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

const AlbumForm = ({ album, handleSubmit, handleUpdate }) => {
  const [title, setTitle] = useState(album ? album.title : "");

  const saveHandler = async (id) => {
    const payload = {
      title,
      userId: 10,
    };

    if (album && album.id) {
      handleUpdate(album.id, payload);
    } else {
      await handleSubmit(payload);
    }
  };

  return (
    <View>
      <View style={styles.modalContent}>
        <View>
          <Text>Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            placeholder="Enter album title"
            onChangeText={(t) => setTitle(t)}
            keyboardType="default"
            returnKeyType="done"
          />
        </View>

        <Button
          style={[styles.button]}
          onPress={saveHandler}
          title="Save Album"
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
