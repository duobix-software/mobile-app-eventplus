import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

const scanQrCode = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [torche, setTorche] = useState(false);
  const [cornerPoints, setCornerPoints] = useState<Array<number>>([]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="pb-10 text-center">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ data, cornerPoints }: any) => {
    console.log(data);
    setCornerPoints(cornerPoints);
    setScanning(false);
  };

  const getBoundingBox = (points: Array<number>) => {
    if (!points || points.length < 4) return null;

    const xValues = points.map((point) => point.x);
    const yValues = points.map((point) => point.y);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    return { minX, maxX, minY, maxY };
  };

  const boundingBox = getBoundingBox(cornerPoints);
  return (
    <View className="flex-1 ">
      {!scanning ? (
        <Button title={"Scan Qr code"} onPress={() => setScanning(true)} />
      ) : (
        <>
          <CameraView
            className="flex-1 h-full w-full "
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleBarCodeScanned}
            enableTorch={torche}
          >
            <View className="h-full w-full relative">
              {boundingBox && (
                <View
                  style={[
                    styles.qrCodeBox,
                    {
                      left: boundingBox.minX,
                      top: boundingBox.minY,
                      width: boundingBox.maxX - boundingBox.minX,
                      height: boundingBox.maxY - boundingBox.minY,
                    },
                  ]}
                />
              )}
              <View className="flex flex-row items-end justify-between p-10 h-full ">
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
          </CameraView>
        </>
      )}
    </View>
  );
};

export default scanQrCode;

const styles = StyleSheet.create({
  qrCodeBox: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 15,
  },
});
