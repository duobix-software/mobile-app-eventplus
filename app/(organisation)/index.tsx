import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

const ScanNFCTicketScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  // Start NFC Manager
  React.useEffect(() => {
    NfcManager.start();
  }, []);

  // Function to start NFC scanning
  const startNFCScan = async () => {
    setIsScanning(true);
    setTicketData(null);  // Reset ticket data for a new scan

    try {
      // Request NFC technology access
      await NfcManager.requestTechnology(NfcTech.Ndef);

      // Add listener to detect NFC tags
      NfcManager.setEventListener(NfcTech.Ndef, {
        onDiscovered: handleTagDetected,
      });

      Alert.alert('NFC Scan', 'Ready to scan, hold your phone near an NFC tag.');
    } catch (ex) {
      console.warn(ex);
      Alert.alert('Error', 'Failed to start NFC scan.');
      stopNFCScan();  // Stop scanning on error
    }
  };

  // Function to handle NFC tag detection
  const handleTagDetected = async () => {
    try {
      // Get NFC tag information
      const tag = await NfcManager.getTag();
      if (tag.ndefMessage) {
        // Decode and set the ticket data
        const payload = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
        setTicketData(payload);

        Alert.alert('NFC Scan Success', `Ticket Data: ${payload}`);
      } else {
        Alert.alert('Error', 'No readable data found on NFC tag.');
      }
    } catch (ex) {
      console.warn(ex);
      Alert.alert('Error', 'Failed to read NFC tag.');
    } finally {
      stopNFCScan();  // Stop scan after reading
    }
  };

  // Function to stop NFC scanning
  const stopNFCScan = async () => {
    setIsScanning(false);
    await NfcManager.cancelTechnologyRequest();
    NfcManager.setEventListener(NfcTech.Ndef, null);  // Remove listener
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Scan Ticket with NFC</Text>

      {isScanning ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Hold your phone near the NFC tag...</Text>
          <Button title="Cancel Scan" onPress={stopNFCScan} color="red" />
        </>
      ) : (
        <Button title="Start NFC Scan" onPress={startNFCScan} />
      )}

      {ticketData && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Scanned Ticket Data:</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{ticketData}</Text>
        </View>
      )}
    </View>
  );
};

export default ScanNFCTicketScreen;
