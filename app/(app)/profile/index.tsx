import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useUser } from "@/context/authentication-ctx";
import { Avatar, Button } from "react-native-paper";
import { getInitials } from "@/utils/helpers";
import { useSession } from "@/context/session-ctx";
import { router } from "expo-router";

export default function Profile() {
  const { user, isLoading } = useUser();
  const { logout } = useSession();

  if (isLoading) {
    return (
      <View className="h-full flex justify-center">
        <ActivityIndicator size="large" color={"#007BFF"}></ActivityIndicator>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-col gap-4 h-full mx-4 -my-2">
      <View className="flex flex-row  items-center gap-4">
        <View>
          {user?.picture ? (
            <Avatar.Image source={{}} />
          ) : (
            <View className="bg-primary flex justify-center items-center size-20 rounded-full">
              <Text className="text-primary-foreground  text-4xl">
                {getInitials(user?.fullname)}
              </Text>
            </View>
          )}
        </View>
        <View>
          <Text className="font-bold text-3xl">{user.fullname}</Text>
          <Text className="text-sm text-muted">{user.email} </Text>
          <Text className="text-sm text-muted">{user.phone} </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push("profile/accountSettings")}
        className="border-b px-4 py-2 rounded-lg "
      >
        <Text className="text-xl">Account Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity className="border-b px-4 py-2 rounded-lg ">
        <Text className="text-xl">Support</Text>
      </TouchableOpacity>
      <TouchableOpacity className="border-b px-4 py-2 rounded-lg ">
        <Text className="text-xl">FAQ</Text>
      </TouchableOpacity>
      <View className="mt-auto mb-5">
        <Button
          onPress={() => {
            logout();
            router.replace("/auth");
          }}
        >
          <Text>Logout</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
