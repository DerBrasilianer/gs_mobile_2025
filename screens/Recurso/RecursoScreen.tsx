import React, { useEffect, useState } from 'react';
import {
  View, Button, StyleSheet, SafeAreaView, Alert, TextInput
} from 'react-native';
import { Recurso } from '../../models/Recurso';
import { RecursoFormulario } from '../../components/Recurso/RecursoFormulario';
import { RecursoListagem } from '../../components/Recurso/RecursoListagem';
import * as recursoService from '../../src/services/RecursoService';

const RecursoScreen = (): React.ReactElement => {
  const [lista, setLista] = useState<Recurso[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [recursoEmEdicao, setRecursoEmEdicao] = useState<Recurso | null>(null);

  const carregarTodos = async () => {
    try {
      const recursos = await recursoService.getRecursos();
      setLista(recursos);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar recursos');
    }
  };

  useEffect(() => {
    carregarTodos();
  }, []);

  useEffect(() => {
    const filtrar = async () => {
      if (!searchId.trim()) {
        carregarTodos();
        return;
      }
      const id = Number(searchId.trim());
      const encontrado = await recursoService.getRecursoById(id);
      setLista(encontrado ? [encontrado] : []);
    };
    filtrar();
  }, [searchId]);

  const onGravar = async (recurso: Omit<Recurso, 'id_recurso'>) => {
    const criado = await recursoService.createRecurso(recurso);
    setLista((prev) => [...prev, criado]);
    setMostrarFormulario(false);
  };

  const onAtualizar = async (recurso: Recurso) => {
    await recursoService.updateRecurso(recurso);
    await carregarTodos();
    setSearchId('');
    setMostrarFormulario(false);
    setRecursoEmEdicao(null);
  };

  const onRemover = async (id: number) => {
    await recursoService.deleteRecurso(id);
    setLista((prev) => prev.filter((r) => r.id_recurso !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.botaoContainer}>
        <Button
          title={mostrarFormulario ? 'Mostrar Lista' : 'Mostrar Formulário'}
          onPress={() => {
            setMostrarFormulario(!mostrarFormulario);
            setRecursoEmEdicao(null);
            setSearchId('');
          }}
          color="#5C0000"
        />
      </View>

      {!mostrarFormulario && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por ID"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={searchId}
            onChangeText={setSearchId}
          />
        </View>
      )}

      {mostrarFormulario ? (
        <RecursoFormulario
          onGravar={onGravar}
          onAtualizar={onAtualizar}
          recursoEdicao={recursoEmEdicao}
        />
      ) : (
        <RecursoListagem
          lista={lista}
          onRemover={onRemover}
          onEditar={(recurso) => {
            setRecursoEmEdicao(recurso);
            setMostrarFormulario(true);
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  botaoContainer: { margin: 12 },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
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

export { RecursoScreen };
