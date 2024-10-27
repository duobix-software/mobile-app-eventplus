import { ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Avatar } from "react-native-paper";
import { Link } from "expo-router";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { useQuery } from "react-query";
import { getData } from "../../utils/api";

type Categorie = {
  slug: string;
  name: string;
  descreption: string;
  logo: string;
  banner: string;
  tag_url: string;
  event_url: string;
};

export default function Categories() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getData("categories"),
  });

  return (
    <ThemedView>
      <View className="flex flex-row justify-between">
        <ThemedText type="subtitle">Categories</ThemedText>
        <Link href="/home/categories">
          <ThemedText className="text-sm">View All</ThemedText>
        </Link>
      </View>
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : data ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex gap-4"
        >
          {data.map((item: Categorie) => (
            <View key={item.slug} className="w-16">
              <Link href={`/home/categories/${item.slug}`} asChild>
                <TouchableOpacity>
                  <Avatar.Image
                    size={50}
                    // source={require("@/assets/images/icon.png")}
                    source={{ uri: item.logo }}
                  />
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
