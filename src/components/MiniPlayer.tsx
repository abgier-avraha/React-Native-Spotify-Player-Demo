import { Ionicons } from "@expo/vector-icons";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity, View } from "react-native";
import { useSettings } from "../hooks/useSettings";
import { useSongs } from "../hooks/useSongs";
import { InterpolatingBackground } from "./ui-kit/InterpolatingBackground";
import { Typography } from "./ui-kit/Themed";

const componentPadding = 6;
const componentWidth = Dimensions.get("window").width - componentPadding;

export function MiniPlayer(props: { onPress: () => void }) {
  const songs = useSongs();

  return (
    <View
      style={{
        flex: 1,
        padding: componentPadding,
      }}
    >
      <InterpolatingBackground
        backgroundColor={songs.selectedSong?.color ?? "#000"}
        style={{
          flex: 1,
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}>
          <ScrollingList {...props} />
        </View>
      </InterpolatingBackground>
    </View >
  );
}


function ScrollingList(props: { onPress: () => void }) {
  const songs = useSongs();
  const settings = useSettings();

  const flatList = createRef<FlatList>();
  const [hoveredSongIndex, setHoveredSongIndex] = useState<number | undefined>();

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.abs(Math.round(event.nativeEvent.contentOffset.x / componentWidth));
    setHoveredSongIndex(index)
  }, []);

  useEffect(() => {
    if (flatList.current && songs.selectedSong) {
      flatList.current.scrollToIndex({ index: songs.songList.indexOf(songs.selectedSong) })
    }
  }, [songs.selectedSong])

  return (
    <FlatList
      ref={flatList}
      style={{ flex: 1 }}
      snapToAlignment="center"
      snapToInterval={componentWidth}
      showsHorizontalScrollIndicator={false}
      decelerationRate={"fast"}
      data={songs.songList}
      getItemLayout={(_, index) => (
        { length: componentWidth, offset: componentWidth * index, index }
      )}
      horizontal
      keyExtractor={(i) => i.id.toString()}
      onScroll={onScroll}
      onMomentumScrollEnd={() => {
        if (hoveredSongIndex !== undefined) {
          settings.set({ selectedSongId: songs.songList[hoveredSongIndex].id })
        }
      }}
      renderItem={(i) => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 6,
            width: componentWidth,
          }}

          onPress={props.onPress}
        >
          <Image
            style={{
              flex: 1,
              borderRadius: 5,
              aspectRatio: 1,
              marginRight: 10,
            }}
            source={i.item.albumArt}
          />

          <View style={{ flex: 6 }}>
            <Typography>{i.item.song}</Typography>
            <Typography intent="muted">{i.item.artist}</Typography>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Typography>
              <Ionicons size={26} name="play" />
            </Typography>
          </View>
        </TouchableOpacity>
      )} />
  )
}