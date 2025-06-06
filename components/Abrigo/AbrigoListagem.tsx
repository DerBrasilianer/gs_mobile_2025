import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Abrigo } from '../../models/Abrigo';
import { FontAwesome5 } from '@expo/vector-icons';

interface AbrigoItemProps {
  item: Abrigo;
  onRemover: (id_abrigo: number) => void;
  onEditar: (abrigo: Abrigo) => void;
}

const AbrigoItem = ({ item, onRemover, onEditar }: AbrigoItemProps): React.ReactElement => (
  <View style={styles.itemContainer}>
    <Pressable style={styles.removeButton} onPress={() => item.id_abrigo && onRemover(item.id_abrigo)}>
      <FontAwesome5 name="trash" size={20} color="#FF6347" />
    </Pressable>

    <Pressable style={styles.editButton} onPress={() => onEditar(item)}>
      <FontAwesome5 name="edit" size={20} color="#CCCCCC" />
    </Pressable>

    <Text style={styles.text}>Nome: {item.nome}</Text>
    <Text style={styles.text}>Capacidade: {item.capacidade}</Text>
    <Text style={styles.text}>Status: {item.status ?? '-'}</Text>
    <Text style={styles.text}>ID Localização: {item.idLocalizacao}</Text>
    <Text style={styles.id}>ID: {item.id_abrigo ?? '-'}</Text>
  </View>
);

interface AbrigoListagemProps {
  lista: Abrigo[];
  onRemover: (id_abrigo: number) => void;
  onEditar: (abrigo: Abrigo) => void;
}

const AbrigoListagem = ({ lista, onRemover, onEditar }: AbrigoListagemProps): React.ReactElement => (
  <FlatList
    contentContainerStyle={styles.listContent}
    data={lista}
    keyExtractor={(item) => (item.id_abrigo ? item.id_abrigo.toString() : Math.random().toString())}
    renderItem={({ item }) => <AbrigoItem item={item} onRemover={onRemover} onEditar={onEditar} />}
  />
);

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#000000',
  },
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

export { AbrigoListagem };
