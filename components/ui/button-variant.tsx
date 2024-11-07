import React from "react";
import { TouchableOpacity } from "react-native";
import { cn } from "@/utils/utils";

interface ButtonVariantProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  selected?: boolean;
}

function ButtonVariant({
  className,
  selected = false,
  children,
  ...props
}: ButtonVariantProps) {
  return (
    <TouchableOpacity
      className={cn(
        "p-2 border border-zinc-400 rounded-lg disabled:opacity-50",
        className,
        selected && "border-primary" 
      )}
      activeOpacity={props.activeOpacity ?? 0.8}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

export { ButtonVariant, ButtonVariantProps };
