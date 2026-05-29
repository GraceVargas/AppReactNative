export type RegisterForm = { email: string; password: string; acepta: boolean };

export type LoginForm = Omit<RegisterForm, "acepta">;

export type User = {
  email: string;
  password: string;
};

export type Item = {
  id: string;
  title: string;
  author?: string;       
  type: 'libro' | 'pelicula' | 'serie';
  status: 'pendiente' | 'en curso' | 'terminado';
  photo?: string;        // URI de la foto sacada con la cámara
  rating: number | null; // 1 a 5, solo cuando status === 'terminado'
  review: string;
  createdAt: string;
  finishedAt: string | null;
};

export type ItemCardType = {
  item: Item;
  onPress: () => void;
  onDelete: () => void;
};

export type AuthContextType = {
  user: User | null;
  setCurrentUser: (user: User | null) => void;
};

export type ItemContextType = {
  items: Item[]; 
  setItem: (item: Item) => void; 
  updateItem: (id: string, changes: Partial<Item>) => void; 
  deleteItem: (id: string) => void;
  getByType: (type: string) => Item[]; 
  getFinished: () => Item[]; 
  getPending: () => Item[]; 
};


 

 