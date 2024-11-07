import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Button, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import NfcManager, { NfcEvents } from "react-native-nfc-manager";

export default function ScanNFC() {
  const [supported, setSupported] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      console.log(deviceIsSupported);

      // setSupported(deviceIsSupported);
      // if (deviceIsSupported) {
      //   await NfcManager.start();
      // }
    };

    checkIsSupported();
  }, []);

  return (
    <SafeAreaView>
      <ThemedText>NFC scanner components</ThemedText>
      {/* <Button title="read nfc" onPress={readNdef}/> */}

      {/* {nfcSupported === false && (
        <ThemedText>NFC is not supported on this device.</ThemedText>
      )}

      {nfcSupported && (
        <>
          <ThemedText>NFC Tag Scanning</ThemedText>
          <Button
            title={scanning ? "Scanning..." : "Start NFC Scan"}
            disabled={scanning}
          />
          {tagData && (
            <View style={{ marginTop: 20 }}>
              <ThemedText>Tag Information:</ThemedText>
              <ThemedText>{JSON.stringify(tagData, null, 2)}</ThemedText>
            </View>
          )}
        </>
      )} */}
    </SafeAreaView>
  );
}

// async function readNdef() {
//   try {
//     // register for the NFC tag with NDEF in it
//     await NfcManager.requestTechnology(NfcTech.Ndef);
//     // the resolved tag object will contain `ndefMessage` property
//     const tag = await NfcManager.getTag();
//     console.warn("Tag found", tag);
//   } catch (ex) {
//     console.warn("Oops!", ex);
//   } finally {
//     // stop the nfc scanning
//     NfcManager.cancelTechnologyRequest();
//   }
// }

// const [nfcSupported, setNfcSupported] = React.useState<boolean | null>(null);
// const [scanning, setScanning] = React.useState(false);
// const [tagData, setTagData] = React.useState<TagEvent | null>(null);

// React.useEffect(async () => {
//   await NfcManager.start();
//   const su = await NfcManager.isSupported();
//   console.log(su);

// }, []);

//   React.useEffect(() => {
//     async function initNfc() {
//       await NfcManager.start();
//       const isSupported = await NfcManager.isSupported();
//       setNfcSupported(isSupported);
//     //   if (!isSupported) {
//     //     Alert.alertr("NFC Not Supported", "Your device does not support NFC.");
//     //   }
//     }

//     initNfc();

//     // return () => {
//     //   NfcManager.setEventListener(NfcTech.Ndef, null);
//     //   NfcManager.stop();
//     // };
//   }, []);

//   const startScanning = async () => {
//     if (nfcSupported) {
//       try {
//         setScanning(true);
//         await NfcManager.requestTechnology(NfcTech.Ndef);
//         const tag = await NfcManager.getTag();
//         setTagData(tag);
//         Alert.alert("NFC Tag Detected", JSON.stringify(tag, null, 2));
//       } catch (ex) {
//         if (!(ex instanceof NfcError.UserCancel)) {
//           Alert.alert("NFC Error", "Failed to read NFC tag.");
//         }
//       } finally {
//         setScanning(false);
//         await NfcManager.cancelTechnologyRequest();
//       }
//     }
//   };
