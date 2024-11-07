import { cn } from "@/utils/utils";
import { View } from "react-native";

interface SkeltonProps extends React.ComponentProps<typeof View> {}

export function Skelton({ className, ...props }: SkeltonProps) {
  return <View className={cn("animate-pulse rounded-md bg-muted", className)} />;
}
