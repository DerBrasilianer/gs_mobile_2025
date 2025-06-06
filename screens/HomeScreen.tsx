import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const HomeScreen = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/fiap-logo-home.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>FIAP - Global Solution 2025</Text>
      <Text style={styles.subtitle}>Use o menu para acessar a gestão</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Preto
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6347', // Vermelho suave (Tomato)
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 20,
    color: '#CCCCCC', // Cinza claro para contraste
  },
});

export { HomeScreen };
