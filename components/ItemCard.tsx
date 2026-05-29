import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, Image, SafeAreaView, Alert,
} from 'react-native';
import { Item, ItemCardType } from '../types/types';
import { STATUS_COLORS, STATUS_LABEL } from '../constants';

export const ItemCard = ({ item, onPress, onDelete }: ItemCardType) => {
  const statusColor = STATUS_COLORS[item.status] || STATUS_COLORS.pendiente;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Portada */}
      {item.photo ? (
        <Image source={{ uri: item.photo }} style={styles.cover} />
      ) : (
        <View style={styles.coverPlaceholder}>
          <Text style={styles.coverEmoji}>
            {item.type === 'libro' ? '📖' : item.type === 'pelicula' ? '🎞️' : '📺'}
          </Text>
        </View>
      )}

      {/* Info */}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        {item.author ? (
          <Text style={styles.cardSub} numberOfLines={1}>{item.author}</Text>
        ) : null}

        <View style={styles.cardFooter}>
          <View style={[styles.badge, { backgroundColor: statusColor.bg }]}>
            <Text style={[styles.badgeText, { color: statusColor.text }]}>
              {STATUS_LABEL[item.status]}
            </Text>
          </View>
          {item.status === 'terminado' && item.rating ? (
            <Text style={styles.stars}>{'⭐'.repeat(item.rating)}</Text>
          ) : null}
        </View>
      </View>

      {/* Borrar */}
      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cover: {
    width: 56,
    height: 78,
    borderRadius: 8,
    backgroundColor: '#EEE',
  },
  coverPlaceholder: {
    width: 56,
    height: 78,
    borderRadius: 8,
    backgroundColor: '#F0EEF8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverEmoji: {
    fontSize: 26,
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
    minHeight: 78,
    paddingVertical: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 20,
  },
  cardSub: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  stars: {
    fontSize: 11,
  },
  deleteBtn: {
    padding: 6,
    marginLeft: 4,
  },
  deleteIcon: {
    fontSize: 14,
    color: '#CCC',
  }
});