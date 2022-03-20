import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSongs } from "../hooks/useSongs";
import { Typography } from "./ui-kit/Themed";

export function MiniPlayer(props: { onPress: () => void }) {
  const songs = useSongs();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: songs.selectedSong?.color,
      }}
      onPress={props.onPress}
    >
      <View
        style={{
          flex: 1,
          padding: 12,
          backgroundColor: "rgba(0,0,0,0.7)",
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
            source={songs.selectedSong?.albumArt}
          />

          <View style={{ flex: 1 }}>
            <Typography>{songs.selectedSong?.song}</Typography>
            <Typography intent="muted">{songs.selectedSong?.artist}</Typography>
          </View>

          <View>
            <Typography>
              <Ionicons size={26} name="play" />
            </Typography>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
