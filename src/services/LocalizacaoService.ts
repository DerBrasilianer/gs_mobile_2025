import axios from 'axios';
import { Localizacao } from '../../models/Localizacao';

const API_URL = 'https://gs-java-2025.onrender.com/api';

export const createLocalizacao = async (localizacao: Omit<Localizacao, 'id_localizacao'>): Promise<Localizacao> => {
  const response = await axios.post(`${API_URL}/localizacoes`, localizacao);
  const data = response.data;
  return {
    id_localizacao: data.id,
    cidade: data.cidade,
    estado: data.estado,
    cep: data.cep,
    rua: data.rua,
    numero: data.numero,
    complemento: data.complemento,
  };
};

export const getLocalizacoes = async (): Promise<Localizacao[]> => {
  const response = await axios.get(`${API_URL}/localizacoes`);
  return response.data.map((data: any): Localizacao => ({
    id_localizacao: data.id,
    cidade: data.cidade,
    estado: data.estado,
    cep: data.cep,
    rua: data.rua,
    numero: data.numero,
    complemento: data.complemento,
  }));
};

export const getLocalizacaoById = async (id_localizacao: number): Promise<Localizacao | null> => {
  try {
    const response = await axios.get(`${API_URL}/localizacoes/${id_localizacao}`);
    const data = response.data;
    return {
      id_localizacao: data.id,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
    };
  } catch {
    return null;
  }
};

export const updateLocalizacao = async (localizacao: Localizacao): Promise<Localizacao> => {
  const response = await axios.put(`${API_URL}/localizacoes/${localizacao.id_localizacao}`, localizacao);
  const data = response.data;
  return {
    id_localizacao: data.id,
    cidade: data.cidade,
    estado: data.estado,
    cep: data.cep,
    rua: data.rua,
    numero: data.numero,
    complemento: data.complemento,
  };
};

export const deleteLocalizacao = async (id_localizacao: number): Promise<void> => {
  await axios.delete(`${API_URL}/localizacoes/${id_localizacao}`);
};
