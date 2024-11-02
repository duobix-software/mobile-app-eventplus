import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Success() {
  return (
    <SafeAreaView>
      <ThemedText>Success payment</ThemedText>
    </SafeAreaView>
  );
}
