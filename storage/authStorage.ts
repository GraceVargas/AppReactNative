import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/types";

const USERS_KEY = "users";
const LOGGED_USER_KEY = "loggedUser";

export const getUsers = async (): Promise<User[]> => {
  const data = await AsyncStorage.getItem(USERS_KEY);

  return data ? JSON.parse(data) : [];
};

export const saveUsers = async (
  users: User[]
) => {
  await AsyncStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
};

export const saveLoggedUser = async (
  user: User
) => {
  await AsyncStorage.setItem(
    LOGGED_USER_KEY,
    JSON.stringify(user)
  );
};

export const getLoggedUser =
  async (): Promise<User | null> => {
    const data = await AsyncStorage.getItem(
      LOGGED_USER_KEY
    );

    return data ? JSON.parse(data) : null;
  };

export const removeLoggedUser = async () => {
  await AsyncStorage.removeItem(
    LOGGED_USER_KEY
  );
};