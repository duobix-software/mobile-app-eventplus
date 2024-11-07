import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs2";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { Button } from "@/components/ui/button";
import { useGlobalSearchParams } from "expo-router";

export default function Auth() {
  const { action } = useGlobalSearchParams<{ action?: "login" | "register" }>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <View className="flex-row-reverse justify-between mt-14">
          <View className="items-end">
            <View className="w-32 items-center py-6 bg-red-700 rounded-l-3xl">
              <Image
                source={require("@/assets/images/logo/1000-1000.png")}
                className="h-20 w-20"
              />
            </View>
          </View>
          <View className="px-4">
            <Text className="text-foreground text-[2rem]">Welcome</Text>
            <Text className="text-foreground text-[3rem]">Back</Text>
          </View>
        </View>

        <Tabs defaultValue={action ?? "login"} className="mt-10 px-4">
          <TabsList>
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <View className="mt-4">
              <Login />
            </View>
          </TabsContent>
          <TabsContent value="register">
            <View className="mt-4">
              <Register />
            </View>
          </TabsContent>
        </Tabs>

        <View className="mt-10 px-4">
          <View className="flex-row items-center justify-center mb-4">
            <View className="w-10/12 h-px bg-border" />
            <Text className="absolute px-3 bg-background text-muted-foreground text-center">
              or connect with
            </Text>
          </View>
          <View className="flex-row justify-center items-center gap-2.5 m-4">
            <Button size="icon" variant="ghost">
              <Image
                source={require("@/assets/images/social-login/google.png")}
                className="h-16 w-16"
              />
            </Button>
            <Button size="icon" variant="ghost">
              <Image
                source={require("@/assets/images/social-login/apple-white.png")}
                className="h-10 w-10"
              />
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
