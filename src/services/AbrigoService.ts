import axios from 'axios';
import { Abrigo } from '../../models/Abrigo';

const API_URL = 'https://gs-java-2025.onrender.com/api';

export const createAbrigo = async (abrigo: Omit<Abrigo, 'id_abrigo'>): Promise<Abrigo> => {
  const response = await axios.post(`${API_URL}/abrigos`, abrigo);
  const data = response.data;
  return {
    id_abrigo: data.id,
    nome: data.nome,
    capacidade: data.capacidade,
    status: data.status,
    idLocalizacao: data.idLocalizacao,
  };
};

export const getAbrigos = async (): Promise<Abrigo[]> => {
  const response = await axios.get(`${API_URL}/abrigos`);
  return response.data.map((data: any): Abrigo => ({
    id_abrigo: data.id,
    nome: data.nome,
    capacidade: data.capacidade,
    status: data.status,
    idLocalizacao: data.idLocalizacao,
  }));
};

export const getAbrigoById = async (id_abrigo: number): Promise<Abrigo | null> => {
  try {
    const response = await axios.get(`${API_URL}/abrigos/${id_abrigo}`);
    const data = response.data;
    return {
      id_abrigo: data.id,
      nome: data.nome,
      capacidade: data.capacidade,
      status: data.status,
      idLocalizacao: data.idLocalizacao,
    };
  } catch (error) {
    return null;
  }
};

export const updateAbrigo = async (abrigo: Abrigo): Promise<Abrigo> => {
  const response = await axios.put(`${API_URL}/abrigos/${abrigo.id_abrigo}`, abrigo);
  const data = response.data;
  return {
    id_abrigo: data.id,
    nome: data.nome,
    capacidade: data.capacidade,
    status: data.status,
    idLocalizacao: data.idLocalizacao,
  };
};

export const deleteAbrigo = async (id_abrigo: number): Promise<void> => {
  await axios.delete(`${API_URL}/abrigos/${id_abrigo}`);
};
