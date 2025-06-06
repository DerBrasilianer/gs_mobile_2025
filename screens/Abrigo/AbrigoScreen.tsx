import React, { useEffect, useState } from 'react';
import {
  View, Button, StyleSheet, SafeAreaView, Alert, TextInput
} from 'react-native';
import { Abrigo } from '../../models/Abrigo';
import { AbrigoFormulario } from '../../components/Abrigo/AbrigoFormulario';
import { AbrigoListagem } from '../../components/Abrigo/AbrigoListagem';
import * as abrigoService from '../../src/services/AbrigoService';

const AbrigoScreen = (): React.ReactElement => {
  const [lista, setLista] = useState<Abrigo[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchLocalizacaoId, setSearchLocalizacaoId] = useState('');
  const [abrigoEmEdicao, setAbrigoEmEdicao] = useState<Abrigo | null>(null);

  const carregarListaCompleta = async () => {
    try {
      const abrigos = await abrigoService.getAbrigos();
      setLista(abrigos);
    } catch (error) {
      console.error('Erro ao carregar abrigos:', error);
      Alert.alert('Erro', 'Erro ao carregar abrigos');
    }
  };

  useEffect(() => {
    carregarListaCompleta();
  }, []);

  useEffect(() => {
    const filtrar = async () => {
      const idAbrigo = Number(searchId.trim());
      const idLocalizacao = Number(searchLocalizacaoId.trim());

      if (!searchId && !searchLocalizacaoId) {
        carregarListaCompleta();
        return;
      }

      try {
        const todos = await abrigoService.getAbrigos();

        const filtrados = todos.filter((abrigo) => {
          const matchAbrigo = !searchId || abrigo.id_abrigo === idAbrigo;
          const matchLocalizacao = !searchLocalizacaoId || abrigo.idLocalizacao === idLocalizacao;
          return matchAbrigo && matchLocalizacao;
        });

        setLista(filtrados);
      } catch (error) {
        setLista([]);
      }
    };

    filtrar();
  }, [searchId, searchLocalizacaoId]);

  const onGravar = async (abrigo: Omit<Abrigo, 'id_abrigo'>) => {
    try {
      const criado = await abrigoService.createAbrigo(abrigo);
      setLista((prev) => [...prev, criado]);
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Erro ao criar abrigo:', error);
      Alert.alert('Erro', 'Erro ao salvar abrigo');
    }
  };

  const onAtualizar = async (abrigo: Abrigo) => {
    try {
      await abrigoService.updateAbrigo(abrigo);
      await carregarListaCompleta();
      setSearchId('');
      setSearchLocalizacaoId('');
      setAbrigoEmEdicao(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Erro ao atualizar abrigo:', error);
      Alert.alert('Erro', 'Erro ao atualizar abrigo');
    }
  };

  const onRemover = async (id_abrigo: number) => {
    try {
      await abrigoService.deleteAbrigo(id_abrigo);
      setLista((prev) => prev.filter((item) => item.id_abrigo !== id_abrigo));
    } catch (error) {
      console.error('Erro ao remover abrigo:', error);
      Alert.alert('Erro', 'Erro ao remover abrigo');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.botaoContainer}>
        <Button
          title={mostrarFormulario ? 'Mostrar Lista' : 'Mostrar Formulário'}
          onPress={() => {
            setMostrarFormulario(!mostrarFormulario);
            setAbrigoEmEdicao(null);
            setSearchId('');
            setSearchLocalizacaoId('');
          }}
          color="#5C0000"
        />
      </View>

      {!mostrarFormulario && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar abrigo por ID"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={searchId}
            onChangeText={setSearchId}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar abrigo por ID de localização"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={searchLocalizacaoId}
            onChangeText={setSearchLocalizacaoId}
          />
        </View>
      )}

      {mostrarFormulario ? (
        <AbrigoFormulario
          onGravar={onGravar}
          abrigoEdicao={abrigoEmEdicao}
          onAtualizar={onAtualizar}
        />
      ) : (
        <AbrigoListagem
          lista={lista}
          onRemover={onRemover}
          onEditar={(abrigo) => {
            setAbrigoEmEdicao(abrigo);
            setMostrarFormulario(true);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  botaoContainer: {
    margin: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#5C0000',
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
});

export { AbrigoScreen };
