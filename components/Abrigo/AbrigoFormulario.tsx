import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert
} from 'react-native';
import type { Abrigo } from '../../models/Abrigo';

interface AbrigoFormularioProps {
  onGravar: (abrigo: Omit<Abrigo, 'id_abrigo'>) => Promise<void>;
  onAtualizar: (abrigo: Abrigo) => Promise<void>;
  abrigoEdicao: Abrigo | null;
}

const AbrigoFormulario: React.FC<AbrigoFormularioProps> = ({ onGravar, onAtualizar, abrigoEdicao }) => {
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [status, setStatus] = useState('');
  const [idLocalizacao, setIdLocalizacao] = useState('');

  // Carrega dados para edição, se houver
  useEffect(() => {
    if (abrigoEdicao) {
      setNome(abrigoEdicao.nome);
      setCapacidade(String(abrigoEdicao.capacidade));
      setStatus(abrigoEdicao.status ?? '');
      setIdLocalizacao(String(abrigoEdicao.idLocalizacao));
    } else {
      // resetar formulário ao sair da edição
      setNome('');
      setCapacidade('');
      setStatus('');
      setIdLocalizacao('');
    }
  }, [abrigoEdicao]);

  const salvar = async () => {
    if (!nome || !capacidade || !idLocalizacao) {
      Alert.alert('Atenção', 'Preencha os campos obrigatórios');
      return;
    }

    const allowedStatus = ['Ativo', 'Inativo', 'Esgotado'] as const;
    type StatusType = typeof allowedStatus[number];
    const statusValue: StatusType | undefined = allowedStatus.includes(status as StatusType)
      ? (status as StatusType)
      : undefined;

    const dadosAbrigo: Omit<Abrigo, 'id_abrigo'> = {
      nome,
      capacidade: Number(capacidade),
      status: statusValue,
      idLocalizacao: Number(idLocalizacao),
    };

    try {
      if (abrigoEdicao) {
        await onAtualizar({
          ...dadosAbrigo,
          id_abrigo: abrigoEdicao.id_abrigo!,
        });
        Alert.alert('Sucesso', 'Abrigo atualizado com sucesso!');
      } else {
        await onGravar(dadosAbrigo);
        Alert.alert('Sucesso', 'Abrigo cadastrado com sucesso!');
      }

      setNome('');
      setCapacidade('');
      setStatus('');
      setIdLocalizacao('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados do abrigo.');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Image source={require('../../assets/fiap-logo-home.png')} style={styles.logo} resizeMode="contain" />
      
      <Text style={styles.label}>Nome *</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do abrigo"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Capacidade *</Text>
      <TextInput
        style={styles.input}
        value={capacidade}
        onChangeText={setCapacidade}
        keyboardType="numeric"
        placeholder="Número de pessoas"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="Ex: Ativo, Inativo, Esgotado"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>ID Localização *</Text>
      <TextInput
        style={styles.input}
        value={idLocalizacao}
        onChangeText={setIdLocalizacao}
        keyboardType="numeric"
        placeholder="ID da localização"
        placeholderTextColor="#aaa"
      />

      <View style={styles.botaoContainer}>
        <Button
          title={abrigoEdicao ? 'Atualizar Abrigo' : 'Cadastrar Abrigo'}
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

export { AbrigoFormulario };
