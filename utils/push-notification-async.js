import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      showBadge: false,
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      return status;
    } else {
      return existingStatus;
    }
  } else {
    return null;
  }
}








  // const handleRequestNotification = async () => {
  //   const result = await registerForPushNotificationsAsync();
  //   console.log("Notification permission result:", result);
  // };

  // const handleScheduleNotification = async () => {
  //   const result = await registerForPushNotificationsAsync();
  //   if (result === "granted") {
  //     await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: "I'm a notification from your app! 📨",
  //       },
  //       trigger: {
  //         type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
  //         seconds: 5,
  //       },
  //     });
  //   } else {
  //     Alert.alert(
  //       "Unable to schedule notification",
  //       "Enable the notifications permission for Expo Go in settings",
  //     );
  //   }
  // };