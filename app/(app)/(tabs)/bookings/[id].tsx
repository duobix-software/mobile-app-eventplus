import React from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNfc } from "@/hooks/useNfc";
import { useLocalSearchParams } from "expo-router";

export default function booking() {
  const { writeToTag, invalidateSession, cleanUp, isScanning } = useNfc();
  const { id } = useLocalSearchParams<{ id: string }>();

  React.useEffect(() => {
    const handleWriteDataToNfc = async (id: string) => {
      try {
        const serializedData = JSON.stringify(id);
        await writeToTag({
          dataToWrite: serializedData,
          writeMessageForOS: "Writing data to NFC",
        });
        console.log("Data written to NFC");
        invalidateSession();
        cleanUp();
      } catch (e) {
        invalidateSession(true, JSON.stringify(e));
        cleanUp();
        Alert.alert("Error writing to NFC", JSON.stringify(e));
      }
    };

    if (id) {
      handleWriteDataToNfc(id);
    }
  }, [id]);

  return (
    <SafeAreaView className="flex justify-center items-center h-full">
      {isScanning ? (
        <Text className="text-2xl font-bold">Scaning</Text>
      ) : (
        <Text className="text-2xl font-bold"> {id} </Text>
      )}
    </SafeAreaView>
  );
}
