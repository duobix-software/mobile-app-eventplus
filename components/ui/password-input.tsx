import React from "react";
import { View, TextInput } from "react-native";
import { Input, InputProps } from "./input";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { Button } from "./button";

interface PasswordInput extends InputProps {}

const PasswordInput = React.forwardRef<TextInput, PasswordInput>(
  ({ ...props }, ref) => {
    const { colorScheme } = useColorScheme();
    const [isHidden, setIsHidden] = React.useState(true);

    return (
      <View className="relative">
        <Input ref={ref} secureTextEntry={isHidden} {...props} />
        <Button
          variant="ghost"
          className="absolute right-0"
          onPress={() => setIsHidden(!isHidden)}
        >
          <Ionicons
            name={isHidden ? "eye" : "eye-off"}
            // color={colorScheme === "dark" ? "#fff" : "#000"}
            className=""
            size={16}
          />
        </Button>
      </View>
    );
  }
);

export { PasswordInput };
