import React, { createContext, useState } from 'react';
import { Item, ItemContextType } from '../types/types';



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


