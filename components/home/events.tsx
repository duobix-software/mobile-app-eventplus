import React from "react";
import { getEvents } from "@/services/api/events";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Event as TEvent } from "@/types/event";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Skelton } from "../ui/skelton";

export default function Events({ isEndReached }: { isEndReached: boolean }) {
  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["events"],
      queryFn: async ({ pageParam }) =>
        getEvents({ urlTemplateParams: { page: pageParam } }),
      initialPageParam: 1,
      getNextPageParam: (lastpage, pages, lastPageParam) => {
        if (!lastpage.links.next) return undefined;
        return lastPageParam + 1;
      },
    });

  React.useEffect(() => {
    if (isEndReached && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isEndReached]);

  return (
    <>
      <Text className="text-foreground font-medium text-lg">
        Upcoming events
      </Text>

      <View className="mt-4">
        {status === "pending" && (
          <>
            <Skelton className="w-full h-32 mb-3" />
            <Skelton className="w-full h-32 mb-3" />
            <Skelton className="w-full h-32 mb-3" />
            <Skelton className="w-full h-32 mb-3" />
            <Skelton className="w-full h-32" />
          </>
        )}
        {status === "error" && (
          <Text className="text-red-600">An error occured</Text>
        )}
        {status === "success" && (
          <>
            {data.pages.map((group, idx) => (
              <React.Fragment key={idx}>
                {group.data.map((event) => (
                  <Event key={event.slug} event={event} />
                ))}
              </React.Fragment>
            ))}

            {isFetchingNextPage && (
              <ActivityIndicator className="color-foreground mb-4" />
            )}
          </>
        )}
      </View>
    </>
  );
}

function Event({ event }: { event: TEvent }) {
  return (
    <TouchableOpacity
      className="flex bg-card rounded-lg overflow-hidden mb-3"
      onPress={() =>
        router.push({
          pathname: "/events/[slug]",
          params: { slug: event.slug },
        })
      }
      activeOpacity={0.7}
    >
      <Image source={{ uri: event.banner }} className="h-28 w-full" />
      <View className="p-2">
        <Text className="text-foreground font-medium text-sm mb-1">
          {event.title}
        </Text>
        {event.address && (
          <View className="flex-row items-center">
            <Ionicons name="location-sharp" color={"#ea580c"} />
            <Text className="pl-0.5 text-foreground text-xs">
              {event.address.city && event.address.city + ", "}
              {event.address.state && event.address.state + ", "}
              {event.address.country && event.address.country}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
