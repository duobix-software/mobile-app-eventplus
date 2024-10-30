import { cn } from "@/utils/utils";
import React from "react";
import { View } from "react-native";

export default function Container({ children, className }: any) {
  return <View className={cn("mx-4", className)}>{children}</View>;
}
