import { SafeAreaView, Image, Text, View } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getDataByID } from "@/utils/api";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIndicator, Button, MD2Colors } from "react-native-paper";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useQuery } from "@tanstack/react-query";

export default function event() {
  const { slug } = useLocalSearchParams();
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["events", slug],
    queryFn: () => getDataByID("events", slug),
  });

  if (isLoading) {
    return (
      <ActivityIndicator
        className="flex justify-center items-center h-full"
        animating={true}
        color={MD2Colors.red800}
      />
    );
  }

  if (isError) {
    router.push("/error");
  }

  return (
    <SafeAreaView className="h-full">
      <>
        <Image source={{ uri: data.banner }} className="h-1/3" />
        <View className="mx-2 h-2/3 flex justify-between py-4">
          <View>
            <ThemedText type="subtitle">{data.title}</ThemedText>
            <ThemedText>{data.description}</ThemedText>
            <ThemedText type="defaultSemiBold">{data.price}</ThemedText>
          </View>
          <Button mode="contained" className="mx-10">
            <View className="flex items-end justify-center gap-4 flex-row">
              <TabBarIcon name="ticket" className="text-white" />
              <Text className="text-white font-bold">Buy Ticket</Text>
            </View>
          </Button>
        </View>
      </>
    </SafeAreaView>
  );
}
