import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Success() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="justify-around h-full">
        <View className="flex flex-col justify-center items-center ">
          <Ionicons color="green" name="checkmark-circle" size={150} />
          <Text className="text-3xl font-bold">Payment Success !</Text>
        </View>
        <View className="items-center">
          <TouchableOpacity
            className="bg-primary items-center w-2/3 px-8 py-3 rounded-3xl m-4 "
            onPress={() => router.back()}
          >
            <Text className="text-primary-foreground font-bold text-xl">
              Book another ticket !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
