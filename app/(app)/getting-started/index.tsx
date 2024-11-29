import React, { useState } from "react";
import { getCategories } from "@/services/api/categories";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { storeCustomerTags } from "@/services/api/tags";
import { Skelton } from "@/components/ui/skelton";
import { router } from "expo-router";

export default function Index() {
  const [start, setStart] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["categories"],
      queryFn: async ({ pageParam }) =>
        getCategories({
          urlTemplateParams: { page: pageParam, "with-tags": 1 },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastpage, pages, lastPageParam) => {
        if (!lastpage.links.next) return undefined;
        return lastPageParam + 1;
      },
    });

  const mutation = useMutation({
    mutationFn: (data: { tags: string[] }) => storeCustomerTags(data),
    onSuccess: () => {
      router.replace("/(auth)");
    },
  });

  const onSubmit = (data: Array<string>) => {
    // mutation.mutate(data);
    router.replace("/home");
  };

  const renderKeywordItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.itemContainer,
        selectedKeywords.includes(item.id) && styles.itemSelected,
      ]}
      onPress={() => toggleKeywordSelection(item.id)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const toggleKeywordSelection = (id: string) => {
    if (selectedKeywords.includes(id)) {
      setSelectedKeywords(selectedKeywords.filter((item) => item !== id));
    } else {
      setSelectedKeywords([...selectedKeywords, id]);
    }
  };

  if (!start) {
    return (
      <SafeAreaView className="flex-1 bg-background px-4 items-center justify-center">
        <View className="h-2/3 items-center justify-center gap-4">
          <View>
            <Image
              source={require("@/assets/images/logo/1000-1000.png")}
              className="h-40 w-40"
            />
          </View>
          <Text className="text-foreground text-2xl font-bold">
            Personalizing your experienceeee
          </Text>
        </View>
        <View className="h-1/3 justify-center items-center">
          <TouchableOpacity
            className="bg-primary px-8 py-3 rounded-3xl m-4 "
            onPress={() => setStart(true)}
          >
            <Text className="text-primary-foreground font-bold text-xl">
              Getting started
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <View className="my-5 border-b pb-2 border-muted">
        <Text className="text-foreground text-3xl font-bold">Interests</Text>
        <Text className="text-foreground">
          Pick things you'd like to seed in your home feed
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-5">
          {status === "pending" && (
            <>
              <View className="gap-2">
                <Skelton className="w-32 h-4" />
                <View className="flex-row flex-wrap gap-2">
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                </View>
              </View>
              <View className="gap-2">
                <Skelton className="w-32 h-4" />
                <View className="flex-row flex-wrap gap-2">
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                </View>
              </View>
              <View className="gap-2">
                <Skelton className="w-32 h-4" />
                <View className="flex-row flex-wrap gap-2">
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                </View>
              </View>
              <View className="gap-2">
                <Skelton className="w-32 h-4" />
                <View className="flex-row flex-wrap gap-2">
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                </View>
              </View>
              <View className="gap-2">
                <Skelton className="w-32 h-4" />
                <View className="flex-row flex-wrap gap-2">
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                </View>
              </View>
              <View className="gap-2">
                <Skelton className="w-32 h-4" />
                <View className="flex-row flex-wrap gap-2">
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                </View>
              </View>
              <View className="gap-2">
                <Skelton className="w-32 h-4" />
                <View className="flex-row flex-wrap gap-2">
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                </View>
              </View>
              <View className="gap-2">
                <Skelton className="w-32 h-4" />
                <View className="flex-row flex-wrap gap-2">
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                  <Skelton className="w-20 h-8" />
                </View>
              </View>
            </>
          )}

          {status === "success" &&
            data.pages.map((group, idx) => (
              <React.Fragment key={idx}>
                {group.data.map((category) => (
                  <View key={category.slug} className="gap-2">
                    <Text style={styles.sectionTitle}>{category.name}</Text>
                    <View className="flex-row flex-wrap">
                      {category.tags?.map((item) => renderKeywordItem(item))}
                    </View>
                  </View>
                ))}
              </React.Fragment>
            ))}
        </View>
      </ScrollView>
      {status === "error" && (
        <View className="h-1/2 justify-center items-center ">
          <Button
            variant="secondary"
            className="w-2/3"
            onPress={() => router.replace("/(app)/getting-started")}
          >
            <Text className="font-bold">Opss ... Try Again !</Text>
          </Button>
        </View>
      )}
      <View className="py-4 px-4 border-t border-border -mx-4">
        <Button onPress={() => onSubmit(selectedKeywords)}>
          <Text className="text-primary-foreground">Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#AAAAAA",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  listContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#1F1F1F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: "#333333",
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  itemSelected: {
    backgroundColor: "#0A84FF",
    borderColor: "#0A84FF",
  },
});
