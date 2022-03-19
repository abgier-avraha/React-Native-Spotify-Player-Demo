/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Player } from '../components/player/Player';
import { Typography, useThemeColor } from '../components/ui-kit/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LibraryScreen, { LibraryHeader } from '../screens/LibraryScreen/LibraryScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const theme = useThemeColor()
  const icons: Record<keyof RootTabParamList, React.ComponentProps<typeof Ionicons>['name']> = {
    Home: 'home',
    Search: 'search',
    Library: 'library',
  };

  return (
    <BottomTab.Navigator
      tabBar={(p) => (
        <View>
          <Player />
          <SafeAreaView edges={['bottom']} style={{ flexDirection: 'row', paddingVertical: 12 }}>
            {p.state.routes.map((r, index) => {
              const isFocused = p.state.index === index;
              const onPress = () => {
                const event = p.navigation.emit({
                  type: 'tabPress',
                  target: r.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  p.navigation.navigate(r.name);
                }
              };

              return (
                <Pressable key={r.name} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={onPress}>
                  <TabBarIcon color={isFocused ? theme.tabIconSelected : theme.tabIconDefault} name={(icons as any)[r.name]} />
                  <Typography style={{ fontSize: 10, color: isFocused ? theme.tabIconSelected : theme.tabIconDefault }}>{r.name}</Typography>
                </Pressable>
              )
            }
            )}
          </SafeAreaView>
        </View>
      )}
      initialRouteName="Home"
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
        }}
      />
      <BottomTab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          title: 'Library',
          header: LibraryHeader
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={25} {...props} />;
}
