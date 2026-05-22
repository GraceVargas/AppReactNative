import React, { createContext, useState } from "react";
import { AuthContextType, User } from "../types/types";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
    const setCurrentUser = (user: User | null) => setUser(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
