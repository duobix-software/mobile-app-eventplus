import { Link, Stack } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

export default function Register() {
  return (
    <>
      <Stack.Screen options={{ title: "Register!" }} />
      <ThemedView>
        <ThemedText type="title">Register.</ThemedText>
        <Link href="/home">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
