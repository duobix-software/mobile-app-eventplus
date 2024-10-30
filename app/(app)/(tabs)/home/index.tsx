import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "@/components/Home/Categories";
import Header from "@/components/Home/Header";
import SpecialEvents from "@/components/Home/SpecialEvents";
import PopulaireEvents from "@/components/Home/PopulaireEvents";
import { Text } from "react-native-paper";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header />
        <Categories />
        {/* <SpecialEvents /> */}
        {/* <PopulaireEvents /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
