import React from "react";
import { getOrders } from "@/services/api/order";
import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PendingBookings() {
  const { data, status } = useInfiniteQuery({
    queryKey: ["orders", "pending"],
    queryFn: async ({ pageParam }) =>
      getOrders({ urlTemplateParams: { page: pageParam, status: "pending" } }),
    initialPageParam: 1,
    getNextPageParam: (lastpage, pages, lastPageParam) => {
      if (!lastpage.links.next) return undefined;
      return lastPageParam + 1;
    },
  });

  return (
    <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
      {status === "pending" && <Text className="text-foreground">Loading</Text>}
      {status === "error" && (
        <Text className="text-red-600">An Error Occured</Text>
      )}
      {status === "success" && (
        <>
          {data.pages.map((group, idx) => (
            <React.Fragment key={idx}>
              {group.data.map((order) => (
                <TouchableOpacity
                  key={order.id}
                  activeOpacity={0.8}
                  className="bg-card rounded-lg px-4 py-2 overflow-hidden mb-2 w-full"
                  onPress={() =>
                    router.push({
                      pathname: "/events/[slug]",
                      params: { slug: order.event.slug },
                    })
                  }
                >
                  <View>
                    <Text className="text-foreground text-lg">
                      {order.event.title}
                    </Text>
                    <Text className="pl-0.5 text-foreground text-sm">
                      {order.event.date}
                    </Text>
                    <View className="flex flex-row">
                      <Ionicons name="location" size={16} color="#FF685C" />
                      <Text className="pl-0.5 text-muted text-xs">
                        {order.event.address.address}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </React.Fragment>
          ))}
        </>
      )}
    </ScrollView>
  );
}
