import React from "react";
import { Dimensions } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

type GestureContext = {
  startY: number;
};

export function Player(props: { marginBottom: number, miniPlayer: () => React.ReactNode, fullPlayer: () => React.ReactNode, miniPlayerHeight?: number }) {
  const { miniPlayerHeight = 70 } = props;

  const dragToggleDistance = 150;
  const screenHeight = Dimensions.get('screen').height;
  const fadeDistance = 50;

  const isOpen = useSharedValue(false);
  const yTranslation = useSharedValue(0);
  const yLimit = screenHeight - props.marginBottom - miniPlayerHeight;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: GestureContext) => {
      ctx.startY = yTranslation.value;
    },
    onActive: (event, ctx: GestureContext) => {
      const newValue = ctx.startY - event.translationY;

      yTranslation.value =
        newValue < 0
          ? 0
          : newValue > yLimit
            ? yLimit
            : newValue;

      if (
        yTranslation.value - ctx.startY > dragToggleDistance
      ) {
        isOpen.value = true;
      } else if (
        yTranslation.value - ctx.startY < -dragToggleDistance
      ) {
        isOpen.value = false;
      }
    },
    onEnd: (_) => {
      if (isOpen.value) {
        yTranslation.value = withSpring(yLimit, {
          stiffness: 500,
          damping: 500,
        });
      } else {
        yTranslation.value = withSpring(0, {
          stiffness: 500,
          damping: 500,
        });
      }
    },
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const percentOpen = yTranslation.value / yLimit;

    const borderRadius = 30 * percentOpen;
    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      maxHeight: miniPlayerHeight + yTranslation.value * 2,
      transform: [
        {
          translateY: yLimit - yTranslation.value,
        },
      ],
    };
  });

  const fullPlayerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        1 -
        (fadeDistance - (yTranslation.value)) / fadeDistance,
    };
  });

  const miniPlayerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        (fadeDistance - (yTranslation.value)) / fadeDistance,
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
              height: screenHeight,
            },
          ]}
        >
          {props.fullPlayer()}
        </Animated.View>
        <Animated.View
          style={[
            miniPlayerAnimatedStyle,
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: miniPlayerHeight,
            },
          ]}
        >
          {props.miniPlayer()}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}
