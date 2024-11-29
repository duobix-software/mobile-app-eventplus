import { useUser } from "@/context/authentication-ctx";
import { useSession } from "@/context/session-ctx";
import { Redirect } from "expo-router";
import {
  ActivityIndicator,
  View,
} from "react-native";

export default function Index() {
  const { session, isLoading } = useSession();
  const { user, isUserLoading } = useUser();

  if (isLoading && isUserLoading) {
    return (
      <View className="h-full flex justify-center">
        <ActivityIndicator size="large" color={"#007BFF"}></ActivityIndicator>
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/auth?action=login" />;
  }

  if (!user?.is_admin) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/(organisation)" />;
  }
}
