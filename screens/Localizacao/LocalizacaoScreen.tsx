import React, { useEffect, useState } from 'react';
import {
  View, Button, StyleSheet, SafeAreaView, Alert, TextInput
} from 'react-native';
import { Localizacao } from '../../models/Localizacao';
import { LocalizacaoFormulario } from '../../components/Localizacao/LocalizacaoFormulario';
import { LocalizacaoListagem } from '../../components/Localizacao/LocalizacaoListagem';
import * as localizacaoService from '../../src/services/LocalizacaoService';

const LocalizacaoScreen = (): React.ReactElement => {
  const [lista, setLista] = useState<Localizacao[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [localizacaoEmEdicao, setLocalizacaoEmEdicao] = useState<Localizacao | null>(null);

  const carregarLista = async () => {
    try {
      const resultado = await localizacaoService.getLocalizacoes();
      setLista(resultado);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar localizações');
    }
  };

  useEffect(() => {
    carregarLista();
  }, []);

  useEffect(() => {
    const filtrar = async () => {
      if (!searchId.trim()) {
        carregarLista();
        return;
      }

      const id = Number(searchId.trim());
      try {
        const item = await localizacaoService.getLocalizacaoById(id);
        setLista(item ? [item] : []);
      } catch {
        setLista([]);
      }
    };

    filtrar();
  }, [searchId]);

  const onGravar = async (localizacao: Omit<Localizacao, 'id_localizacao'>) => {
    try {
      const nova = await localizacaoService.createLocalizacao(localizacao);
      setLista((prev) => [...prev, nova]);
      setMostrarFormulario(false);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar localização');
    }
  };

  const onAtualizar = async (localizacao: Localizacao) => {
    try {
      await localizacaoService.updateLocalizacao(localizacao);
      await carregarLista();
      setSearchId('');
      setLocalizacaoEmEdicao(null);
      setMostrarFormulario(false);
    } catch {
      Alert.alert('Erro', 'Erro ao atualizar localização');
    }
  };

  const onRemover = async (id: number) => {
    try {
      await localizacaoService.deleteLocalizacao(id);
      setLista((prev) => prev.filter((loc) => loc.id_localizacao !== id));
    } catch {
      Alert.alert('Erro', 'Erro ao remover localização');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.botaoContainer}>
        <Button
          title={mostrarFormulario ? 'Mostrar Lista' : 'Mostrar Formulário'}
          onPress={() => {
            setMostrarFormulario(!mostrarFormulario);
            setLocalizacaoEmEdicao(null);
            setSearchId('');
          }}
          color="#5C0000"
        />
      </View>

      {!mostrarFormulario && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar localização por ID"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={searchId}
            onChangeText={setSearchId}
          />
        </View>
      )}

      {mostrarFormulario ? (
        <LocalizacaoFormulario
          onGravar={onGravar}
          onAtualizar={onAtualizar}
          localizacaoEdicao={localizacaoEmEdicao}
        />
      ) : (
        <LocalizacaoListagem
          lista={lista}
          onRemover={onRemover}
          onEditar={(loc) => {
            setLocalizacaoEmEdicao(loc);
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
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#5C0000',
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
});

export { LocalizacaoScreen };
