import axios from 'axios';
import { Ocupante } from '../../models/Ocupante';

const API_URL = 'https://gs-java-2025.onrender.com/api';

export const createOcupante = async (ocupante: Omit<Ocupante, 'id_ocupante'>): Promise<Ocupante> => {
  const payload = {
    nome: ocupante.nome,
    idade: ocupante.idade,
    genero: ocupante.genero,
    idAbrigo: ocupante.id_abrigo, // conversão correta para o backend
  };

  const response = await axios.post(`${API_URL}/ocupantes`, payload);
  const data = response.data;

  return {
    id_ocupante: data.id,
    nome: data.nome,
    idade: data.idade,
    genero: data.genero,
    id_abrigo: data.idAbrigo,
  };
};

export const getOcupantes = async (): Promise<Ocupante[]> => {
  const response = await axios.get(`${API_URL}/ocupantes`);
  return response.data.map((data: any): Ocupante => ({
    id_ocupante: data.id,
    nome: data.nome,
    idade: data.idade,
    genero: data.genero,
    id_abrigo: data.idAbrigo,
  }));
};

export const getOcupanteById = async (id_ocupante: number): Promise<Ocupante | null> => {
  try {
    const response = await axios.get(`${API_URL}/ocupantes/${id_ocupante}`);
    const data = response.data;
    return {
      id_ocupante: data.id,
      nome: data.nome,
      idade: data.idade,
      genero: data.genero,
      id_abrigo: data.idAbrigo,
    };
  } catch (error) {
    return null;
  }
};

export const updateOcupante = async (ocupante: Ocupante): Promise<Ocupante> => {
  const payload = {
    nome: ocupante.nome,
    idade: ocupante.idade,
    genero: ocupante.genero,
    idAbrigo: ocupante.id_abrigo,
  };

  const response = await axios.put(`${API_URL}/ocupantes/${ocupante.id_ocupante}`, payload);
  const data = response.data;

  return {
    id_ocupante: data.id,
    nome: data.nome,
    idade: data.idade,
    genero: data.genero,
    id_abrigo: data.idAbrigo,
  };
};

export const deleteOcupante = async (id_ocupante: number): Promise<void> => {
  await axios.delete(`${API_URL}/ocupantes/${id_ocupante}`);
};
