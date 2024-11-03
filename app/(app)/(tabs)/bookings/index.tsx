import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function bookings() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <SafeAreaView className="flex-1 px-4">
      <View className="flex-row items-center justify-start m-2  container">
        <Text className="text-2xl font-bold">My Bookings</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        className="h-full"
      >
        {data.map((item) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/bookings/[slug]",
                params: { slug: "event.slug" },
              })
            }
            activeOpacity={0.7}
            key={item}
            className="flex bg-card rounded-lg px-4 py-2 overflow-hidden mb-2 mx-2 w-full"
          >
            <View className="">
              <Text className="text-foreground font-bold text-2xl">
                Event name
              </Text>
              <Text className="pl-0.5 text-foreground text-sm">10-12-2024</Text>
              <View className="flex flex-row">
                <Ionicons name="location" size={16} color="#FF685C" />
                <Text className="pl-0.5 text-muted text-xs">
                  Salle Atlas Alger, Algeria
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

StyleSheet.create({
  container: {},
});
