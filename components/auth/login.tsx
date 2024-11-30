import React from "react";
import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import { useSession } from "@/context/session-ctx";
import { login } from "@/services/api/authentication";
import { Credentials } from "@/types/authentication";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { brand, deviceName } from "expo-device";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { InputError } from "@/components/ui/input-error";

export default function Login() {
  const usernameInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);
  const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Omit<Credentials, "device_name">>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation<
    { token: string },
    AxiosError<{ errors: Record<keyof Credentials, string[]> }>,
    Credentials
  >({
    mutationFn: (formData: Credentials) => login(formData),
    onSuccess: (data) => {
      signIn(data.token);
      router.replace("/");
    },
    onError: (error) => {
      if (error.code == "ERR_NETWORK") {
        Alert.alert("Check your internet!");
      }
      if (error.response?.status === 422) {
        const { errors } = error.response.data;
        Object.entries(errors).forEach(([field, messages]) => {
          setError(field as keyof Omit<Credentials, "device_name">, {
            type: "server",
            message: messages[0],
          });
        });
      }
    },
  });

  const onSubmit = (data: Omit<Credentials, "device_name">) => {
    mutate({ ...data, device_name: deviceName ?? brand ?? "unknown" });
  };

  return (
    <View>
      <View className="mb-4">
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                ref={usernameInputRef}
                placeholder="username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                autoCapitalize="none"
                autoComplete="username"
              />
              {errors.username && (
                <InputError>{errors.username.message}</InputError>
              )}
            </View>
          )}
        />
      </View>

      <View className="mb-4">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <PasswordInput
                ref={passwordInputRef}
                placeholder="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {errors.password && (
                <InputError>{errors.password.message}</InputError>
              )}
            </View>
          )}
        />
      </View>

      <View className="mb-4">
        <Link href="/">
          <Text className="text-foreground text-sm underline">
            Forgot password ?
          </Text>
        </Link>
      </View>

      <Button onPress={handleSubmit(onSubmit)} disabled={isPending}>
        {isPending && (
          <ActivityIndicator className="text-primary-foreground h-4 w-4" />
        )}
        <Text className="text-primary-foreground font-medium">Log In</Text>
      </Button>
    </View>
  );
}
