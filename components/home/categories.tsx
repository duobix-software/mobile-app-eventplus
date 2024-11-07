import React from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api/categories";
import { Category as TCategory } from "@/types/category";
import { router } from "expo-router";
import { Skelton } from "../ui/skelton";

export default function Categories() {
  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["categories"],
      queryFn: async ({ pageParam }) =>
        getCategories({ urlTemplateParams: { page: pageParam } }),
      initialPageParam: 1,
      getNextPageParam: (lastpage, pages, lastPageParam) => {
        if (!lastpage.links.next) return undefined;
        return lastPageParam + 1;
      },
    });

  const handleScrollEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, layoutMeasurement, contentSize } =
        event.nativeEvent;
      const isCloseToEnd =
        contentOffset.x + layoutMeasurement.width >= contentSize.width - 100;

      if (isCloseToEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  return (
    <>
      <Text className="text-foreground font-medium text-lg">Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
        onScroll={handleScrollEnd}
        scrollEventThrottle={100}
      >
        {status === "pending" && (
          <View className="flex-row mt-4">
            <View className="items-center mx-2">
              <Skelton className="h-14 w-14 rounded-full mb-1" />
              <Skelton className="h-3 w-16 " />
            </View>
            <View className="items-center mx-2">
              <Skelton className="h-14 w-14 rounded-full mb-1" />
              <Skelton className="h-3 w-16 " />
            </View>
            <View className="items-center mx-2">
              <Skelton className="h-14 w-14 rounded-full mb-1" />
              <Skelton className="h-3 w-16 " />
            </View>
            <View className="items-center mx-2">
              <Skelton className="h-14 w-14 rounded-full mb-1" />
              <Skelton className="h-3 w-16 " />
            </View>
            <View className="items-center mx-2">
              <Skelton className="h-14 w-14 rounded-full mb-1" />
              <Skelton className="h-3 w-16 " />
            </View>
          </View>
        )}
        {status === "error" && (
          <Text className="text-red-600">An Error Occured</Text>
        )}
        {status === "success" &&
          data?.pages.map((group, idx) => (
            <React.Fragment key={idx}>
              {group.data.map((category) => (
                <Category key={category.slug} category={category} />
              ))}
            </React.Fragment>
          ))}
      </ScrollView>
    </>
  );
}

function Category({ category }: { category: TCategory }) {
  return (
    <TouchableOpacity
      className="items-center mx-2"
      onPress={() =>
        router.push({
          pathname: "/categories/[slug]",
          params: { slug: category.slug },
        })
      }
    >
      <Image
        source={{ uri: category.logo }}
        className="h-14 w-14 rounded-full mb-1"
      />
      <Text
        className="text-foreground text-xs w-16"
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}
