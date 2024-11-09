import React from "react";
import { Redirect, Stack } from "expo-router";
import { AuthProvider } from "@/context/authentication-ctx";
import { useSession } from "@/context/session-ctx";

export default function AppLayout() {
  const { session } = useSession();

  if (!session) return <Redirect href="/auth" />;

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="events/[slug]" options={{ headerShown: false }} />
        <Stack.Screen
          name="categories/[slug]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="checkout/payment"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="checkout/success"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="checkout/failure"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="getting-started/index"
          options={{ headerShown: false }}
        />
      </Stack>
    </AuthProvider>
  );
}
