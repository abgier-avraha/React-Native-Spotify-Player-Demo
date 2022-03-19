import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation/Navigation";
import React, { useState } from "react";
import { Player } from "./src/components/ui-kit/Player";
import { MiniPlayer } from "./src/components/MiniPlayer";
import { FullPlayer } from "./src/components/FullPlayer";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [tabBarHeight, setTabBarHeight] = useState<number | undefined>(undefined);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar style={colorScheme === "light" ? "inverted" : "auto"} />
        {tabBarHeight &&
          <Player fullPlayer={FullPlayer} miniPlayer={MiniPlayer} marginBottom={tabBarHeight} />
        }
        <Navigation onTabBarLayout={(e) => {
          setTabBarHeight(e.nativeEvent.layout.height)
        }} colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}
