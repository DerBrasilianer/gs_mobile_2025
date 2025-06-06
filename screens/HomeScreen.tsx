import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getAbrigos } from '../src/services/AbrigoService';
import { getLocalizacoes } from '../src/services/LocalizacaoService';
import { getOcupantes } from '../src/services/OcupanteService';
import { getRecursos } from '../src/services/RecursoService';

import { Abrigo } from '../models/Abrigo';
import { Localizacao } from '../models/Localizacao';
import { Ocupante } from '../models/Ocupante';
import { Recurso } from '../models/Recurso';

const HomeScreen = (): React.ReactElement => {
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [localizacoes, setLocalizacoes] = useState<Localizacao[]>([]);
  const [ocupantes, setOcupantes] = useState<Ocupante[]>([]);
  const [recursos, setRecursos] = useState<Recurso[]>([]);

  const [expanded, setExpanded] = useState<string[]>([]);

  const carregarDados = async () => {
    try {
      const abrigosData = await getAbrigos();
      const localizacoesData = await getLocalizacoes();
      const ocupantesData = await getOcupantes();
      const recursosData = await getRecursos();

      setAbrigos(abrigosData);
      setLocalizacoes(localizacoesData);
      setOcupantes(ocupantesData);
      setRecursos(recursosData);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  const toggleExpand = (section: string) => {
    setExpanded(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const renderItems = (items: any[], section?: string) =>
    items.map((item) => (
      <View key={item.id} style={styles.item}>
        <Text style={styles.itemText}>
          {item.id} - {section === 'localizacoes' ? item.cidade : item.nome}
        </Text>
      </View>
    ));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image
        source={require('./../assets/fiap-logo-home.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>FIAP - Global Solution 2025</Text>
      <Text style={styles.subtitle}>Use o Menu para acessar a gestão</Text>
      <Text style={styles.titlebranco}>Dashboard de Monitoramento</Text>

      <View style={styles.row}>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => toggleExpand('abrigos')} style={styles.card}>
            <Text style={styles.cardTitle}>Abrigos</Text>
            <Text style={styles.cardValue}>{abrigos.length}</Text>
          </TouchableOpacity>
          {expanded.includes('abrigos') && (
            <View style={styles.submenu}>
              <ScrollView nestedScrollEnabled style={styles.submenuScroll}>
                {renderItems(abrigos, 'abrigos')}
              </ScrollView>
            </View>
          )}
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => toggleExpand('localizacoes')} style={styles.card}>
            <Text style={styles.cardTitle}>Localizações</Text>
            <Text style={styles.cardValue}>{localizacoes.length}</Text>
          </TouchableOpacity>
          {expanded.includes('localizacoes') && (
            <View style={styles.submenu}>
              <ScrollView nestedScrollEnabled style={styles.submenuScroll}>
                {renderItems(localizacoes, 'localizacoes')}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => toggleExpand('ocupantes')} style={styles.card}>
            <Text style={styles.cardTitle}>Ocupantes</Text>
            <Text style={styles.cardValue}>{ocupantes.length}</Text>
          </TouchableOpacity>
          {expanded.includes('ocupantes') && (
            <View style={styles.submenu}>
              <ScrollView nestedScrollEnabled style={styles.submenuScroll}>
                {renderItems(ocupantes, 'ocupantes')}
              </ScrollView>
            </View>
          )}
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => toggleExpand('recursos')} style={styles.card}>
            <Text style={styles.cardTitle}>Recursos</Text>
            <Text style={styles.cardValue}>{recursos.length}</Text>
          </TouchableOpacity>
          {expanded.includes('recursos') && (
            <View style={styles.submenu}>
              <ScrollView nestedScrollEnabled style={styles.submenuScroll}>
                {renderItems(recursos, 'recursos')}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    alignItems: 'center',
    padding: 16,
    paddingBottom: 40,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 4,
  },
  titlebranco: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 8,
    marginTop: 8,
    alignItems: 'flex-start',
  },
  cardContainer: {
    width: '48%',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderColor: '#5C0000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  cardValue: {
    color: '#FF6347',
    fontSize: 28,
    fontWeight: 'bold',
  },
  submenu: {
    marginTop: 8,
    backgroundColor: '#2e2e2e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5C0000',
    maxHeight: 200,
  },
  submenuScroll: {
    padding: 6,
  },
  item: {
    padding: 8,
    borderBottomColor: '#5C0000',
    borderBottomWidth: 1,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export { HomeScreen };
