export type RegisterForm = { email: string; password: string; acepta: boolean };

export type LoginForm = Omit<RegisterForm, "acepta">;

export type User = {
  email: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  setCurrentUser: (user: User | null) => void;
};