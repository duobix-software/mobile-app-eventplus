import { Link } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { postData } from "@/utils/api";

export default function Register() {
  const [passwordIcon, setPasswordIcon] = React.useState("eye");
  const { control, handleSubmit } = useForm();

  const { mutate, isLoading, error } = useMutation(
    (data) => postData("register", data),
    {
      onSuccess: (data) => {
        console.log("Register successful:", data);
      },
      onError: (error) => {
        console.error("Register error:", error);
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
              label="First name"
              right={<TextInput.Icon icon="account" />}
              className="mb-2"
            />
          )}
          name="first_name"
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
              label="Last name"
              right={<TextInput.Icon icon="account" />}
              className="mb-2"
            />
          )}
          name="last_name"
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
              label="Phone"
              right={<TextInput.Icon icon="phone" />}
              className="mb-2"
            />
          )}
          name="phone"
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
              label="Email"
              right={<TextInput.Icon icon="email" />}
              className="mb-2"
            />
          )}
          name="email"
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
          Register
        </Button>
      </View>
      <View>
        <Link href="/login">
          <ThemedText type="link">Login</ThemedText>
        </Link>
        <Link href="/home">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </View>
    </View>
  );
}
