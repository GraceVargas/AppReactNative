import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Item, BookResult, CardProps } from '../types/types';
import { STATUS_COLORS, STATUS_LABEL } from '../constants';
import { getCoverUrl } from '../services/openLibrary';

export const ItemCard = (props: CardProps) => {
  if (props.variant === 'item') {
    const { item, onPress, onDelete } = props;
    const statusColor = STATUS_COLORS[item.status] || STATUS_COLORS.pendiente;

    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.cover} />
        ) : (
          <View style={styles.coverPlaceholder}>
            <Text style={styles.coverEmoji}>
              {item.type === 'libro' ? '📖' : item.type === 'pelicula' ? '🎞️' : '📺'}
            </Text>
          </View>
        )}

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

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={onDelete}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.deleteIcon}>✕</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  const { item, added, onAdd } = props;
  const imageUri = item.cover_i ? getCoverUrl(item.cover_i) : undefined;

  return (
    <View style={styles.card}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.cover} />
      ) : (
        <View style={styles.coverPlaceholder}>
          <Text style={styles.coverEmoji}>📖</Text>
        </View>
      )}

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        {item.author_name?.[0] ? (
          <Text style={styles.cardSub} numberOfLines={1}>{item.author_name[0]}</Text>
        ) : null}
        {item.first_publish_year ? (
          <Text style={styles.itemYear}>{item.first_publish_year}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.actionBtn, added && styles.actionBtnDone]}
        onPress={onAdd}
        disabled={added}
        activeOpacity={0.8}
      >
        <Text style={[styles.actionBtnText, added && styles.actionBtnTextDone]}>
          {added ? '✓' : '+'}
        </Text>
      </TouchableOpacity>
    </View>
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
  itemYear: {
    fontSize: 11,
    color: '#BBB',
    marginTop: 4,
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
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnDone: {
    backgroundColor: '#E8F5E9',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 24,
  },
  actionBtnTextDone: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '700',
  },
});
