import "../assets/css/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SessionProvider } from "@/context/session-ctx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(0, 91, 192)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(216, 226, 255)",
    onPrimaryContainer: "rgb(0, 26, 65)",
    secondary: "rgb(0, 104, 116)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(151, 240, 255)",
    onSecondaryContainer: "rgb(0, 31, 36)",
    tertiary: "rgb(0, 104, 116)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(151, 240, 255)",
    onTertiaryContainer: "rgb(0, 31, 36)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(254, 251, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(254, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(225, 226, 236)",
    onSurfaceVariant: "rgb(68, 71, 79)",
    outline: "rgb(116, 119, 127)",
    outlineVariant: "rgb(196, 198, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 48, 51)",
    inverseOnSurface: "rgb(242, 240, 244)",
    inversePrimary: "rgb(173, 199, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(241, 243, 252)",
      level2: "rgb(234, 238, 250)",
      level3: "rgb(226, 233, 248)",
      level4: "rgb(224, 232, 247)",
      level5: "rgb(218, 229, 246)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(45, 48, 56, 0.4)",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <PaperProvider theme={theme}>
          <SessionProvider>
              <Slot />
          </SessionProvider>
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";
// import "react-native-reanimated";

// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { PaperProvider } from "react-native-paper";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import NfcManager from "react-native-nfc-manager";

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   // const [loaded] = useFonts({
//   //   SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   // });

//   // useEffect(() => {
//   //   if (loaded) {
//   //     SplashScreen.hideAsync();
//   //   }
//   // }, [loaded]);

//   useEffect(() => {
//     NfcManager.start();
//   }, []);

//   // if (!loaded) {
//   //   return null;
//   // }

//   return (
//     <QueryClientProvider client={new QueryClient()}>
//       <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//         <PaperProvider theme={theme}>
//           <SafeAreaProvider>
//             <Stack>
//               <Stack.Screen name="login" options={{ headerShown: false }} />
//               <Stack.Screen name="register" options={{ headerShown: false }} />
//               {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
//               <Stack.Screen name="+not-found" />
//             </Stack>
//           </SafeAreaProvider>
//         </PaperProvider>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// }
