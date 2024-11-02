import { useLocalSearchParams } from "expo-router";
import { Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return (
    <SafeAreaView>
      <Text className="text-white">{slug}</Text>
    </SafeAreaView>
  );
}
