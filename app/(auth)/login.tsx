import React from "react";
import { Link, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { Button, Text, TextInput } from "react-native-paper";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/api/authentication";
import { Credentials } from "@/types/authentication";
import { brand } from "expo-device";
import { AxiosError } from "axios";
import { useSession } from "@/context/session-ctx";

export default function Login() {
  const { signIn } = useSession();
  const [passwordIcon, setPasswordIcon] = React.useState("eye");

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (formData: Credentials) => login(formData),
    onSuccess: (data) => {
      signIn(data);
      router.replace("/(tabs)/home")
    },
    onError: (error: AxiosError) => {
      if (error.response?.status !== 422) return;

      const errors = error.response.data.errors;

      Object.entries(errors).forEach(([field, messages]) => {
        setError(field, {
          type: "server",
          message: messages[0],
        });
      });
    },
  });

  const onSubmit = (data: Omit<Credentials, "device_name">) =>
    mutate({ ...data, device_name: brand ?? "unknown" });

  const toggleIcon = () => {
    setPasswordIcon((prevIcon) => (prevIcon === "eye" ? "eye-off" : "eye"));
  };

  return (
    <View className="h-full flex justify-center px-4">
      <View className="mb-2 space-y-2">
        <View className="space-y-1">
          <Controller
            control={control}
            rules={{ required: true }}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Username"
                right={<TextInput.Icon icon="account" />}
              />
            )}
          />
          {errors.username?.message?.length && (
            <Text className="text-red-600">{errors.username.message}</Text>
          )}
        </View>

        <View className="space-y-1">
          <Controller
            control={control}
            rules={{ required: true }}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Password"
                secureTextEntry={passwordIcon == "eye"}
                right={
                  <TextInput.Icon icon={passwordIcon} onPress={toggleIcon} />
                }
              />
            )}
          />
          {errors.password?.message?.length && (
            <Text className="text-red-600">{errors.password.message}</Text>
          )}
        </View>

        <Button
          mode="contained"
          className="mx-10"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={isPending}
        >
          Login
        </Button>
      </View>
      <View>
        <Link href="/register">
          <ThemedText type="link">Register</ThemedText>
        </Link>
        <Link href="/">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </View>
    </View>
  );
}
