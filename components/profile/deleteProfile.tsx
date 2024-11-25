import { ActivityIndicator, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { InputError } from "@/components/ui/input-error";
import { PasswordInput } from "@/components/ui/password-input";

export default function DeleteProfile() {
  const [isPending, setIsPending] = React.useState<Boolean>(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const passwordInputRef = React.useRef<TextInput>(null);

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

  const onSubmit = (data: any) => {
    setIsPending(true);
    console.log({ ...data });
    setTimeout(() => {
      setIsPending(false);
    }, 2000);
    bottomSheetRef.current?.snapToIndex(-1);
  };
  return (
    <>
      <View className="w-full my-4 p-4 bg-card rounded-lg">
        <Text className="text-xl text-foreground font-bold my-4">
          Delete Profile
        </Text>

        <View className="flex items-end w-full">
          <Button
            onPress={() => bottomSheetRef.current?.snapToIndex(0)}
            className="w-1/2 bg-destructive"
          >
            <Text className="text-destructive-foreground font-medium ">Delete</Text>
          </Button>
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["70%"]}
        index={-1}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
        )}
        backgroundComponent={(props) => (
          <View className="bg-sheet rounded-t-3xl" {...props} />
        )}
      >
        <BottomSheetView className=" my-4 p-4 w-full relative">
          <Text className="text-xl text-card-foreground font-bold my-4">
            Delete Profile
          </Text>
          <Text className="mb-4 text-card-foreground">
            Are you sure you want to delete your profile?
          </Text>
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
                    onFocus={() => console.log("focus")}
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
          <View className="flex items-center mb-4 w-full">
            <Button
              onPress={handleSubmit(onSubmit)}
              className="w-1/2 bg-destructive"
            >
              {isPending && (
                <ActivityIndicator className="text-primary-foreground h-4 w-4" />
              )}
              <Text className="text-primary-foreground font-medium ">
                Delete
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
