import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ocupante } from '../../models/Ocupante';
import { FontAwesome5 } from '@expo/vector-icons';

interface OcupanteItemProps {
  item: Ocupante;
  onRemover: (id_ocupante: number) => void;
  onEditar: (ocupante: Ocupante) => void;
}

const OcupanteItem = ({ item, onRemover, onEditar }: OcupanteItemProps) => (
  <View style={styles.itemContainer}>
    <Pressable style={styles.removeButton} onPress={() => item.id_ocupante && onRemover(item.id_ocupante)}>
      <FontAwesome5 name="trash" size={20} color="#FF6347" />
    </Pressable>
    <Pressable style={styles.editButton} onPress={() => onEditar(item)}>
      <FontAwesome5 name="edit" size={20} color="#CCCCCC" />
    </Pressable>
    <Text style={styles.text}>Nome: {item.nome}</Text>
    <Text style={styles.text}>Idade: {item.idade}</Text>
    <Text style={styles.text}>Gênero: {item.genero ?? '-'}</Text>
    <Text style={styles.text}>ID Abrigo: {item.id_abrigo}</Text>
    <Text style={styles.id}>ID: {item.id_ocupante ?? '-'}</Text>
  </View>
);

interface OcupanteListagemProps {
  lista: Ocupante[];
  onRemover: (id_ocupante: number) => void;
  onEditar: (ocupante: Ocupante) => void;
}

const OcupanteListagem = ({ lista, onRemover, onEditar }: OcupanteListagemProps) => (
  <FlatList
    contentContainerStyle={styles.listContent}
    data={lista}
    keyExtractor={(item) => item.id_ocupante?.toString() ?? Math.random().toString()}
    renderItem={({ item }) => <OcupanteItem item={item} onRemover={onRemover} onEditar={onEditar} />}
  />
);

const styles = StyleSheet.create({
  listContent: { padding: 16, paddingBottom: 40, backgroundColor: '#000' },
  itemContainer: {
    position: 'relative',
    padding: 16,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#5C0000',
  },
  removeButton: { position: 'absolute', top: 8, right: 8 },
  editButton: { position: 'absolute', bottom: 8, right: 8 },
  text: { fontWeight: 'bold', marginBottom: 6, color: '#FFF' },
  id: { marginTop: 6, fontSize: 12, color: '#AAAAAA' },
});

export { OcupanteListagem };
