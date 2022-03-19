import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Animated, { Easing, interpolateColor, interpolateColors, processColor, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Paper, Typography } from "./ui-kit/Themed";

interface ISong {
  id: number,
  albumArt: any,
  artist: string,
  song: string,
  color: string,
}

const songs: ISong[] = [
  {
    id: 1,
    albumArt: require("../../assets/images/albums/ma-drive-slow-art.jpg"),
    artist: 'Mac Ayres',
    song: 'Easy',
    // Dominiant color can be retrieved with native module
    color: "#446070",
  },
  {
    id: 2,
    albumArt: require("../../assets/images/albums/tomo-art.jpg"),
    artist: 'Tomo Fujita',
    song: 'Kyoto',
    color: "#facc14",
  },
  {
    id: 3,
    albumArt: require("../../assets/images/albums/green-screen-art.jpg"),
    artist: 'Cory Wong',
    song: 'Pleasin\'',
    color: "#81b59a",
  },
]

const componentWidth = Dimensions.get("window").width;

export function FullPlayer() {
  const [hoveredSongIndex, setHoveredSongIndex] = useState<number | undefined>();
  const [selectedSongId, setSelectedSongId] = useState(songs[0].id);
  const selectedSongColor = useSharedValue("#000");
  const lastSongColor = useSharedValue("#000");

  const toggleAnimation = useSharedValue(0);

  const selectedSong = useMemo(() => {
    if (selectedSong) {
      lastSongColor.value = selectedSong.color;
    }
    const newSong = songs.find((s) => selectedSongId === s.id);
    if (newSong) {
      selectedSongColor.value = newSong.color;
      toggleAnimation.value = 1;
      return newSong;
    }
    return
  }, [selectedSongId]);

  const progress = useDerivedValue(() => {
    return withTiming(toggleAnimation.value, { duration: 300 }, (e) => {
      if (e) {
        lastSongColor.value = selectedSongColor.value;
        toggleAnimation.value = 0;
      }
    })
  });


  const animationStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [lastSongColor.value, selectedSongColor.value]
    );

    return {
      backgroundColor: backgroundColor,
    }
  }, [])

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.abs(Math.round(event.nativeEvent.contentOffset.x / componentWidth));
    setHoveredSongIndex(index)
  }, []);

  return (
    <Animated.View
      style={[animationStyle, { flex: 1 }]}
    >
      <LinearGradient
        style={{ flex: 1 }}
        start={{ x: 0, y: 0.4 }}
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
      >
        <SafeAreaView edges={["top"]} style={{ flex: 0.8, padding: 24 }}>
          <Typography>
            <Ionicons size={32} name="chevron-down"></Ionicons>
          </Typography>
        </SafeAreaView>
        <View style={{ flex: 5.5 }}>
          <FlatList
            snapToAlignment="center"
            snapToInterval={componentWidth}
            showsHorizontalScrollIndicator={false}
            decelerationRate={"fast"}
            data={songs}
            horizontal
            keyExtractor={(i) => i.id.toString()}
            onScroll={onScroll}
            onMomentumScrollEnd={() => {
              if (hoveredSongIndex !== undefined) {
                setSelectedSongId(songs[hoveredSongIndex].id)
              }
            }}
            renderItem={(i) => (
              <View style={{ width: componentWidth, alignItems: 'center' }}>
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
                {selectedSong?.song}
              </Typography>
              <Typography style={{ fontSize: 20, opacity: 0.7 }}>
                {selectedSong?.artist}
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
