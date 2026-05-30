import React, {FC} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemType } from '../types/types';
import { TYPES } from '../constants';

type Props = {
  tab: ItemType;
  navigation: any;
};

export const EmptyState: FC<Props> = ({ tab, navigation }) => {

  const { emoji, label } = TYPES.find((t) => t.key === tab) || TYPES[0];

  return (
    <View style={styles.empty}>
      <Text style={styles.emptyEmoji}>{emoji}</Text>
      <Text style={styles.emptyText}>No tenés {label.toLowerCase()}s pendientes</Text>
      <Text style={styles.emptySub}>Agregá un {label.toLowerCase()} para empezar</Text>
        <TouchableOpacity
          style={styles.emptyBtn}
          onPress={() => navigation.navigate('AddItem')}
        >
          <Text style={styles.emptyBtnText}>+ Agregar ahora</Text>
        </TouchableOpacity>
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
