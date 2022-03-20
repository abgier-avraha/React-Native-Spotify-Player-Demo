import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { Image, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "../hooks/useSettings";
import { useSongs } from "../hooks/useSongs";
import { useAnimatedBackgroundColor } from "../hooks/useAnimatedBackgroundColor";
import { Paper, Typography } from "./ui-kit/Themed";


export function FullPlayer(props: { onPressClose: () => void }) {
  const [scrollerWidth, setScrollerWidth] = useState<number>(0);
  const songs = useSongs();
  const animatedBackgroundColor = useAnimatedBackgroundColor(songs.selectedSong?.color ?? "#000");

  return (
    <Animated.View
      style={[animatedBackgroundColor, {
        flex: 1,
      }]}
    >
      <LinearGradient
        style={{ flex: 1 }}
        start={{ x: 0, y: 0.2 }}
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
        onLayout={(e) => {
          setScrollerWidth(e.nativeEvent.layout.width)
        }}
      >
        <SafeAreaView edges={["top"]} style={{ flex: 0.8, padding: 24 }}>
          <Typography>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => props.onPressClose()}>
              <Typography><Ionicons size={32} name="chevron-down"></Ionicons></Typography>
            </TouchableOpacity>
          </Typography>
        </SafeAreaView>
        <View style={{ flex: 5.5 }}>
          <ScrollingList width={scrollerWidth} />
        </View>
        <View
          style={{
            flex: 4,
            padding: 24
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <View>
              <Typography style={{ fontSize: 20, fontWeight: "bold" }}>
                {songs.selectedSong?.song}
              </Typography>
              <Typography style={{ fontSize: 20, opacity: 0.7 }}>
                {songs.selectedSong?.artist}
              </Typography>
            </View>
            <Ionicons size={32} name="heart" color="#3ae05e" />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 8 }}>
            <View
              style={{
                position: "absolute",
                borderRadius: 24,
                height: 12,
                aspectRatio: 1,
                backgroundColor: "#fff",
              }}
            />
            <View
              style={{
                marginTop: 3,
                flex: 1,
                height: 6,
                borderRadius: 6,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <Typography style={{ opacity: 0.7 }}>0:01</Typography>
            <Typography style={{ opacity: 0.7 }}>-5:12</Typography>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>
              <Ionicons name="shuffle" size={40} />
            </Typography>
            <Typography>
              <Ionicons name="play-skip-back" size={40} />
            </Typography>
            <Typography>
              <Ionicons name="play-circle" size={60} />
            </Typography>
            <Typography>
              <Ionicons name="play-skip-forward" size={40} />
            </Typography>
            <Typography>
              <Ionicons name="infinite" size={40} />
            </Typography>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

function ScrollingList(props: { width: number }) {
  const settings = useSettings();
  const songs = useSongs();

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
        <View style={{ width: props.width, alignItems: 'center' }}>
          <Paper
            style={{
              flexDirection: "row", flex: 1, aspectRatio: 1, backgroundColor: undefined, margin: 24,
            }}
          >
            <Image
              style={{
                flex: 1,
                aspectRatio: 1,
              }}
              resizeMode="cover"
              source={i.item.albumArt}
            />
          </Paper>
        </View>
      )}
    />
  )
}