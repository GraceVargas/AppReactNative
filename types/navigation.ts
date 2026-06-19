import { ItemType } from "./types";

export type RootTabParamList = {  
  Inicio: undefined;
  "Buscar Libros": undefined;
  Perfil: undefined;
}

export type HomeStackParamList = {
  Home: undefined;
  ItemDetail: { itemId: string };
  AddItem: { itemType: ItemType | null };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

 