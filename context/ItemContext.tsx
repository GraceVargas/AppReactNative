import React, { createContext, useState } from 'react';
import { Item } from '../types/types';

type ItemContextType = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

export const ItemContext = createContext<ItemContextType>({
  items: [],
  setItems: () => {},
});

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <ItemContext.Provider value={{ items, setItems }}>
      {children}
    </ItemContext.Provider>
  );
};


