import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/authentication-ctx";

export default function AppLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
        <Stack.Screen name="scan-nfc" />
      </Stack>
    </AuthProvider>
  );
}
