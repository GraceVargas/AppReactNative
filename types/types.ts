export type RegisterForm = { email: string; password: string; acepta: boolean };

export type LoginForm = Omit<RegisterForm, "acepta">;

export type User = {
  id: string;
  email: string;
  password: string;
};

export type Item = {
  id: string;
  title: string;
  author?: string;       
  type: ItemType;
  status: ItemStatus;
  photo?: string;        // URI de la foto sacada con la cámara
  rating: number | null; // 1 a 5, solo cuando status === 'terminado'
  review: string;
  createdAt: string;
  finishedAt: string | null;
  externalKey?: string; // key de Open Library, para detectar duplicados
};

export type ItemStatus = 'pendiente' | 'en curso' | 'terminado';

export type ItemType = 'libro' | 'pelicula' | 'serie';

type ItemCardType = {
  variant: 'item';
  item: Item;
  onPress: () => void;
  onDelete: () => void;
};

type BookCardType = {
  variant: 'book';
  item: BookResult;
  added: boolean;
  onAdd: () => void;
};

export type CardProps = ItemCardType | BookCardType;

export type AuthContextType = {
  user: User | null;
  setCurrentUser: (user: User | null) => void;
};

export type ItemContextType = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export type BookResult = {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;       
};

 

 