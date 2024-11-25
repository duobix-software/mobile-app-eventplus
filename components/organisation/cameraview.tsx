import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { Button } from "../ui/button";

export default function Cameraview({ onScanned }: any) {
  const [scanning, setScanning] = useState(false);
  const [torche, setTorche] = useState(false);

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    onScanned(data);
  };

  return !scanning ? (
    <View className="flex justify-center items-center h-full">
      <Button onPress={() => setScanning(true)}>
        <Text className="text-primary-foreground font-bold">Scan Qr code</Text>
      </Button>
    </View>
  ) : (
    <CameraView
      className="flex-1 h-1/2 w-full "
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      onBarcodeScanned={handleBarCodeScanned}
      enableTorch={torche}
    >
      <View className="h-full w-full relative">
        <View className="absolout border-white border-4 rounded-lg w-1/2 h-1/2 left-1/4 top-1/4" />
        <View className="absolute h-full">
          <View className="flex flex-row items-end justify-between p-10 w-full h-full ">
            <TouchableOpacity
              onPress={() => setScanning(false)}
              className="flex items-center justify-center"
            >
              <Text className="text-3xl text-white">Stop Scanning</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTorche(!torche)}>
              <Text className="text-3xl text-white">Toche</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CameraView>
  );
}
