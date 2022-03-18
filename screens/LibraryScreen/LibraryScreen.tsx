import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Container, Paper } from '../../components/ui-kit/Themed';
import { RootTabScreenProps } from '../../types';

const PLAYLISTS = [
  {
    id: 1,
    title: 'Liked Songs',
    type: 'Playlist',
    itemCount: 621,
    art: require('../../assets/images/playlists/liked-art.png'),
  },
  {
    id: 2,
    title: 'Jamming',
    type: 'Playlist',
    itemCount: 11,
    art: require('../../assets/images/playlists/jamming-art.png'),
  },
  {
    id: 3,
    title: 'Clean and Warm',
    type: 'Playlist',
    itemCount: 52,
    art: require('../../assets/images/playlists/clean-and-warm-art.png'),
  },
  {
    id: 4,
    title: 'Learn This',
    type: 'Playlist',
    itemCount: 23,
    art: require('../../assets/images/playlists/learn-this-art.png'),
  },
]

export function LibraryHeader() {
  return (
    <Paper>
      <SafeAreaView edges={['top']} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24 }}>
        <Typography style={{ fontSize: 24, fontWeight: 'bold' }}>Your Library</Typography>
        <View style={{ flexDirection: 'row' }}>
          <Typography style={{ padding: 6 }} intent='muted'><Ionicons size={30} name="search" /></Typography>
          <Typography style={{ padding: 6 }} intent='muted'><Ionicons size={30} name="add" /></Typography>
        </View>
      </View>
    </Paper>
  );
}

export default function LibraryScreen({ navigation }: RootTabScreenProps<'Library'>) {
  return (
    <Container style={styles.container}>
      <FlatList style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 10 }}
        data={PLAYLISTS}
        renderItem={(r) => (
          <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10 }}>
            <Image style={{ aspectRatio: 1, width: 60 }} source={r.item.art} />
            <View style={{ paddingHorizontal: 16, justifyContent: 'center' }}>
              <Typography>{r.item.title}</Typography>
              <Typography intent="muted">{r.item.type} • {r.item.itemCount} songs</Typography>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(r) => r.id.toString()}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
