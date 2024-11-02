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
        <Stack.Screen name="categories/[slug]" options={{ headerShown: false }} />
        <Stack.Screen name="checkout/payment" options={{ headerShown: false }} />
        <Stack.Screen name="checkout/success" options={{headerShown: false}} />
        <Stack.Screen name="checkout/failure" options={{headerShown: false}} />
        <Stack.Screen name="scan-nfc" options={{headerShown: false}} />
      </Stack>
    </AuthProvider>
  );
}
