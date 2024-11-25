import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";

export default function ProfileLayout() {
  const colorScheme = useColorScheme().colorScheme;
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme == "dark" ? "#101012" : "#f6f6f6",
        },
        headerTintColor: colorScheme == "dark" ? "#FAFAFA" : "#020202",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Profile" }} />
      <Stack.Screen
        name="accountSettings"
        options={{ title: "Account Settings" }}
      />
    </Stack>
  );
}
