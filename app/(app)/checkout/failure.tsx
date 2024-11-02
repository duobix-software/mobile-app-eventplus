import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Failure()
{
    return <SafeAreaView>
        <ThemedText>
            The payment has fail.
        </ThemedText>
    </SafeAreaView>
}