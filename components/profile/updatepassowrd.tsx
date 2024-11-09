import { ActivityIndicator, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { InputError } from "@/components/ui/input-error";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";

export default function Updatepassowrd() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentpassword: "",
      password: "",
    },
  });
  const passwordInputRef = React.useRef<TextInput>(null);
  const [isPending, setIsPending] = React.useState<Boolean>(false);

  const onSubmit = (data: any) => {
    setIsPending(true);
    console.log({ ...data });
    setTimeout(() => {
      setIsPending(false);
    }, 2000);
  };

  return (
    <View className="w-full my-4 p-4 bg-white rounded-lg">
      <Text className="text-xl font-bold my-4">Update Password</Text>
      <View className="flex justify-center items-center">
        <View className="mb-4 w-full">
          <Controller
            control={control}
            name="currentpassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <PasswordInput
                  ref={passwordInputRef}
                  placeholder="current password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="done"
                />
                {errors.currentpassword && (
                  <InputError>{errors.currentpassword.message}</InputError>
                )}
              </View>
            )}
          />
        </View>
        <View className="mb-4 w-full">
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <PasswordInput
                  ref={passwordInputRef}
                  placeholder="new password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  returnKeyType="done"
                />
                {errors.password && (
                  <InputError>{errors.password.message}</InputError>
                )}
              </View>
            )}
          />
        </View>
        <View className="flex items-end w-full">
          <Button onPress={handleSubmit(onSubmit)} className="w-1/2 ">
            {isPending && (
              <ActivityIndicator className="text-primary-foreground h-4 w-4" />
            )}
            <Text className="text-primary-foreground font-medium ">Save</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
