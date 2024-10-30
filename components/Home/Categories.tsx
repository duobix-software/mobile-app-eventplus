import React from "react";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, MD2Colors, Avatar } from "react-native-paper";
import { getCategories } from "@/services/api/categories";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function Categories() {
  const { data, isPending, isSuccess } = useQuery({
    queryFn: getCategories,
    queryKey: ["categories"],
  });

  return (
    <ThemedView>
      <View className="flex flex-row justify-between">
        <ThemedText type="subtitle">Categories</ThemedText>
        <Link href="/home/categories">
          <ThemedText className="text-sm">View All</ThemedText>
        </Link>
      </View>

      {isPending ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : isSuccess ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex gap-4"
        >
          {data.data.map((item) => (
            <View key={item.slug} className="w-16">
              <Link href={`/home/categories/${item.slug}`} asChild>
                <TouchableOpacity>
                  <Avatar.Image size={50} source={{ uri: item.logo }} />
                  <ThemedText
                    className="text-lg"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ThemedText>No categories found</ThemedText>
      )}
    </ThemedView>
  );
}
