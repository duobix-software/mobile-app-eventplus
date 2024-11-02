import React from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api/categories";
import { Category as TCategory } from "@/types/category";
import { Link } from "expo-router";

export default function Categories() {
  const {
    data,
    status,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["categories"],
    queryFn: async ({ pageParam }) =>
      getCategories({ data: { page: pageParam } }),
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
        contentOffset.x + layoutMeasurement.width >= contentSize.width - 20;

      if (isCloseToEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  return (
    <>
      <Text className="text-white font-medium text-lg">Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-4"
        onScroll={handleScrollEnd}
        scrollEventThrottle={400}
      >
        
        {status === "pending" ? (
          <Text>Loading...</Text>
        ) : status === "success" ? (
          data?.pages.map((group, idx) => (
            <React.Fragment key={idx}>
              {group.data.map((category) => (
                <Category key={category.slug} category={category} />
              ))}
            </React.Fragment>
          ))
        ) : (
          <Text className="text-red-600">An Error Occured</Text>
        )}
      </ScrollView>
    </>
  );
}

function Category({ category }: { category: TCategory }) {
  return (
    <Link href={{pathname: "/categories/[slug]", params: {slug: category.slug}}} >
    <View className="items-center mx-2">
      <Image
        source={{ uri: category.logo }}
        className="h-14 w-14 rounded-full mb-1"
        />
      <Text
        className="text-white text-xs w-16"
        ellipsizeMode="tail"
        numberOfLines={1}
        >
        {category.name}
      </Text>
    </View>
        </Link>
  );
}
