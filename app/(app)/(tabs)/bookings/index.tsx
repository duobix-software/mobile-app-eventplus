import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllBookings from "@/components/booking/all";
import PendingBookings from "@/components/booking/pending";
import ConfirmedBookings from "@/components/booking/confirmed";
import CanceledBookings from "@/components/booking/canceled";

export default function () {
  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <Text className="text-foreground font-medium text-lg mb-4">Bookings</Text>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AllBookings />
        </TabsContent>
        <TabsContent value="pending">
          <PendingBookings />
        </TabsContent>
        <TabsContent value="confirmed">
          <ConfirmedBookings />
        </TabsContent>
        <TabsContent value="canceled">
          <CanceledBookings />
        </TabsContent>
      </Tabs>
    </SafeAreaView>
  );
}
