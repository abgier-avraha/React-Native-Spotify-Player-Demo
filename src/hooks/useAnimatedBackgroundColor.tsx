import { useEffect } from "react";
import { interpolateColor, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

export function useAnimatedBackgroundColor(backgroundColor: string, duration = 300) {
  const animating = useSharedValue(false);
  const currentColorValue = useSharedValue("#000");
  const lastColorValue = useSharedValue("#000");

  useEffect(() => {
    currentColorValue.value = backgroundColor;
    animating.value = true;
  }, [backgroundColor])

  const progress = useDerivedValue(() => {
    if (animating.value) {
      return withTiming(1, { duration }, (e) => {
        if (e) {
          lastColorValue.value = currentColorValue.value;
          animating.value = false;
        }
      });
    } else {
      return 0;
    }
  }, [animating.value]);

  const animationStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [lastColorValue.value, currentColorValue.value]
      )
    }
  })

  return animationStyle;
}