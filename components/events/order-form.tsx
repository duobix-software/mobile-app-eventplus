import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { order } from "@/services/api/order";
import { OrderRequest } from "@/types/order";
import { Event } from "@/types/event";
import { ButtonVariant } from "../ui/button-variant";
import { currencyFormat } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";

type OrderForm = Pick<OrderRequest, "date" | "pricing">;

interface OrderFormProps {
  event: Event;
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
}

export default function Order({ event, bottomSheetRef }: OrderFormProps) {
  const { control, handleSubmit } = useForm<OrderForm>({
    defaultValues: {
      date: event.dates[0].id,
      pricing: event.pricings[0].id,
    },
  });

  const mutation = useMutation({
    mutationFn: (orderForm: OrderForm) =>
      order({ event: event.slug, ...orderForm }),
    onSuccess: ({ redirect, redirect_url }) => {
      if (redirect)
        return router.replace({
          pathname: "/checkout/payment",
          params: { url: redirect_url },
        });
    },
    onError: (error) => console.log(error),
  });

  const submit = (data: OrderForm) => mutation.mutate(data);

  return (
    <BottomSheetView className="flex-1 p-4 relative">
      <View className="items-center">
        <Text className="text-lg font-medium text-foreground">
          Continue order
        </Text>
      </View>

      <View className="mt-4">
        <Text className="text-foreground mb-2">Date</Text>
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value } }) => (
            <View className="gap-2">
              {event.dates.map((date) => (
                <ButtonVariant
                  key={date.id}
                  selected={date.id === value}
                  onPress={() => onChange(date.id)}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-foreground">
                      {date.start_date} - {date.end_date}
                    </Text>
                    {date.id === value && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        className="text-primary"
                        color={"#007BFF"}
                      />
                    )}
                  </View>
                </ButtonVariant>
              ))}
            </View>
          )}
        />
      </View>

      <View className="mt-4">
        <Text className="text-foreground mb-2">Price</Text>
        <Controller
          control={control}
          name="pricing"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row flex-wrap gap-2">
              {event.pricings.map((pricing) => (
                <ButtonVariant
                  key={pricing.id}
                  selected={pricing.id === value}
                  onPress={() => onChange(pricing.id)}
                >
                  {pricing.name && (
                    <Text className="text-foreground text-sm mb-1">
                      {pricing.name}
                    </Text>
                  )}
                  <Text className="text-foreground font-medium">
                    {currencyFormat(pricing.price)}
                  </Text>
                </ButtonVariant>
              ))}
            </View>
          )}
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0 p-4">
        <TouchableOpacity
          className="items-center py-2 w-full bg-primary dark:bg-primary rounded"
          onPress={handleSubmit(submit)}
        >
          <Text className="text-white font-medium">Proceed to payment</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );
}
