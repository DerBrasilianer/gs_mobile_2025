export interface Abrigo {

  id_abrigo?: number;
  nome: string;
  capacidade: number;
  status?: 'Ativo' | 'Inativo' | 'Esgotado';
  idLocalizacao: number;
  
}
