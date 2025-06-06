export interface Ocupante {

  id_ocupante?: number;
  nome: string;
  idade: number;
  genero?: 'Masculino' | 'Feminino' | 'Outro';
  id_abrigo: number;
  
}
