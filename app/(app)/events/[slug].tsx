import React from "react";
import { getEventBySlug } from "@/services/api/events";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderForm from "@/components/events/order-form";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Event() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const { data, status } = useQuery({
    queryKey: ["event", slug],
    queryFn: () => getEventBySlug({ urlTemplateParams: { slug } }),
  });

  if (status === "pending") {
    return (
      <SafeAreaView className="flex-1">
        <Text className="text-white">Loading</Text>
      </SafeAreaView>
    );
  }

  if (status === "error") {
    return (
      <SafeAreaView>
        <Text className="text-red-600">An Error Occured</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="grow relative bg-background">
      <View className="h-64 relative">
        <Image source={{ uri: data.banner }} className="w-full h-full" />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(128, 128, 128, 0.6)",
            opacity: 0.7,
            height: insets.top,
          }}
        />
        <TouchableOpacity
          className="absolute top-10 left-5 bg-zinc-800 rounded-full p-2"
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="mx-4 mt-4">
        <Text className="text-foreground text-lg font-medium">{data.title}</Text>
        {data.address && (
          <View className="flex-row items-center">
            <Ionicons name="location-sharp" size={16} color="#ea580c" />
            <Text className="text-foreground text-sm ml-1">
              {data.address.city && data.address.city + ", "}
              {data.address.state && data.address.state + ", "}
              {data.address.country && data.address.country}
            </Text>
          </View>
        )}

        <View className="flex-row justify-around border-b border-b-gray-600 p-2 mt-4">
          <Text className="text-foreground text-sm">About</Text>
          <Text className="text-foreground text-sm">Review</Text>
          <Text className="text-foreground text-sm">Photo</Text>
          <Text className="text-foreground text-sm">Video</Text>
        </View>

        <Text className="text-foreground text-lg mt-4">Description</Text>
        <Text className="text-sm text-foreground">{data.description}</Text>
      </View>

      <View className="mx-4 mb-4 absolute bottom-0 left-0 right-0">
        <TouchableOpacity
          className="items-center py-2 bg-primary dark:bg-primary rounded disabled:opacity-50"
          activeOpacity={0.8}
          onPress={() => bottomSheetRef.current?.snapToIndex(0)}
        >
          <Text className="text-white font-medium">Order Ticket</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["70%"]}
        index={-1}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
        )}
        backgroundComponent={(props) => (
          <View className="bg-sheet rounded-t-3xl" {...props} />
        )}
      >
        <OrderForm event={data} bottomSheetRef={bottomSheetRef} />
      </BottomSheet>
    </View>
  );
}
