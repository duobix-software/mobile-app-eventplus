import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/authentication-ctx";

export default function AppLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
        <Stack.Screen name="events/[slug]" options={{ headerShown: false }} />
        <Stack.Screen name="checkout/index" options={{ headerShown: false }} />
        <Stack.Screen name="payment/index" options={{ headerShown: false }} />
        <Stack.Screen name="scan-nfc" />
      </Stack>
    </AuthProvider>
  );
}
