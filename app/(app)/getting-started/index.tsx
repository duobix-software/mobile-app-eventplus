import { getCategories } from "@/services/api/categories";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["categories"],
      queryFn: async ({ pageParam }) =>
        getCategories({
          urlTemplateParams: { page: pageParam},
        }),
      initialPageParam: 1,
      getNextPageParam: (lastpage, pages, lastPageParam) => {
        if (!lastpage.links.next) return undefined;
        return lastPageParam + 1;
      },
    });

    console.log(data)

  return (
    <SafeAreaView className="flex-1 bg-background">
      {status === "success" &&
        data.pages.map((group, idx) =>

          group.data.map((category) => (
            <>
              <Text key={category.slug} className="text-foreground">
                {category.name}
              </Text>
              {category.tags?.map(tag => (
                <Text key={tag.id} className="text-foreground">
                  {tag.name}
                </Text>
              ))}
            </>
          ))
        )}
    </SafeAreaView>
  );
}
