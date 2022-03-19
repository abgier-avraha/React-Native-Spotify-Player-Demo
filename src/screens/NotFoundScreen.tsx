import { StyleSheet, TouchableOpacity } from 'react-native';

import { Typography, Container } from '../components/ui-kit/Themed';
import { RootStackScreenProps } from '../../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <Container style={styles.container}>
      <Typography style={styles.title}>This screen doesn't exist.</Typography>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Typography style={styles.linkText}>Go to home screen!</Typography>
      </TouchableOpacity>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
