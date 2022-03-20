import { Ionicons } from "@expo/vector-icons";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSettings } from "../hooks/useSettings";
import { useSongs } from "../hooks/useSongs";
import { useAnimatedBackgroundColor } from "../hooks/useAnimatedBackgroundColor";
import { Typography } from "./ui-kit/Themed";

export function MiniPlayer(props: { onPress: () => void }) {
  const [scrollerWidth, setScrollerWidth] = useState<number>(0);
  const songs = useSongs();
  const animatedBackgroundColor = useAnimatedBackgroundColor(songs.selectedSong?.color ?? "#000");

  return (
    <View
      style={{
        flex: 1,
        padding: 6,
      }}
    >
      <Animated.View
        style={[animatedBackgroundColor, {
          flex: 1,
          borderRadius: 6,
          overflow: 'hidden',
        }]}
      >
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.7)",
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image
            style={{
              borderRadius: 5,
              aspectRatio: 1,
              flex: 1,
              margin: 6
            }}
            source={songs.selectedSong?.albumArt}
          />

          <View
            onLayout={(e) => {
              setScrollerWidth(e.nativeEvent.layout.width)
            }}
            style={{
              flex: 6,
            }}>
            <ScrollingList width={scrollerWidth} onPress={props.onPress} />
          </View>

          <View style={{
            flex: 1, alignItems: 'center'
          }}>
            <Typography>
              <Ionicons size={26} name="play" />
            </Typography>
          </View>

        </View>
      </Animated.View>
    </View>
  );
}


function ScrollingList(props: { width: number; onPress: () => void }) {
  const songs = useSongs();
  const settings = useSettings();

  const flatList = createRef<FlatList>();
  const [hoveredSongIndex, setHoveredSongIndex] = useState<number | undefined>();

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.abs(Math.round(event.nativeEvent.contentOffset.x / props.width));
    setHoveredSongIndex(index)
  }, [props.width]);

  useEffect(() => {
    if (flatList.current && songs.selectedSong) {
      flatList.current.scrollToIndex({ index: songs.songList.indexOf(songs.selectedSong) })
    }
  }, [songs.selectedSong])

  return (
    <FlatList
      ref={flatList}
      style={{ width: props.width }}
      snapToAlignment="center"
      snapToInterval={props.width}
      showsHorizontalScrollIndicator={false}
      decelerationRate={"fast"}
      data={songs.songList}
      getItemLayout={(_, index) => (
        { length: props.width, offset: props.width * index, index }
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
        <Pressable onPress={props.onPress} style={{ width: props.width, justifyContent: 'center' }}>
          <Typography>{i.item.song}</Typography>
          <Typography intent="muted">{i.item.artist}</Typography>
        </Pressable>
      )}
    />
  )
}