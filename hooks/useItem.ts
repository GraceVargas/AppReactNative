import { useContext, useEffect } from 'react';
import { Item } from '../types/types';
import { ItemContext } from '../context/ItemContext';
import itemsStorage from '../storage/itemsStorage';

const useItem = (userId: string) => {
  const { items, setItems } = useContext(ItemContext);
  const { loadItems, saveItems } = itemsStorage(userId);

    useEffect(() => {
    const load = async () => {
      const stored = await loadItems();
      setItems(stored);
    };
    load();
  }, [userId]);

  const updateAndSave = (updatedItems: Item[]) => {
    setItems(updatedItems);
    saveItems(updatedItems); 
  };

  const addItem = (item: Omit<Item, 'id' | 'status' | 'rating' | 'review' | 'createdAt' | 'finishedAt'>) => {
    const newItem: Item = {
      ...item,
      id: Date.now().toString(),
      status: 'pendiente',
      rating: null,
      review: '',
      createdAt: new Date().toLocaleDateString('es-AR'),
      finishedAt: null,
    };
    updateAndSave([...items, newItem]);
    return newItem;
  };

  const updateItem = (id: string, changes: Partial<Item>) => {
    const updated = items.map(item =>
      item.id === id
        ? {
            ...item,
            ...changes,
            finishedAt:
              changes.status === 'terminado'
                ? new Date().toLocaleDateString('es-AR')
                : item.finishedAt,
          }
        : item
    );
    updateAndSave(updated);
  };

  const deleteItem = (id: string) => {
    updateAndSave(items.filter(item => item.id !== id));
  };

  const getByType = (type: Item['type']) => items.filter(i => i.type === type);
  const getFinished = () => items.filter(i => i.status === 'terminado');
  const getPending = () => items.filter(i => i.status !== 'terminado');

  return { items, addItem, updateItem, deleteItem, getByType, getFinished, getPending };
};

export default useItem;
