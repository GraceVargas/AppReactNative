import { useContext } from 'react';
import { Item } from '../types/types';
import { ItemContext } from '../context/ItemContext';

const useItem = () => {
  const { items, setItems } = useContext(ItemContext);

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
    setItems(prev => [...prev, newItem]);
    return newItem;
  };

  const updateItem = (id: string, changes: Partial<Item>) => {
    setItems(prev =>
      prev.map(item =>
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
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getByType = (type: Item['type']) => items.filter(i => i.type === type);
  const getFinished = () => items.filter(i => i.status === 'terminado');
  const getPending = () => items.filter(i => i.status !== 'terminado');

  return { items, addItem, updateItem, deleteItem, getByType, getFinished, getPending };
};

export default useItem;
