import { ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Avatar } from "react-native-paper";
import { Link } from "expo-router";
import { useQuery } from "react-query";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { getData } from "../../utils/api";

type Category = {
  slug: string;
  name: string;
  descreption: string;
  logo: string;
  banner: string;
  tag_url: string;
  event_url: string;
};

export default function Categorys() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categorys"],
    queryFn: () => getData("categories"),
  });

  return (
    <ThemedView>
      <View className="flex flex-row justify-between">
        <ThemedText type="subtitle">Categorys</ThemedText>
        <Link href="/home/categorys">
          <ThemedText className="text-sm">View All</ThemedText>
        </Link>
      </View>
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex gap-4"
        >
          {data.map((item: Category) => (
            <View key={item.slug} className="w-16">
              <Link href={`/home/categorys/${item.slug}`} asChild>
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
      )}
    </ThemedView>
  );
}
