import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Paper, Typography } from "../ui-kit/Themed";
import { LinearGradient } from "expo-linear-gradient";

// TODO: get dominant color from image
const DOMINANT_COLOR = "#446070";

type GestureContext = {
  startY: number;
};

export function Player() {
  const dragToggleDistance = 200;
  const screenHeight = 680;
  // TODO: measure
  const playerHeight = 70;
  const fadeDistance = 50;

  const isOpen = useSharedValue(false);
  const currentHeight = useSharedValue(playerHeight);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: GestureContext) => {
      ctx.startY = currentHeight.value;
    },
    onActive: (event, ctx: GestureContext) => {
      const newValue = ctx.startY - event.translationY;
      currentHeight.value =
        newValue < playerHeight
          ? playerHeight
          : newValue > screenHeight
          ? screenHeight
          : newValue;

      if (
        currentHeight.value - ctx.startY > dragToggleDistance &&
        currentHeight.value > playerHeight
      ) {
        isOpen.value = true;
      } else if (
        currentHeight.value - ctx.startY < dragToggleDistance &&
        currentHeight.value < screenHeight
      ) {
        isOpen.value = false;
      }
    },
    onEnd: (_) => {
      if (isOpen.value) {
        currentHeight.value = withSpring(screenHeight, {
          stiffness: 500,
          damping: 500,
        });
      } else {
        currentHeight.value = withSpring(playerHeight, {
          stiffness: 500,
          damping: 500,
        });
      }
    },
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const borderRadius = 30 * (currentHeight.value / screenHeight);
    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      transform: [
        {
          translateY: screenHeight - currentHeight.value,
        },
      ],
    };
  });

  const fullPlayerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        1 -
        (fadeDistance - (currentHeight.value - playerHeight)) / fadeDistance,
    };
  });

  const miniPlayerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        (fadeDistance - (currentHeight.value - playerHeight)) / fadeDistance,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            position: "absolute",
            overflow: "hidden",
          },
          containerAnimatedStyle,
        ]}
      >
        <Animated.View
          style={[
            fullPlayerAnimatedStyle,
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: DOMINANT_COLOR,
            },
          ]}
        >
          <FullPlayer />
        </Animated.View>
        <Animated.View
          style={[
            miniPlayerAnimatedStyle,
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: playerHeight,
              backgroundColor: DOMINANT_COLOR,
            },
          ]}
        >
          <MiniPlayer />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

function FullPlayer() {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.4 }}
      colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.5)"]}
      style={{
        flex: 1,
        padding: 24,
      }}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 0.8 }}>
        <Typography>
          <Ionicons size={32} name="chevron-down"></Ionicons>
        </Typography>
      </SafeAreaView>
      <Paper
        style={{ flex: 5.5, flexDirection: "row", backgroundColor: undefined }}
      >
        <Image
          style={{
            flex: 1,
            aspectRatio: 1,
          }}
          source={require("../../assets/images/albums/ma-drive-slow-art.jpg")}
        />
      </Paper>
      <View
        style={{
          flex: 4,
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
              Easy
            </Typography>
            <Typography style={{ fontSize: 20, opacity: 0.7 }}>
              Mac Ayres
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
  );
}

function MiniPlayer() {
  return (
    <View
      style={{
        padding: 12,
        backgroundColor: "rgba(0,0,0,0.6)",
        flex: 1,
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
  );
}
