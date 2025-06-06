import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Linking } from 'react-native';

const IntegrantesScreen = (): React.ReactElement => {

  const integrantes = [
    {
      nome: 'Enzo Prado Soddano',
      rm: '557937',
      foto: require('./../assets/enzo.png'),
      github: 'https://github.com/DerBrasilianer',
    },
    {
      nome: 'Lucas Resende Lima',
      rm: '556564',
      foto: require('./../assets/lucas.png'),
      github: 'https://github.com/lucasresendelima',
    },
    {
      nome: 'Vinicius Prates Altafini',
      rm: '559183',
      foto: require('./../assets/vinicius.png'),
      github: 'https://github.com/vinicius945',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {integrantes.map((integrante, index) => (
        <View key={index} style={styles.card}>
          <Image source={integrante.foto} style={styles.foto} />
          <Text style={styles.nome}>{integrante.nome}</Text>
          <Text style={styles.rm}>RM: {integrante.rm}</Text>
          <Pressable onPress={() => Linking.openURL(integrante.github)}>
            <Text style={styles.github}>GitHub</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#5C0000',
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rm: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  github: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF4C4C',
    textDecorationLine: 'underline',
  },
});

export { IntegrantesScreen };
