import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function setting() {
  const { slug } = useLocalSearchParams();

  return (
    <View>
      <Text>{slug}</Text>
    </View>
  );
}
