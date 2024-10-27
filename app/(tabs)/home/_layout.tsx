import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="categories" options={{ headerShown: false }} />
      <Stack.Screen name="events" options={{ headerShown: false }} />
      {/* <Stack.Screen name="category/[slug]" /> */}
      {/* <Stack.Screen name="allevents" />
      <Stack.Screen name="event" /> */}
    </Stack>
  );
}
