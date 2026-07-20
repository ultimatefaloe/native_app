import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerRight: () => (
            <Link href="/profile/settings" style={{ marginRight: 10 }}>
              Settings
            </Link>
          ),
          headerLeft: () => (
            <Link href="/" style={{ marginRight: 10 }}>
              Back
            </Link>
          ),
        }}
      />
      <Stack.Screen name="profile/settings" options={{ title: "Settings" }} />
    </Stack>
  );
}
