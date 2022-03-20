import { useMemo, useState } from "react";
import { createServiceProvider } from "./createServiceProvider";
import { useSettings } from "./useSettings";

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
    color: "#558ba7",
  },
  {
    id: 2,
    albumArt: require("../../assets/images/albums/tomo-art.jpg"),
    artist: 'Tomo Fujita',
    song: 'Kyoto',
    color: "#e69f00",
  },
  {
    id: 3,
    albumArt: require("../../assets/images/albums/green-screen-art.jpg"),
    artist: 'Cory Wong',
    song: 'Pleasin\'',
    color: "#88c1b8",
  },
];

interface SongsContext {
  songList: ISong[];
  selectedSong?: ISong;
}

const [ServiceProvider, useHook] = createServiceProvider<SongsContext>();

interface Props {
  children?: React.ReactNode;
}


export const SongProvider = (props: Props) => {
  const settings = useSettings();
  const [songList] = useState<ISong[]>(songs);

  const selectedSong = useMemo(() => songList.find((s) => s.id === settings.state.selectedSongId), [settings.state.selectedSongId])

  return <ServiceProvider value={{ songList, selectedSong }}>{props.children}</ServiceProvider>;
};


export const useSongs = () => useHook();