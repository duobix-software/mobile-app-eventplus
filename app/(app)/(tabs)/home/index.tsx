import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "@/components/Home/Categories";
import Header from "@/components/Home/Header";
import SpecialEvents from "@/components/Home/SpecialEvents";
import PopulaireEvents from "@/components/Home/PopulaireEvents";
import { ActivityIndicator, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/services/api/events";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const { data, isPending, isSuccess } = useQuery({
    queryFn: getEvents,
    queryKey: ["events"],
  });

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header />
        <Categories />

        {isPending ? (
          <ActivityIndicator animating={true} />
        ) : isSuccess ? (
          <ScrollView className="flex gap-4">
            {data.data.map((event) => (
              <View key={event.slug}>
                <Link href={`/events/${event.slug}`} className="text-red-200">
                  Voir event {event.title}
                </Link>
              </View>
            ))}
          </ScrollView>
        ) : (
          <ThemedText>something went wrong</ThemedText>
        )}
        {/* <SpecialEvents /> */}
        {/* <PopulaireEvents /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
