import { ItemType } from "./types/types";

export const TYPES: { key: ItemType; label: string; emoji: string }[] = [
  { key: 'libro',    label: 'Libro',    emoji: '📚' },
  { key: 'pelicula', label: 'Película', emoji: '🎬' },
  { key: 'serie',    label: 'Serie',    emoji: '📺' },
];

export const STATUS_LABEL = {
  pendiente: 'Pendiente',
  'en curso': 'En curso',
  terminado:  'Terminado',
};

export const STATUS_COLORS = {
  pendiente:  { bg: '#F0F0F0', text: '#888'    },
  'en curso': { bg: '#FFF3E0', text: '#E65100' },
  terminado:  { bg: '#E8F5E9', text: '#2E7D32' },
};