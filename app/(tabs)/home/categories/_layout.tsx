import { Stack } from "expo-router";

export default function CategorieLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="[slug]" />
    </Stack>
  );
}
