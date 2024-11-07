import { cn } from "@/utils/utils";
import { Text } from "react-native";

interface InputErrorProps extends React.ComponentProps<typeof Text> {}

const InputError = ({ ...props }: InputErrorProps) => {
  return (
    <Text
      className={cn("mt-0.5 text-sm text-red-600 dark:text-red-500")}
      {...props}
    />
  );
};

export { InputError };
