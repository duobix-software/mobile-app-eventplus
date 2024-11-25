
import { View, Text, TouchableOpacity, Alert } from "react-native";
import NfcManager, {
  NfcTech,
  Ndef,
  nfcManager,
} from "react-native-nfc-manager";

NfcManager.start();

export default function settings() {
  async function readNdef() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      const firstMessage = tag.ndefMessage[0].payload;
      const nfcContent = Ndef.text.decodePayload(firstMessage);
      console.log("Tag found", nfcContent);
    } catch (ex) {
      console.log("Oops!", ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  async function writeNdef() {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([
        Ndef.textRecord("Duobix software"),
      ]);

      if (bytes) {
        const response = await NfcManager.ndefHandler.writeNdefMessage(bytes);
        console.log("Write response:", response);
        result = true;
      }
    } catch (ex) {
      console.log("Error writing with PN532 using NfcA:", ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  return (
    <View className="flex justify-center items-center h-full">
      <Text className="text-2xl font-bold">Settings Screen</Text>
      <TouchableOpacity onPress={readNdef} className="w-1/2 bg-primary m-4">
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={writeNdef} className="w-1/2 bg-primary m-4">
        <Text>Write to tag</Text>
      </TouchableOpacity>
    </View>
  );
}
