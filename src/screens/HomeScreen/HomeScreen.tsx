import { StyleSheet } from 'react-native';

import { Typography, Container } from '../../components/ui-kit/Themed';
import { RootTabScreenProps } from '../../../types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <Container style={styles.container}>
      <Typography style={styles.title}>Home</Typography>
      <Container style={styles.separator} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
