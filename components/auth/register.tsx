import React from "react";
import { AxiosError } from "axios";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { useSession } from "@/context/session-ctx";
import { register } from "@/services/api/authentication";
import { RegistrationData } from "@/types/authentication";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { brand, deviceName } from "expo-device";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputError } from "@/components/ui/input-error";
import { PasswordInput } from "@/components/ui/password-input";

export default function Register() {
  const fullnameInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);
  const phoneInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);
  const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Omit<RegistrationData, "device_name">>({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation<
    { token: string },
    AxiosError<{ errors: Record<keyof RegistrationData, string[]> }>,
    RegistrationData
  >({
    mutationFn: (formData: RegistrationData) => register(formData),
    onSuccess: (data) => {
      signIn(data.token);
      router.replace("/home");
    },
    onError: (error) => {
      if (error.response?.status === 422) {
        const { errors } = error.response.data;
        Object.entries(errors).forEach(([field, messages]) => {
          setError(field as keyof Omit<RegistrationData, "device_name">, {
            type: "server",
            message: messages[0],
          });
        });
      }
    },
  });

  const onSubmit = (data: Omit<RegistrationData, "device_name">) => {
    mutate({ ...data, device_name: deviceName ?? brand ?? "unknown" });
  };

  return (
    <View>
      <View className="mb-4">
        <Controller
          control={control}
          name="fullname"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                ref={fullnameInputRef}
                placeholder="full name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              {errors.fullname && (
                <InputError>{errors.fullname.message}</InputError>
              )}
            </View>
          )}
        />
      </View>
      <View className="mb-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                ref={emailInputRef}
                placeholder="e-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => phoneInputRef.current?.focus()}
              />
              {errors.email && <InputError>{errors.email.message}</InputError>}
            </View>
          )}
        />
      </View>
      <View className="mb-4">
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Input
                ref={phoneInputRef}
                placeholder="phone number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              {errors.phone && <InputError>{errors.phone.message}</InputError>}
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

      <Button onPress={handleSubmit(onSubmit)}>
        {isPending && (
          <ActivityIndicator className="text-primary-foreground h-4 w-4" />
        )}
        <Text className="text-primary-foreground font-medium">Sign Up</Text>
      </Button>
    </View>
  );
}
