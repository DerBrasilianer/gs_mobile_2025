import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import type { Ocupante } from '../../models/Ocupante';

interface OcupanteFormularioProps {
  onGravar: (ocupante: Omit<Ocupante, 'id_ocupante'>) => Promise<void>;
  onAtualizar: (ocupante: Ocupante) => Promise<void>;
  ocupanteEdicao: Ocupante | null;
}

const OcupanteFormulario: React.FC<OcupanteFormularioProps> = ({ onGravar, onAtualizar, ocupanteEdicao }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const [idAbrigo, setIdAbrigo] = useState('');

  useEffect(() => {
    if (ocupanteEdicao) {
      setNome(ocupanteEdicao.nome);
      setIdade(String(ocupanteEdicao.idade));
      setGenero(ocupanteEdicao.genero ?? '');
      setIdAbrigo(String(ocupanteEdicao.id_abrigo));
    } else {
      setNome('');
      setIdade('');
      setGenero('');
      setIdAbrigo('');
    }
  }, [ocupanteEdicao]);

  const salvar = async () => {
    if (!nome || !idade || !idAbrigo) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios');
      return;
    }

    const allowedGenero = ['Masculino', 'Feminino', 'Outro'] as const;
    type GeneroType = typeof allowedGenero[number];
    const generoValue: GeneroType | undefined = allowedGenero.includes(genero as GeneroType)
      ? (genero as GeneroType)
      : undefined;

    const dados: Omit<Ocupante, 'id_ocupante'> = {
      nome,
      idade: Number(idade),
      genero: generoValue,
      id_abrigo: Number(idAbrigo),
    };

    try {
      if (ocupanteEdicao) {
        await onAtualizar({ ...dados, id_ocupante: ocupanteEdicao.id_ocupante! });
        Alert.alert('Sucesso', 'Ocupante atualizado com sucesso!');
      } else {
        await onGravar(dados);
        Alert.alert('Sucesso', 'Ocupante cadastrado com sucesso!');
      }

      setNome('');
      setIdade('');
      setGenero('');
      setIdAbrigo('');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar os dados do ocupante.');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Image source={require('../../assets/fiap-logo-home.png')} style={styles.logo} />
      <Text style={styles.label}>Nome *</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome do ocupante" placeholderTextColor="#aaa" />
      <Text style={styles.label}>Idade *</Text>
      <TextInput style={styles.input} value={idade} onChangeText={setIdade} keyboardType="numeric" placeholder="Idade" placeholderTextColor="#aaa" />
      <Text style={styles.label}>Gênero</Text>
      <TextInput style={styles.input} value={genero} onChangeText={setGenero} placeholder="Masculino, Feminino, Outro" placeholderTextColor="#aaa" />
      <Text style={styles.label}>ID Abrigo *</Text>
      <TextInput style={styles.input} value={idAbrigo} onChangeText={setIdAbrigo} keyboardType="numeric" placeholder="ID do abrigo" placeholderTextColor="#aaa" />
      <View style={styles.botaoContainer}>
        <Button title={ocupanteEdicao ? 'Atualizar Ocupante' : 'Cadastrar Ocupante'} onPress={salvar} color="#5C0000" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: '#000' },
  container: { flexGrow: 1, padding: 20, backgroundColor: '#000', alignItems: 'center' },
  logo: { width: 180, height: 180, marginBottom: 24 },
  label: { alignSelf: 'flex-start', marginTop: 12, marginBottom: 4, color: '#FFF', fontWeight: 'bold' },
  input: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#5C0000',
    borderRadius: 6,
    padding: 8,
    color: '#FFF',
  },
  botaoContainer: { marginTop: 20, width: '100%' },
});

export { OcupanteFormulario };
