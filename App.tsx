import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation/Navigation";
import React, { useEffect, useState } from "react";
import { Player } from "./src/components/ui-kit/Player";
import { MiniPlayer } from "./src/components/MiniPlayer";
import { FullPlayer } from "./src/components/FullPlayer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SongProvider, useSongs } from "./src/hooks/useSongs";
import { SettingsProvider, useSettings } from "./src/hooks/useSettings";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SettingsProvider>
            <SongProvider>
              <Content />
            </SongProvider>
          </SettingsProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    );
  }
}

function Content() {
  const colorScheme = useColorScheme();
  const [tabBarHeight, setTabBarHeight] = useState<number | undefined>(undefined);
  const settings = useSettings();
  const songs = useSongs();

  useEffect(() => {
    if (settings.state.selectedSongId === undefined && songs.songList.length > 0) {
      settings.set({ selectedSongId: songs.songList[0].id })
    }
  }, [songs])

  return (
    <React.Fragment>
      <StatusBar style={colorScheme === "light" ? "inverted" : "auto"} />
      {tabBarHeight &&
        <Player
          fullPlayer={(props) => <FullPlayer {...props} />}
          miniPlayer={(props) => <MiniPlayer {...props} />}
          marginBottom={tabBarHeight}
        />
      }
      <Navigation onTabBarLayout={(e) => {
        setTabBarHeight(e.nativeEvent.layout.height)
      }} colorScheme={colorScheme} />
    </React.Fragment>
  )
}