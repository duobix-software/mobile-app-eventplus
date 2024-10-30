import React from "react";
import { Avatar } from "react-native-paper";
import Container from "../Container";
import { Link } from "expo-router";
import { getInitials } from "@/utils/helpers";
import { useUser } from "@/context/authentication-ctx";

export default function Header() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user, isLoading } = useUser();

  return (
    <Container className="my-2 flex flex-row items-center justify-between">
      <Avatar.Image size={45} source={require("@/assets/images/icon.png")} />
      {/* <Searchbar
        className="max-w-xs"
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      /> */}

      <Link href="/profile">
        {!isLoading ? (
          <Avatar.Text size={45} label={getInitials(user?.fullname)} />
        ) : (
          <Avatar.Text size={45} label="" />
        )}
      </Link>
    </Container>
  );
}
