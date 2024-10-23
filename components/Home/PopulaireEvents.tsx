import { ImageBackground, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Avatar, Card, Button } from "react-native-paper";
import { useQuery } from "react-query";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { getData } from "../../utils/api";

export default function PopulaireEvents() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => getData("events"),
  });
  const events = [
    "Sport",
    "Funny",
    "Marketing",
    "Islamic",
    "Expos",
    "Sport",
    "Funny",
    "Marketing",
    "Islamic",
    "Expos",
  ];
  return (
    <ThemedView>
      <View className="flex flex-row justify-between">
        <ThemedText type="subtitle">Populaire Events</ThemedText>
        <ThemedText className="text-sm">View All</ThemedText>
      </View>
      {/* <ScrollView className="flex gap-4 my-3"> */}
      {isLoading ? (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      ) : (
        data.data.map((item: any) => (
          <Card key={item.slug} className="flex my-2">
            <ImageBackground
              className="flex-1 justify-center"
              source={{ uri: item.banner }}
              resizeMode="cover"
            >
              <Card.Title
                title={item.title + " title"}
                subtitle={item.title + " sub"}
                // left={<Text>Card content</Text>}
              />
              <Card.Content>
                <Text>{item.title}</Text>
              </Card.Content>
            </ImageBackground>
          </Card>
        ))
      )}
      {/* </ScrollView> */}
    </ThemedView>
  );
}
