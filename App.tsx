import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation/Navigation";
import React from "react";
import { Player } from "./src/components/player/Player";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar style={colorScheme === "light" ? "inverted" : "auto"} />
        <Player />
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}
