import { Redirect, router, useGlobalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView, { WebViewNavigation } from "react-native-webview";

export default function Payment() {
  const webview = React.useRef(null);
  const { url } = useGlobalSearchParams<{ url: string }>();

  const handleNavigationChange = (navigationState: WebViewNavigation) => {
    const { url: currentUrl } = navigationState;
    console.log(currentUrl);
    if (currentUrl.includes("/api/v1/payment/success")) {
      router.replace("/checkout/success");
      return;
    }

    if (currentUrl.includes("/api/v1/payment/failure")) {
      router.replace("/checkout/failure");
      return;
    }
  };

  if (!url) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="flex-1">
      <WebView
        ref={webview}
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationChange}
      />
    </SafeAreaView>
  );
}
