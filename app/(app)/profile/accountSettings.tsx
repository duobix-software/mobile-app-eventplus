import { ActivityIndicator, View } from "react-native";
import React from "react";
import { useUser } from "@/context/authentication-ctx";
import Updatepassowrd from "@/components/profile/updatepassowrd";
import DeleteProfile from "@/components/profile/deleteProfile";
import UpdateInformations from "@/components/profile/updateInformations";

export default function accontSettings() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <View className="h-full flex justify-center">
        <ActivityIndicator size="large" color={"#007BFF"}></ActivityIndicator>
      </View>
    );
  }

  return (
    <View className="flex justify-center p-4 grow relative bg-background">
      <UpdateInformations user={user} />
      <Updatepassowrd />
      <DeleteProfile />
    </View>
  );
}
