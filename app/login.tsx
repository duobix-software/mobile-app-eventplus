import { Link, Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: "Login!" }} />
      <ThemedView >
        <ThemedText type="title">Login.</ThemedText>
        <Link href="/home">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
