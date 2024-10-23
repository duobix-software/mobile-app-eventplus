import { StyleSheet, Image, Platform, View, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function TabTwoScreen() {
  return (
    <View className="flex justify-center items-center h-full">
      <Text className="text-2xl font-bold">Settings Screen</Text>
      <Link href="/login">
        <ThemedText type="link">Login</ThemedText>
      </Link>
    </View>
  );
}

// <ParallaxScrollView
//   headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//   headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
//   <ThemedView style={styles.titleContainer}>
//     <ThemedText type="title">Explore</ThemedText>
//   </ThemedView>
//   <ThemedText>This app includes example code to help you get started.</ThemedText>
// </ParallaxScrollView>
