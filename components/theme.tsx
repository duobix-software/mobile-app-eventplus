import React from "react";
import { View } from "react-native";
import { vars, useColorScheme } from "nativewind";

const themes = {
  light: vars({
    "--background": "#f6f6f6",
    "--foreground": "#020202",
    "--card": "#fff",
    "--card-foreground": "#0A0E1A",
    "--sheet": "#f3f3f3",
    "--primary": "#007BFF",
    "--primary-foreground": "#fafafa",
    "--secondary": "#EBF0F6",
    "--secondary-foreground": "#1A2A38",
    "--muted": "#9CA3AF",
    "--muted-foreground": "#6E7B8A",
    "--destructive": "#FF5B51",
    "--destructive-foreground": "#FAFAFA",
    "--border": "#e5e7eb",
    "--input": "#E4E8EE",
    "--ring": "#0A0E1A",
  }),
  dark: vars({
    "--background": "#000001",
    "--foreground": "#FAFAFA",
    "--card": "#27272a",
    "--card-foreground": "#FAFAFA",
    "--sheet": "#2b2a2b",
    "--primary": "#007BFF",
    "--primary-foreground": "#fafafa",
    "--secondary": "#2B3540",
    "--secondary-foreground": "#EBF0F6",
    "--muted": "#4E5A65",
    "--muted-foreground": "#aaa",
    "--destructive": "#FF5B51",
    "--destructive-foreground": "#FAFAFA",
    "--border": "#3A3F4B",
    "--input": "#3A3F4B",
    "--ring": "#4C5670",
  }),
};

const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1" style={themes[colorScheme.colorScheme ?? "light"]}>{children}</View>
  );
};

export { ThemeProvider, themes };
