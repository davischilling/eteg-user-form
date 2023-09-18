export type FavoriteColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

export interface User {
  full_name: string;
  cpf: string;
  email: string;
  favorite_color: FavoriteColor;
  observations: string;
}

export type AvailableColors = {
  value: FavoriteColor;
  label: string;
};

export const AVAILABLE_COLORS: AvailableColors[] = [
  { value: 'red', label: 'vermelho' },
  { value: 'orange', label: 'laranja' },
  { value: 'yellow', label: 'amarelo' },
  { value: 'green', label: 'verde' },
  { value: 'blue', label: 'azul' },
  { value: 'indigo', label: 'anil' },
  { value: 'violet', label: 'violeta' },
];
