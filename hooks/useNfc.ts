import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import NfcManager, { Ndef, NfcTech, TagEvent } from "react-native-nfc-manager";

export function useNfc() {
  const [isNfcSupported, setIsNfcSupported] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const checkNfcStatus = useCallback(async () => {
    const deviceIsSupported = await NfcManager.isSupported();
    const notEnabled = await NfcManager.isEnabled();
    setIsNfcSupported(deviceIsSupported);
    if (deviceIsSupported) {
      initNfc();
    }
    if (!notEnabled) {
      NfcManager.goToNfcSetting();
    }
  }, []);

  useEffect(() => {
    checkNfcStatus(); 
    return () => {
      cleanUp(); 
    };
  }, [checkNfcStatus]);

  const initNfc = async () => {
    try {
      await NfcManager.start(); 
    } catch (ex) {
      console.warn("NFC initialization error", ex);
    }
  };

  const cleanUp = async () => {
    NfcManager.cancelTechnologyRequest();
  };

  const invalidateSession = async (isError = false, error = "") => {
    if (isError === false) NfcManager.invalidateSessionIOS();
    else NfcManager.invalidateSessionWithErrorIOS(error);
  };

  const readTag = async ({ writeMessageForOS }: { writeMessageForOS?: string }): Promise<TagEvent> => {
    setIsScanning(true);

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: writeMessageForOS,
      });
      const tag = await NfcManager.getTag();
      if (tag !== null && tag.ndefMessage && tag.ndefMessage.length > 0) {
        return tag;
      } else {
        throw new Error("No NDEF message found on the tag");
      }
    } catch (error) {
      throw new Error("NFC Read operation error: " + error);
    } finally {
      setIsScanning(false);
    }
  };

  const decodeMessage = (data: any): string => {
    return Ndef.text.decodePayload(data);
  };

  const writeToTag = async ({
    dataToWrite,
    writeMessageForOS,
  }: {
    dataToWrite: string;
    writeMessageForOS?: string;
  }): Promise<boolean> => {
    setIsScanning(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: writeMessageForOS ?? "Ready to write NFC tag!",
      });
      if (Platform.OS === "ios")
        setTimeout(() => {
          NfcManager.setAlertMessageIOS("Please hold your device steady...");
        }, 400);

      const bytesToWrite = Ndef.encodeMessage([Ndef.textRecord(dataToWrite)]);
      await NfcManager.ndefHandler.writeNdefMessage(bytesToWrite);
      return true;
    } catch (error) {
      throw new Error("NFC write operation error: " + error);
    } finally {
      setIsScanning(false);
    }
  };

  return {
    isNfcSupported,
    isScanning,
    readTag,
    writeToTag,
    cleanUp,
    decodeMessage,
    invalidateSession,
  };
}