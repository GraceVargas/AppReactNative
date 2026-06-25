import React from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import useItem from '../hooks/useItem';
import ScreenContainer from '../components/ScreenContainer';
import { useSearch } from '../hooks/useSearch';
import { ItemCard } from '../components/ItemCard';

export default function SearchScreen() {
  const { items } = useItem();
  const { query, setQuery, results, loading, searched, handleAdd , handleSearch} = useSearch();
  // IDs de libros ya agregados a la lista
  const addedKeys = new Set(items.map(i => i.externalKey).filter(Boolean));

  const onSubmitSearch = () => {
    handleSearch();
  };
  return (
    <ScreenContainer>
      <View style={styles.container}>

        <Text style={styles.screenTitle}>Buscar libros</Text>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Título o autor..."
            placeholderTextColor="#BBB"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={onSubmitSearch}
            returnKeyType="search"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[styles.searchBtn, !query.trim() && styles.searchBtnDisabled]}
            onPress={handleSearch}
            disabled={!query.trim() || loading}
            activeOpacity={0.85}
          >
            <Text style={styles.searchBtnText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#1A1A1A" />
            <Text style={styles.loadingText}>Buscando...</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              const alreadyAdded = addedKeys.has(item.key);
              return (
                <ItemCard
                  variant="book"
                  item={item}
                  added={alreadyAdded}
                  onAdd={() => handleAdd(item, alreadyAdded)}
                />
              );
            }}
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              searched ? (
                <View style={styles.centered}>
                  <Text style={styles.emptyEmoji}>🔍</Text>
                  <Text style={styles.emptyText}>Sin resultados para "{query}"</Text>
                  <Text style={styles.emptySub}>Probá con otro título o autor</Text>
                </View>
              ) : (
                <View style={styles.centered}>
                  <Text style={styles.emptyEmoji}>📚</Text>
                  <Text style={styles.emptyText}>Buscá un libro</Text>
                  <Text style={styles.emptySub}>Escribí un título o autor arriba</Text>
                </View>
              )
            }
          />
        )}
      </View>
    </ScreenContainer>
  );
}


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
    marginBottom: 16,
  },

  // Search
  searchRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  searchBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  searchBtnDisabled: {
    backgroundColor: '#CDCDCD',
  },
  searchBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  // Lista
  list: {
    paddingBottom: 24,
  },

  // Estados vacíos / loading
  centered: {
    alignItems: 'center',
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#AAA',
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 13,
    color: '#AAA',
    marginTop: 4,
    textAlign: 'center',
  },
});
