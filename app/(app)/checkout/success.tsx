import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Success() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <Text className="text-foreground">Success payment</Text>
    </SafeAreaView>
  );
}
