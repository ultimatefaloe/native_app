import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Shopping List"}} />
      <Tabs.Screen name="profile" options={{ title: "Profile", headerShown: false }} />
      {/* <Tabs.Screen name="profile/settings" options={{ title: "Settings" }} /> */}
    </Tabs>
  )
}
