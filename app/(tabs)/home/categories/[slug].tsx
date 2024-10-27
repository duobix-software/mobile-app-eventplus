import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function categorie() {
  const { slug } = useLocalSearchParams();

  return (
    <View>
      <Text>{slug}</Text>
    </View>
  );
}
