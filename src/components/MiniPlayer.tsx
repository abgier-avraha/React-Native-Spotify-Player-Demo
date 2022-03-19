import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Image } from "react-native";
import { Typography } from "./ui-kit/Themed";

export function MiniPlayer() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#446070",
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 12,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Image
            style={{
              width: 40,
              borderRadius: 5,
              aspectRatio: 1,
              marginRight: 10,
            }}
            source={require("../../assets/images/albums/ma-drive-slow-art.jpg")}
          />

          <View style={{ flex: 1 }}>
            <Typography>Easy</Typography>
            <Typography intent="muted">Mac Ayres</Typography>
          </View>

          <View>
            <Typography>
              <Ionicons size={26} name="play" />
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
}
