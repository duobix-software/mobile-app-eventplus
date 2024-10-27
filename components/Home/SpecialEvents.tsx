import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Card } from "react-native-paper";
import { useQuery } from "react-query";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { getData } from "../../utils/api";
import { Link } from "expo-router";

export default function SpecialEvents() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => getData("events"),
  });

  return (
    <ThemedView>
      <View className="flex flex-row justify-between">
        <ThemedText type="subtitle">Special Events</ThemedText>
        <Link href="/home/events">
          <ThemedText className="text-sm">View All</ThemedText>
        </Link>
      </View>
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : data ? (
        <ScrollView horizontal={true} className="flex gap-4 my-3">
          {data.data.map((item: any) => (
            <Card key={item.slug} className="w-32">
              <Link href={`/home/events/${item.slug}`} asChild>
                <TouchableOpacity>
                  <ImageBackground
                    className="flex-1 justify-center"
                    source={{
                      uri: item.banner,
                    }}
                    resizeMode="cover"
                  >
                    <Card.Title
                      title={item.title + " title"}
                      subtitle={item.title + " sub"}
                    />
                    <Card.Content>
                      <Text>{item.title}</Text>
                    </Card.Content>
                  </ImageBackground>
                </TouchableOpacity>
              </Link>
            </Card>
          ))}
        </ScrollView>
      ) : (
        <Text>No data</Text>
      )}
    </ThemedView>
  );
}
