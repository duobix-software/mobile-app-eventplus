import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import React from "react";
import { Image } from "react-native";
import { Avatar } from "react-native-paper";
import { Searchbar } from "react-native-paper";



export default function Header() {
    const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <ThemedView className="flex justify-between items-center flex-row ">
      <Avatar.Image size={50} source={require("@/assets/images/icon.png")} />
      <Searchbar 
      className="w-3/4"
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </ThemedView>
  );
}
