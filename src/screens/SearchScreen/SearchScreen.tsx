import { StyleSheet } from 'react-native';

import { Typography, Container } from '../../components/ui-kit/Themed';

export default function SearchScreen() {
  return (
    <Container style={styles.container}>
      <Typography style={styles.title}>Search</Typography>
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
