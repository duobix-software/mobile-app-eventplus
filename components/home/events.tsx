import React from "react";
import { getEvents } from "@/services/api/events";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Text, View, Image } from "react-native";
import { Event as TEvent } from "@/types/event";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Events() {
  const { data, status } = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: async ({ pageParam }) => getEvents({ data: { page: pageParam } }),
    initialPageParam: 1,
    getNextPageParam: (lastpage, pages, lastPageParam) => {
      if (!lastpage.links.next) return undefined;
      return lastPageParam + 1;
    },
  });

  return (
    <>
      <Text className="text-white font-medium text-lg">Upcoming events</Text>

      <View className="mt-4">
        {status === "pending" ? (
          <Text>Loading...</Text>
        ) : status === "success" ? (
          data.pages.map((group, idx) => (
            <React.Fragment key={idx}>
              {group.data.map((event) => (
                <Event key={event.slug} event={event} />
              ))}
            </React.Fragment>
          ))
        ) : (
          <Text className="text-red-600">An Error Occured</Text>
        )}
      </View>
    </>
  );
}

function Event({ event }: { event: TEvent }) {
  return (
    <View className="flex bg-zinc-800 rounded-lg overflow-hidden mb-3">
        <Image source={{ uri: event.banner }} className="h-28 w-full" />
        <View className="p-2">
          <Text className="text-white font-medium text-sm">{event.title}</Text>
          <View className="flex-row items-center">
            <Ionicons name="location-sharp" color={"#ea580c"} />
            <Text className="pl-0.5 text-white text-xs">Algiers, Algeria</Text>
          </View>
        </View>
      </View>
  );
}
