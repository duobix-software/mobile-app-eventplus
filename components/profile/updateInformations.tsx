import { ActivityIndicator, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { UpdateInformationData } from "@/types/authentication";
import { Button } from "@/components/ui/button";

export default function UpdateInformations({ user }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateInformationData>({
    defaultValues: {
      fullname: user?.fullname,
      email: user?.email,
      phone: user?.phone,
    },
  });
  console.log(user);
  const fullnameInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);
  const phoneInputRef = React.useRef<TextInput>(null);
  const [isPending, setIsPending] = React.useState<Boolean>(false);

  const onSubmit = (data: UpdateInformationData) => {
    setIsPending(true);
    console.log({ ...data });
    setTimeout(() => {
      setIsPending(false);
    }, 2000);
  };
  return (
    <View className="w-full my-4 p-4 bg-card rounded-lg">
      <Text className="text-xl text-card-foreground font-bold my-4">
        Personnal infomations
      </Text>
      <View className="flex justify-center items-center">
        <View className="mb-4 w-full">
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
                />
                {errors.fullname && (
                  <InputError>{errors.fullname.message}</InputError>
                )}
              </View>
            )}
          />
        </View>
        <View className="mb-4 w-full">
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
                />
                {errors.email && (
                  <InputError>{errors.email.message}</InputError>
                )}
              </View>
            )}
          />
        </View>
        <View className="mb-4 w-full">
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
                />
                {errors.phone && (
                  <InputError>{errors.phone.message}</InputError>
                )}
              </View>
            )}
          />
        </View>
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
  );
}
