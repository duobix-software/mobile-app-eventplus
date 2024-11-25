import { useSession } from "@/context/session-ctx";
import { Link, Redirect, router } from "expo-router";
import { StatusBar, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!session) {
    return <Redirect href="/auth?action=login" />;
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={"#000"} />
      <Text>
        This screen is a loader screen. Here we will check if the user is
        authenticated to know where to redirect him. and here we check if is
        this is the first time he enter the app. The content of this page is
        temporary.
      </Text>
      <Text>
        <Link href="/_sitemap">Sitemap</Link>
      </Text>
      <Text>
        <Link href="/auth?action=login">Login</Link>
      </Text>
      <Text>
        <Link href="/auth?action=register">Register</Link>
      </Text>
      <TouchableOpacity
        className="bg-primary px-4 py-2 rounded-lg m-4"
        onPress={() => router.replace("/(organisation)/")}
      >
        <Text>Organisation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-primary px-4 py-2 rounded-lg m-4"
        onPress={() => router.replace("/home")}
      >
        <Text>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
