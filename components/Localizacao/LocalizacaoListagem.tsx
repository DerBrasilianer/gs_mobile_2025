import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Localizacao } from '../../models/Localizacao';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  lista: Localizacao[];
  onRemover: (id_localizacao: number) => void;
  onEditar: (localizacao: Localizacao) => void;
}

const LocalizacaoItem = ({ item, onRemover, onEditar }: any) => (
  <View style={styles.itemContainer}>
    <Pressable style={styles.removeButton} onPress={() => onRemover(item.id_localizacao)}>
      <FontAwesome5 name="trash" size={20} color="#FF6347" />
    </Pressable>

    <Pressable style={styles.editButton} onPress={() => onEditar(item)}>
      <FontAwesome5 name="edit" size={20} color="#CCCCCC" />
    </Pressable>

    <Text style={styles.text}>Cidade: {item.cidade}</Text>
    <Text style={styles.text}>Estado: {item.estado}</Text>
    <Text style={styles.text}>CEP: {item.cep}</Text>
    <Text style={styles.text}>Rua: {item.rua}</Text>
    <Text style={styles.text}>Número: {item.numero}</Text>
    <Text style={styles.text}>Complemento: {item.complemento ?? '-'}</Text>
    <Text style={styles.id}>ID: {item.id_localizacao}</Text>
  </View>
);

const LocalizacaoListagem = ({ lista, onRemover, onEditar }: Props): React.ReactElement => (
  <FlatList
    contentContainerStyle={styles.listContent}
    data={lista}
    keyExtractor={(item) => (item.id_localizacao !== undefined ? item.id_localizacao.toString() : '')}
    renderItem={({ item }) => (
      <LocalizacaoItem item={item} onRemover={onRemover} onEditar={onEditar} />
    )}
  />
);

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    backgroundColor: '#000000',
    paddingBottom: 40,
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

export { LocalizacaoListagem };
