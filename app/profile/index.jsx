import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { registerForPushNotificationsAsync } from "../../utils/push-notification-async";
import * as Notifications from "expo-notifications";

const Profile = () => {
  const handleRequestNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log("Notification permission result:", result);
  };

  const handleScheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      console.log("Scheduling notification...");
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I'm a notification from your app! 📨",
          // description: "This is a test notification scheduled from the Profile screen.",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    } else {
      Alert.alert(
        "Permission denied",
        "You need to grant notification permissions to schedule notifications.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.secondary]}
        onPress={handleRequestNotification}
      >
        <Text style={styles.text2}>Request for Push Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.primary]}
        onPress={handleScheduleNotification}
      >
        <Text style={styles.text}>Schedule Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  primary: {
    backgroundColor: "blue",
  },
  secondary: {
    borderColor: "blue",
    borderWidth: 1,
  },
  text: {
    color: "white",
  },
  text2: {
    color: "blue",
  },
});
