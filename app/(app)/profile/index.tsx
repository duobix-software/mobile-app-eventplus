import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";
import { useUser } from "@/context/authentication-ctx";
import { ThemedText } from "@/components/ThemedText";
import { Avatar, Button } from "react-native-paper";
import { getInitials } from "@/utils/helpers";
import { useSession } from "@/context/session-ctx";
import { router } from "expo-router";

export default function Profile() {
  const { user, isLoading } = useUser();
  const { logout } = useSession();

  if (isLoading) {
    return (
      <View>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-col gap-4 h-full mx-4 -my-2">
      <View className="">
        {user?.picture ? (
          <Avatar.Image source={{}} />
        ) : (
          <Avatar.Text label={getInitials(user?.fullname)} />
        )}
        <View>
          <ThemedText>{user.fullname}</ThemedText>
          <ThemedText>Show profile</ThemedText>
        </View>
      </View>
      <View>
        <ThemedText>Personal Info</ThemedText>
      </View>
      <View>
        <ThemedText>Account</ThemedText>
      </View>
      <View className="mt-auto mb-5">
        <Button
          mode="contained"
          onPress={() => {
            logout();
            router.replace("/login");
          }}
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
}
