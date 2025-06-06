import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Recurso } from '../../models/Recurso';
import { FontAwesome5 } from '@expo/vector-icons';

interface RecursoItemProps {
  item: Recurso;
  onRemover: (id: number) => void;
  onEditar: (recurso: Recurso) => void;
}

const RecursoItem = ({ item, onRemover, onEditar }: RecursoItemProps): React.ReactElement => (
  <View style={styles.itemContainer}>
    <Pressable style={styles.removeButton} onPress={() => item.id_recurso && onRemover(item.id_recurso)}>
      <FontAwesome5 name="trash" size={20} color="#FF6347" />
    </Pressable>

    <Pressable style={styles.editButton} onPress={() => onEditar(item)}>
      <FontAwesome5 name="edit" size={20} color="#CCCCCC" />
    </Pressable>

    <Text style={styles.text}>Nome: {item.nome}</Text>
    <Text style={styles.text}>Tipo: {item.tipo}</Text>
    <Text style={styles.text}>Unidade: {item.unidadeMedida}</Text>
    <Text style={styles.id}>ID: {item.id_recurso ?? '-'}</Text>
  </View>
);

interface Props {
  lista: Recurso[];
  onRemover: (id: number) => void;
  onEditar: (recurso: Recurso) => void;
}

const RecursoListagem = ({ lista, onRemover, onEditar }: Props): React.ReactElement => (
  <FlatList
    contentContainerStyle={styles.listContent}
    data={lista}
    keyExtractor={(item) => (item.id_recurso ? item.id_recurso.toString() : Math.random().toString())}
    renderItem={({ item }) => <RecursoItem item={item} onRemover={onRemover} onEditar={onEditar} />}
  />
);

const styles = StyleSheet.create({
  listContent: { padding: 16, backgroundColor: '#000000', paddingBottom: 40 },
  itemContainer: {
    position: 'relative',
    padding: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#5C0000',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  editButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#FFFFFF',
  },
  id: {
    marginTop: 6,
    fontSize: 12,
    color: '#AAAAAA',
  },
});

export { RecursoListagem };
