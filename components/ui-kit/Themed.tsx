/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text, View } from 'react-native';
import Colors, { Intent, ThemeType } from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';


export function useThemeColor(
) {
  const theme = useColorScheme();
  return Colors[theme];
}


export type TextProps = Text['props'] & { intent?: Intent };
export type ViewProps = View['props'];

export function Typography(props: TextProps) {
  const { style, intent = 'default', ...otherProps } = props;
  const color = useThemeColor().text[intent];

  return <Text style={[{ color }, style]} {...otherProps} />;
}

export function Container(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor().background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}


export function Paper(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor().background;
  const shadow = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  };
  console.log(backgroundColor)

  return <View style={[{ backgroundColor, ...shadow }, style]} {...otherProps} />;
}
