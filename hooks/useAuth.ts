import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import {
  getLoggedUser,
  getUsers,
  removeLoggedUser,
  saveLoggedUser,
  saveUsers,
} from "../storage/authStorage";

const useAuth = () => {
    const { user, setCurrentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const loggedUser = await getLoggedUser();

      if (loggedUser) {
        setCurrentUser(loggedUser);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const users = await getUsers();

      const userExists = users.find((u) => u.email === email);

      if (userExists) {
        return false;
      }

      const newUser = {
        email,
        password,
      };

      users.push(newUser);

      await saveUsers(users);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const users = await getUsers();

      const foundUser = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (!foundUser) {
        return false;
      }

      setCurrentUser(foundUser);

      await saveLoggedUser(foundUser);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = async () => {
    await removeLoggedUser();

    setCurrentUser(null);
  };

    return { login, logout, user, register, loading };
}

export { useAuth }