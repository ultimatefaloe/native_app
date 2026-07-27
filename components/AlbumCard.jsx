import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Example album prop structure:
// { "id": 1, "title": "quidem molestiae enim" }

const AlbumCard = ({ album, onDelete, onUpdate }) => {
  const { id, title } = album;
  console.log(album);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>#{id}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.updateButton]} 
          onPress={() => onUpdate && onUpdate(album)}
          activeOpacity={0.7}
        >
          <Text style={styles.updateButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => onDelete && onDelete(album.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#1e40af', // Deep Blue
    // Shadow for iOS
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Elevation for Android
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  badge: {
    backgroundColor: '#dbeafe', // Light Blue Accent
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 10,
  },
  badgeText: {
    color: '#1e40af',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#071d42', // Dark Slate
    flex: 1,
    textTransform: 'capitalize',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  updateButton: {
    backgroundColor: '#2563eb', // Vibrant Blue
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#eff6ff', // Soft Blue tint
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  deleteButtonText: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default AlbumCard;