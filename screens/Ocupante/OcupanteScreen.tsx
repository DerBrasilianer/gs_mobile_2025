import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { Ocupante } from '../../models/Ocupante';
import { OcupanteFormulario } from '../../components/Ocupante/OcupanteFormulario';
import { OcupanteListagem } from '../../components/Ocupante/OcupanteListagem';
import * as ocupanteService from '../../src/services/OcupanteService';

const OcupanteScreen = (): React.ReactElement => {
  const [lista, setLista] = useState<Ocupante[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchAbrigoId, setSearchAbrigoId] = useState('');
  const [ocupanteEmEdicao, setOcupanteEmEdicao] = useState<Ocupante | null>(null);

  const carregarLista = async () => {
    try {
      const dados = await ocupanteService.getOcupantes();
      setLista(dados);
    } catch {
      Alert.alert('Erro', 'Erro ao carregar ocupantes');
    }
  };

  useEffect(() => {
    carregarLista();
  }, []);

  useEffect(() => {
    const filtrar = async () => {
      const id = Number(searchId.trim());
      const idAbrigo = Number(searchAbrigoId.trim());

      if (!searchId && !searchAbrigoId) {
        carregarLista();
        return;
      }

      try {
        const todos = await ocupanteService.getOcupantes();
        const filtrados = todos.filter(o =>
          (!searchId || o.id_ocupante === id) &&
          (!searchAbrigoId || o.id_abrigo === idAbrigo)
        );
        setLista(filtrados);
      } catch {
        setLista([]);
      }
    };

    filtrar();
  }, [searchId, searchAbrigoId]);

  const onGravar = async (ocupante: Omit<Ocupante, 'id_ocupante'>) => {
    try {
      const novo = await ocupanteService.createOcupante(ocupante);
      setLista((prev) => [...prev, novo]);
      setMostrarFormulario(false);
    } catch {
      Alert.alert('Erro', 'Erro ao salvar ocupante');
    }
  };

  const onAtualizar = async (ocupante: Ocupante) => {
    try {
      await ocupanteService.updateOcupante(ocupante);
      await carregarLista();
      setSearchId('');
      setSearchAbrigoId('');
      setOcupanteEmEdicao(null);
      setMostrarFormulario(false);
    } catch {
      Alert.alert('Erro', 'Erro ao atualizar ocupante');
    }
  };

  const onRemover = async (id_ocupante: number) => {
    try {
      await ocupanteService.deleteOcupante(id_ocupante);
      setLista((prev) => prev.filter((o) => o.id_ocupante !== id_ocupante));
    } catch {
      Alert.alert('Erro', 'Erro ao remover ocupante');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.botaoContainer}>
        <Button
          title={mostrarFormulario ? 'Mostrar Lista' : 'Mostrar Formulário'}
          onPress={() => {
            setMostrarFormulario(!mostrarFormulario);
            setOcupanteEmEdicao(null);
            setSearchId('');
            setSearchAbrigoId('');
          }}
          color="#5C0000"
        />
      </View>

      {!mostrarFormulario && (
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Buscar por ID" placeholderTextColor="#aaa" keyboardType="numeric" value={searchId} onChangeText={setSearchId} />
          <TextInput style={styles.searchInput} placeholder="Buscar por ID do Abrigo" placeholderTextColor="#aaa" keyboardType="numeric" value={searchAbrigoId} onChangeText={setSearchAbrigoId} />
        </View>
      )}

      {mostrarFormulario ? (
        <OcupanteFormulario onGravar={onGravar} onAtualizar={onAtualizar} ocupanteEdicao={ocupanteEmEdicao} />
      ) : (
        <OcupanteListagem lista={lista} onRemover={onRemover} onEditar={(o) => { setOcupanteEmEdicao(o); setMostrarFormulario(true); }} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  botaoContainer: { margin: 12 },
  searchContainer: { flexDirection: 'row', marginHorizontal: 16, justifyContent: 'space-between' },
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

export { OcupanteScreen };
