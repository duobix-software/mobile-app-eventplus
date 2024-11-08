import React from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Events from "@/components/home/events";
import Categories from "@/components/home/categories";
import { router } from "expo-router";

export default function HomeScreen() {
  const [endReached, setEndReached] = React.useState(false);

  const handleScrollEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, layoutMeasurement, contentSize } =
        event.nativeEvent;

      const isCloseToEnd =
        contentOffset.y + layoutMeasurement.height >= contentSize.height - 300;

      if (isCloseToEnd) {
        setEndReached(true);
        return;
      }

      setEndReached(false);
    },
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="px-4"
        showsVerticalScrollIndicator={false}
        onScroll={handleScrollEnd}
        scrollEventThrottle={100}
      >
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-2 py-1">
            <Ionicons name="search-outline" size={20} color="#aaa" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#aaa"
              className="flex-1 text-forground ps-2 caret-secondary"
            />
          </View>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Image
                source={require("@/assets/images/duobix.png")}
                className="flex-1 h-10 w-10 rounded-full"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Categories />
        </View>

        <View className="mt-6">
          <Events isEndReached={endReached} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
