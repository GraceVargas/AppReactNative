import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, Alert,
  SafeAreaView,
} from 'react-native';

export const EmptyState = ({ tab, navigation }) => {
  const config = {
    libro:    { emoji: '📚', text: 'No tenés libros pendientes',    sub: 'Agregá un libro para empezar' },
    pelicula: { emoji: '🎬', text: 'No tenés películas pendientes', sub: 'Agregá una película para empezar' },
    vistos:   { emoji: '🏆', text: 'Todavía no terminaste nada',    sub: 'Marcá algo como terminado para verlo acá' },
  };
  const { emoji, text, sub } = config[tab];

  return (
    <View style={styles.empty}>
      <Text style={styles.emptyEmoji}>{emoji}</Text>
      <Text style={styles.emptyText}>{text}</Text>
      <Text style={styles.emptySub}>{sub}</Text>
      {tab !== 'vistos' && (
        <TouchableOpacity
          style={styles.emptyBtn}
          onPress={() => navigation.navigate('AddItem')}
        >
          <Text style={styles.emptyBtnText}>+ Agregar ahora</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  emptyBtn: {
    marginTop: 20,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 20,
  },
  emptyBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
