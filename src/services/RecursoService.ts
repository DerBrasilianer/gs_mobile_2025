import axios from 'axios';
import { Recurso } from '../../models/Recurso';

const API_URL = 'https://gs-java-2025.onrender.com/api';

export const createRecurso = async (recurso: Omit<Recurso, 'id_recurso'>): Promise<Recurso> => {
  const response = await axios.post(`${API_URL}/recursos`, recurso);
  const data = response.data;
  return {
    id_recurso: data.id,
    nome: data.nome,
    tipo: data.tipo,
    unidadeMedida: data.unidadeMedida,
  };
};

export const getRecursos = async (): Promise<Recurso[]> => {
  const response = await axios.get(`${API_URL}/recursos`);
  return response.data.map((data: any): Recurso => ({
    id_recurso: data.id,
    nome: data.nome,
    tipo: data.tipo,
    unidadeMedida: data.unidadeMedida,
  }));
};

export const getRecursoById = async (id: number): Promise<Recurso | null> => {
  try {
    const response = await axios.get(`${API_URL}/recursos/${id}`);
    const data = response.data;
    return {
      id_recurso: data.id,
      nome: data.nome,
      tipo: data.tipo,
      unidadeMedida: data.unidadeMedida,
    };
  } catch {
    return null;
  }
};

export const updateRecurso = async (recurso: Recurso): Promise<void> => {
  await axios.put(`${API_URL}/recursos/${recurso.id_recurso}`, {
    nome: recurso.nome,
    tipo: recurso.tipo,
    unidadeMedida: recurso.unidadeMedida,
  });
};

export const deleteRecurso = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/recursos/${id}`);
};
