import { StyleSheet, Image, Platform, View, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function settings() {
  return (
    <View className="flex justify-center items-center h-full">
      <Text className="text-2xl font-bold">Settings Screen</Text>
      <Link href="/settings/profile">
        <ThemedText type="link">Profile</ThemedText>
      </Link>
      <Link href="/login">
        <ThemedText type="link">Login</ThemedText>
      </Link>
    </View>
  );
}
