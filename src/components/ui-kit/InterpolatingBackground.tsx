import { useEffect } from "react";
import { ViewStyle } from "react-native";
import Animated, { useSharedValue, useDerivedValue, withTiming, useAnimatedStyle, interpolateColor } from "react-native-reanimated";
import { usePrevious } from "../../hooks/usePrevious";

interface IProps {
  style: ViewStyle;
  backgroundColor: string;
  children: React.ReactNode;
}

export function InterpolatingBackground(props: IProps) {

  const previousColor = usePrevious(props.backgroundColor);

  const currentColorValue = useSharedValue(props.backgroundColor ?? "#000");
  const lastColorValue = useSharedValue("#000");

  const toggleAnimation = useSharedValue(0);

  useEffect(() => {
    if (props.backgroundColor && previousColor) {
      currentColorValue.value = props.backgroundColor;
      toggleAnimation.value = 1;
    }
  }, [props.backgroundColor])


  const progress = useDerivedValue(() => {
    return withTiming(toggleAnimation.value, { duration: 300 }, (e) => {
      if (e) {
        lastColorValue.value = currentColorValue.value;
        toggleAnimation.value = 0;
      }
    })
  });

  const animationStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [lastColorValue.value, currentColorValue.value]
    );

    return {
      backgroundColor: backgroundColor,
    }
  }, [])

  return (
    <Animated.View style={[animationStyle, props.style]}>
      {props.children}
    </Animated.View>
  )
}