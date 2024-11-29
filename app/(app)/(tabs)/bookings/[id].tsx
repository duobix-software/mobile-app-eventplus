import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/services/api/order";
import { getTicket } from "@/services/api/ticket";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import { Ionicons } from "@expo/vector-icons";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

export default function booking() {
  const { id, event } = useLocalSearchParams<{ id: string; event: string }>();
  const insets = useSafeAreaInsets();
  const { data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder({ urlTemplateParams: { id } }),
  });

  const { data: ticket, status } = useQuery({
    queryKey: ["ticket", event, id],
    queryFn: () =>
      getTicket({ urlTemplateParams: { order: id, event: event } }),
  });

  async function writeNdef(ticket: string) {
    let result = false;
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(ticket)]);
      if (bytes) {
        const response = await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.log("Error writing to Nfc:", ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    return result;
  }

  if (status === "success") {
    writeNdef(ticket.publicToken);
  }

  return (
    <SafeAreaView className=" h-full">
      {status === "pending" && (
        <View className="flex justify-center items-center h-full">
          <ActivityIndicator size="large" className="text-primary" />
        </View>
      )}
      {status === "success" && (
        <View className="grow relative bg-background">
          <View className="h-64 relative">
            <Image
              source={{ uri: order.event.banner }}
              className="w-full h-full"
            />
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(128, 128, 128, 0.6)",
                opacity: 0.7,
                height: insets.top,
              }}
            />
            <TouchableOpacity
              className="absolute top-10 left-5 bg-zinc-800 rounded-full p-2"
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="mx-4 mt-4">
            <Text className="text-foreground text-lg font-medium">
              {order.event.title}
            </Text>
            {order.event.address && (
              <View className="flex-row items-center">
                <Ionicons name="location-sharp" size={16} color="#ea580c" />
                <Text className="text-foreground text-sm ml-1">
                  {order.event.address.city && order.event.address.city + ", "}
                  {order.event.address.state &&
                    order.event.address.state + ", "}
                  {order.event.address.country && order.event.address.country}
                </Text>
              </View>
            )}

            <View className="flex-row justify-around border-b border-muted p-2 mt-4"></View>

            <View className="flex-row justify-center items-center p-2 mt-4">
              <QRCode
                size={200}
                value={
                  "https://eventplus.duobix.com?token=" + ticket.publicToken
                }
              />
            </View>
          </View>
        </View>
      )}
      {status === "error" && (
        <View className="flex flex-col justify-center items-center h-full">
          <Ionicons color="red" name="close-circle" size={150} />
          <Text className="text-3xl font-bold">
            Error while getting your ticket!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
