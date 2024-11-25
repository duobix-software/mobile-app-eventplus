import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { useCameraPermissions } from "expo-camera";
import Cameraview from "@/components/organisation/cameraview";
import { useMutation } from "@tanstack/react-query";
import { checkAccessTicket } from "@/services/api/admin/check-access-ticket";
import { getQueryParamValue, isValidUrlWithToken } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/utils/utils";

const scanQrCode = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState<string[]>([]);

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

  const handleScannedData = (data: string) => {
    if (scannedData.includes(data)) {
      return;
    }

    setScannedData((scanned) => {
      scanned.unshift(data);
      return [...scanned];
    });
  };
  return (
    <View className="flex-1">
      <View className="w-full h-1/2">
        <Cameraview onScanned={handleScannedData} />
      </View>
      <View className="w-full h-1/2 pt-4 border-t">
        {scannedData.length ? (
          <ScrollView showsVerticalScrollIndicator={false} className="p-4">
            {scannedData.map((barCodeData, idx) => (
              <Comp key={idx} barCodeData={barCodeData} index={idx} />
            ))}
          </ScrollView>
        ) : (
          <View className="flex justify-center items-center gap-4 h-full">
            <Text className="text-foreground text-2xl font-bold">
              Scan a Qr code to get ticket informations
            </Text>
            <Ionicons name="qr-code" size={80} color="#007BFF" />
          </View>
        )}
      </View>
    </View>
  );
};

export default scanQrCode;

function Comp({ barCodeData, index }: { barCodeData: string; index: number }) {
  const { mutate, status, data } = useMutation({
    mutationFn: (data: any) => checkAccessTicket(data),
  });

  React.useMemo(() => {
    if (!isValidUrlWithToken(barCodeData, "token")) {
      return;
    }
    const token = getQueryParamValue(barCodeData, "token");
    mutate(token);
  }, [barCodeData]);

  return (
    <View className="bg-card mb-2 p-4 rounded-lg h-36">
      {status === "idle" && (
        <View className="flex flex-row justify-between items-center">
          <Text className="text-3xl font-bold">Invalid Qr Code</Text>
          <Ionicons color="#fcd34d" name="help-circle" size={30} />
        </View>
      )}

      {status === "pending" && (
        <ActivityIndicator size="large" className="text-primary" />
      )}
      {status === "success" && (
        <>
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row items-center justify-start gap-6 ">
              <Text className="text-5xl font-bold">#{data.order}</Text>
              <View>
                <Text className="text-xl font-bold">
                  {data.customer.fullname}
                </Text>
                <Text className="text-muted">{data.customer.email}</Text>
              </View>
            </View>
            <Ionicons color="green" name="checkmark-circle" size={30} />
          </View>
          <View>
            <Text className="text-lg">Status: {data.status}</Text>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-2xl font-bold">
                {data.variant.event_pricing.name}
              </Text>
              <Text className="text-xl font-bold">
                {data.variant.event_pricing.price}
              </Text>
            </View>
          </View>
        </>
      )}
      {status === "error" && (
        <>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-3xl font-bold">Ticket Invalid</Text>
            <Ionicons color="red" name="close-circle" size={30} />
            <Text>
              jklqm
            </Text>
          </View>
        </>
      )}
    </View>
  );
}
