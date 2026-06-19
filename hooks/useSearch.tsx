import { searchBooks, getCoverUrl } from '../services/openLibrary';
import { BookResult } from '../types/types';
import { useState } from 'react';
import { Alert } from 'react-native';
import useItem from './useItem';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BookResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const { addItem } = useItem();

  const handleSearch = async () => {
      if (!query.trim()) return;
      setLoading(true);
      setSearched(true);
      try {
        const data = await searchBooks(query.trim());
        setResults(data);
      } catch (e) {
        Alert.alert('Error', 'No se pudo conectar con Open Library. Revisá tu conexión.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const handleAdd = (book: BookResult, added: boolean) => {
        if (added) return;
        addItem({
          title: book.title,
          author: book.author_name?.[0],
          type: 'libro',
          photo: book.cover_i ? getCoverUrl(book.cover_i) : undefined,
          externalKey: book.key,
        });
        Alert.alert('✓ Agregado', `"${book.title}" fue agregado a tu lista.`);
      };

    return {
        query,
        setQuery,
        results,
        loading,
        searched,
        handleSearch,
        handleAdd,
    };
};
    