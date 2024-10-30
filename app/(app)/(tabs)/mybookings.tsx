import { Text, View } from "react-native";
import React from "react";
import { useNfc } from "@/hooks/useNfc";
import { Alert } from "react-native";
import { Button } from "react-native-paper";

export default function MyBookings() {
  const {
    writeToTag,
    invalidateSession,
    cleanUp,
    isScanning,
    readTag,
    decodeMessage,
  } = useNfc();
  const handleWriteDataToNfc = async (data: any) => {
    try {
      const serializedData = JSON.stringify(data);
      await writeToTag({
        dataToWrite: serializedData,
        writeMessageForOS: "Writing data to NFC",
      });
      // invalidateSession();
      cleanUp();
    } catch (e) {
      // invalidateSession(true, JSON.stringify(e));
      cleanUp();
      Alert.alert("Error writing to NFC", JSON.stringify(e));
    }
  };

  const handleReadDataFromNfc = async () => {
    try {
      const tag = await readTag({ writeMessageForOS: "Ready to read NFC" });
      if (tag && tag.ndefMessage) {
        const firstMessage = tag.ndefMessage[0].payload;
        const nfcContent = decodeMessage(firstMessage);
        const parsedData = JSON.parse(nfcContent);
        console.log("Data from NFC:", parsedData);
        Alert.alert("Data form NFC: ", parsedData);
      }
      // invalidateSession();
      cleanUp();
    } catch (e) {
      // invalidateSession(true, JSON.stringify(e));
      cleanUp();
      Alert.alert("Error reading from NFC", JSON.stringify(e));
    }
  };
  
  return (
    <View className="flex justify-center items-center h-full">
      <Button
        mode="contained"
        className="m-4"
        onPress={() => handleWriteDataToNfc("Duobix software")}
      >
        <Text>
          {isScanning ? "Loading ..." : "Write Duobix software to NFC"}
        </Text>
      </Button>
      <Button
        className="m-4"
        mode="contained"
        onPress={() => handleReadDataFromNfc()}
      >
        <Text>{isScanning ? "Loading ..." : "Reading From NFC"}</Text>
      </Button>
    </View>
  );
}
