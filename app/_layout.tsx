import "../assets/css/global.css";
import { SessionProvider } from "@/context/session-ctx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "@/components/theme";
import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SessionProvider>
            <Slot />
          </SessionProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
