import React from "react";
import { TextInput } from "react-native";
import { cn } from "@/utils/utils";

interface InputProps extends React.ComponentProps<typeof TextInput> {}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, ...props }, ref) => (
    <TextInput
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm caret-foreground placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);

export { Input, type InputProps };
