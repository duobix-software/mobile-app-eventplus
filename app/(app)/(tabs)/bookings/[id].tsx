import React from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getOrder } from "@/services/api/order";
import { getTicket } from "@/services/api/ticket";
import { SafeAreaView } from "react-native-safe-area-context";

export default function booking() {
  const { id, event } = useLocalSearchParams<{ id: string; event: string }>();
  const { data: order } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder({ urlTemplateParams: { id } }),
  });

  const { data: ticket } = useQuery({
    queryKey: ["ticket", event, id],
    queryFn: () => getTicket({ urlTemplateParams: { order: id, event } }),
  });

  return (
    <SafeAreaView>
      <Text>Order details with bar code</Text>
    </SafeAreaView>
  );
}
