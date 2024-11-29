import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { useUser } from "@/context/authentication-ctx";
import { getInitials } from "@/utils/helpers";
import { useSession } from "@/context/session-ctx";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, isUserLoading } = useUser();
  const { logout } = useSession();

  if (isUserLoading) {
    return (
      <View className="h-full flex justify-center">
        <ActivityIndicator size="large" color={"#007BFF"}></ActivityIndicator>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-col gap-4 h-full px-4 py-2 bg-background">
      <View className="flex flex-row items-center gap-4">
        <View>
          <View className="bg-primary flex justify-center items-center size-20 rounded-full">
            <Text className="text-primary-foreground text-4xl">
              {getInitials(user?.fullname)}
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-bold w-10/12 text-3xl text-foreground text-ellipsis">
            {user.fullname}
          </Text>
          <Text className="text-sm text-muted">{user.email} </Text>
          <Text className="text-sm text-muted">{user.phone} </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push("profile/accountSettings")}
        className="border-b border-foreground px-4 py-2 rounded-lg "
      >
        <Text className="text-xl text-foreground">Account Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity className="border-b border-foreground px-4 py-2 rounded-lg ">
        <Text className="text-xl text-foreground">Support</Text>
      </TouchableOpacity>
      <TouchableOpacity className="border-b border-foreground px-4 py-2 rounded-lg ">
        <Text className="text-xl text-foreground">FAQ</Text>
      </TouchableOpacity>
      <View className="mt-auto mb-5">
        <Button
          className="bg-primary w-full"
          onPress={() => {
            logout();
            router.replace("/auth");
          }}
        >
          <Text className="text-primary-foreground">Logout</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
