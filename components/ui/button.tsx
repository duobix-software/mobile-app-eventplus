import React from "react";
import { TouchableOpacity } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";

const buttonVariants = cva(
  "flex-row items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        ghost: "bg-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {}

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      activeOpacity={props.activeOpacity ?? 0.8}
      {...props}
    />
  );
}

export { Button, buttonVariants };
