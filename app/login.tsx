import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { postData } from "@/utils/api";

export default function Login() {
  const [passwordIcon, setPasswordIcon] = React.useState("eye");
  const { control, handleSubmit } = useForm();

  const { mutate, isLoading, error } = useMutation(
    (data) => postData("login", data),
    {
      onSuccess: (data) => {
        console.log("Login successful:", data);
      },
      onError: (error) => {
        console.error("Login error:", error);
      },
    }
  );

  const onSubmit = (data: any) => {
    mutate(data);
  };
  const toggleIcon = () => {
    setPasswordIcon((prevIcon) => (prevIcon === "eye" ? "eye-off" : "eye"));
  };

  return (
    <View className="h-full flex justify-center px-4">
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Username"
              right={<TextInput.Icon icon="account" />}
              className="mb-2"
            />
          )}
          name="username"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Password"
              className="mb-2"
              secureTextEntry={passwordIcon == "eye"}
              right={
                <TextInput.Icon icon={passwordIcon} onPress={toggleIcon} />
              }
            />
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        <Button
          mode="contained"
          className="mx-10 mb-2"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        >
          Login
        </Button>
      </View>
      <View>
        <Link href="/register">
          <ThemedText type="link">Register</ThemedText>
        </Link>
        <Link href="/home">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </View>
    </View>
  );
}
