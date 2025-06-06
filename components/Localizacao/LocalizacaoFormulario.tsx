import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert
} from 'react-native';
import { Localizacao } from '../../models/Localizacao';

interface LocalizacaoFormularioProps {
  onGravar: (localizacao: Omit<Localizacao, 'id_localizacao'>) => Promise<void>;
  onAtualizar: (localizacao: Localizacao) => Promise<void>;
  localizacaoEdicao: Localizacao | null;
}

const LocalizacaoFormulario: React.FC<LocalizacaoFormularioProps> = ({
  onGravar, onAtualizar, localizacaoEdicao,
}) => {
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');

  useEffect(() => {
    if (localizacaoEdicao) {
      setCidade(localizacaoEdicao.cidade);
      setEstado(localizacaoEdicao.estado);
      setCep(localizacaoEdicao.cep);
      setRua(localizacaoEdicao.rua);
      setNumero(localizacaoEdicao.numero);
      setComplemento(localizacaoEdicao.complemento ?? '');
    } else {
      setCidade('');
      setEstado('');
      setCep('');
      setRua('');
      setNumero('');
      setComplemento('');
    }
  }, [localizacaoEdicao]);

  const salvar = async () => {
    if (!cidade || !estado || !cep || !rua || !numero) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const dados: Omit<Localizacao, 'id_localizacao'> = {
      cidade,
      estado,
      cep,
      rua,
      numero,
      complemento: complemento || '',
    };

    try {
      if (localizacaoEdicao) {
        await onAtualizar({ ...dados, id_localizacao: localizacaoEdicao.id_localizacao! });
        Alert.alert('Sucesso', 'Localização atualizada com sucesso!');
      } else {
        await onGravar(dados);
        Alert.alert('Sucesso', 'Localização cadastrada com sucesso!');
      }

      setCidade('');
      setEstado('');
      setCep('');
      setRua('');
      setNumero('');
      setComplemento('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados da localização.');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Image source={require('../../assets/fiap-logo-home.png')} style={styles.logo} resizeMode="contain" />

      <Text style={styles.label}>Cidade *</Text>
      <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholder="Cidade" placeholderTextColor="#aaa" />

      <Text style={styles.label}>Estado *</Text>
      <TextInput style={styles.input} value={estado} onChangeText={setEstado} placeholder="Estado (UF)" placeholderTextColor="#aaa" maxLength={2} />

      <Text style={styles.label}>CEP *</Text>
      <TextInput style={styles.input} value={cep} onChangeText={setCep} placeholder="CEP" placeholderTextColor="#aaa" />

      <Text style={styles.label}>Rua *</Text>
      <TextInput style={styles.input} value={rua} onChangeText={setRua} placeholder="Rua" placeholderTextColor="#aaa" />

      <Text style={styles.label}>Número *</Text>
      <TextInput style={styles.input} value={numero} onChangeText={setNumero} placeholder="Número" placeholderTextColor="#aaa" />

      <Text style={styles.label}>Complemento</Text>
      <TextInput style={styles.input} value={complemento} onChangeText={setComplemento} placeholder="Complemento" placeholderTextColor="#aaa" />

      <View style={styles.botaoContainer}>
        <Button
          title={localizacaoEdicao ? 'Atualizar Localização' : 'Cadastrar Localização'}
          onPress={salvar}
          color="#5C0000"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: '#000000' },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  logo: { width: 180, height: 180, marginBottom: 24 },
  label: {
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: 4,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#5C0000',
    borderRadius: 6,
    padding: 8,
    color: '#FFFFFF',
  },
  botaoContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export { LocalizacaoFormulario };
