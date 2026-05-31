import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from '../types/types';

const STORAGE_KEY = (userId: string) => `items_${userId}`;

const itemsStorage = (userId: string) => {

  const loadItems = useCallback(async (): Promise<Item[]> => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY(userId));
      return raw ? (JSON.parse(raw) as Item[]) : [];
    } catch (e) {
      console.error('itemsStorage.loadItems:', e);
      return [];
    }
  }, [userId]);

  const saveItems = useCallback(async (items: Item[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY(userId), JSON.stringify(items));
    } catch (e) {
      console.error('itemsStorage.saveItems:', e);
    }
  }, [userId]);

  const clearItems = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY(userId));
    } catch (e) {
      console.error('itemsStorage.clearItems:', e);
    }
  }, [userId]);

  return { loadItems, saveItems, clearItems };
};

export default itemsStorage;
