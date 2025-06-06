import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert
} from 'react-native';
import { Recurso } from '../../models/Recurso';

interface Props {
  onGravar: (recurso: Omit<Recurso, 'id_recurso'>) => Promise<void>;
  onAtualizar: (recurso: Recurso) => Promise<void>;
  recursoEdicao: Recurso | null;
}

const RecursoFormulario: React.FC<Props> = ({ onGravar, onAtualizar, recursoEdicao }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');

  useEffect(() => {
    if (recursoEdicao) {
      setNome(recursoEdicao.nome);
      setTipo(recursoEdicao.tipo);
      setUnidadeMedida(recursoEdicao.unidadeMedida);
    } else {
      setNome('');
      setTipo('');
      setUnidadeMedida('');
    }
  }, [recursoEdicao]);

  const salvar = async () => {
    if (!nome || !tipo || !unidadeMedida) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios');
      return;
    }

    const dados: Omit<Recurso, 'id_recurso'> = { nome, tipo, unidadeMedida };

    try {
      if (recursoEdicao) {
        await onAtualizar({ ...dados, id_recurso: recursoEdicao.id_recurso! });
        Alert.alert('Sucesso', 'Recurso atualizado com sucesso!');
      } else {
        await onGravar(dados);
        Alert.alert('Sucesso', 'Recurso cadastrado com sucesso!');
      }
      setNome('');
      setTipo('');
      setUnidadeMedida('');
    } catch (err) {
      Alert.alert('Erro', 'Erro ao salvar recurso');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Image source={require('../../assets/fiap-logo-home.png')} style={styles.logo} />
      <Text style={styles.label}>Nome *</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome" placeholderTextColor="#aaa" />

      <Text style={styles.label}>Tipo *</Text>
      <TextInput style={styles.input} value={tipo} onChangeText={setTipo} placeholder="Tipo" placeholderTextColor="#aaa" />

      <Text style={styles.label}>Unidade de Medida *</Text>
      <TextInput style={styles.input} value={unidadeMedida} onChangeText={setUnidadeMedida} placeholder="Unidade" placeholderTextColor="#aaa" />

      <View style={styles.botaoContainer}>
        <Button title={recursoEdicao ? 'Atualizar Recurso' : 'Cadastrar Recurso'} onPress={salvar} color="#5C0000" />
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

export { RecursoFormulario };
