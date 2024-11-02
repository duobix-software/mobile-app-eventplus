import React from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "@/components/home/categories";
import Events from "@/components/home/events";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-4">
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1 flex-row items-center bg-[#333] rounded-lg px-2 py-1">
            <Ionicons name="search-outline" size={20} color="#aaa" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#aaa"
              className="flex-1 text-white ps-2 caret-gray-200"
            />
          </View>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("@/assets/images/temp/avatar.jpg")}
                className="flex-1 h-10 w-10 rounded-full"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-6">
          <Categories />
        </View>

        <View className="mt-6">
          <Events />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
