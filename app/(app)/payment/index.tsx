import React from "react";
import { Redirect, useGlobalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView, { WebViewNavigation } from "react-native-webview";

export default function () {
  const webview = React.useRef(null);
  const { url } = useGlobalSearchParams<{ url: string }>();

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url: webviewUrl } = navState;

    if (webviewUrl !== url) {

    }
  };

  if (!url) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="flex-1">
      <WebView
        ref={webview}
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
}
