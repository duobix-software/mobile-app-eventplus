import React from "react";
import { getCategories } from "@/services/api/categories";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { storeCustomerTags } from "@/services/tags";
import { Skelton } from "@/components/ui/skelton";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/utils/utils";

export default function Index() {
  const { control, handleSubmit } = useForm<{ tags: string[] }>({
    defaultValues: {
      tags: [],
    },
  });

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
    onSuccess: () => {},
  });

  const onSubmit = (data: { tags: string[] }) => {
    mutation.mutate(data);
  };

  if (mutation.status === "idle") {
    return (
      <SafeAreaView className="flex-1 bg-background px-4 items-center justify-center">
        <View>
          <Image
            source={require("@/assets/images/logo/1000-1000.png")}
            className="h-40 w-40"
          />
        </View>
        <Text className="text-foreground text-2xl font-medium">
          Personalizing your experience
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-5">
          <Text className="text-foreground text-lg font-medium">Interests</Text>
          <Text className="text-foreground">
            Pick things you'd like to seed in your home feed
          </Text>
        </View>
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
                    <Text className="text-foreground">{category.name}</Text>
                    <View className="flex-row flex-wrap gap-2">
                      {category.tags?.map((tag) => (
                        <Controller
                          key={tag.id}
                          control={control}
                          name="tags"
                          render={({ field: { onChange, value } }) => {
                            const isSelected = React.useMemo(
                              () => value.includes(tag.id),
                              [value.includes(tag.id)]
                            );
                            return (
                              <Button
                                key={tag.id}
                                variant="secondary"
                                onPress={() => {
                                  const selected = [...value];
                                  if (isSelected) {
                                    selected.splice(
                                      selected.indexOf(tag.id),
                                      1
                                    );
                                  } else {
                                    selected.push(tag.id);
                                  }
                                  console.log(selected);
                                  onChange(selected);
                                }}
                                className={cn(
                                  isSelected && "border border-primary"
                                )}
                              >
                                <Text className="text-gray-50">{tag.name}</Text>
                              </Button>
                            );
                          }}
                        />
                      ))}
                    </View>
                  </View>
                ))}
              </React.Fragment>
            ))}
        </View>
      </ScrollView>
      <View className="py-4 px-4 border-t border-border -mx-4">
        <Button onPress={handleSubmit(onSubmit)}>
          <Text className="text-primary-foreground">Continue</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
