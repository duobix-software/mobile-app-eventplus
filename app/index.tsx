import { Link } from "expo-router";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
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
        <Link href="/login">Login</Link>
      </Text>
      <Text>Home screen.</Text>
    </SafeAreaView>
  );
}
