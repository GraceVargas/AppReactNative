import React, { FC, useState } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView,
 TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useItem from '../hooks/useItem';
import { Item, ItemStatus } from '../types/types';
import ScreenContainer from '../components/ScreenContainer';

type NavProps = NativeStackNavigationProp<HomeStackParamList, "ItemDetail">;
type RouteProps = RouteProp<HomeStackParamList, "ItemDetail">;

type Props = {
  navigation: NavProps;
  route: RouteProps;
};

const STATUSES: { key: ItemStatus; label: string; emoji: string }[] = [
  { key: 'pendiente', label: 'Pendiente', emoji: '🕐' },
  { key: 'en curso',  label: 'En curso',  emoji: '▶️'  },
  { key: 'terminado', label: 'Terminado', emoji: '✅'  },
];

const STATUS_COLORS: Record<ItemStatus, { bg: string; text: string; border: string }> = {
  pendiente:  { bg: '#F5F5F5', text: '#888',    border: '#DDD'    },
  'en curso': { bg: '#FFF3E0', text: '#E65100', border: '#FFCC80' },
  terminado:  { bg: '#E8F5E9', text: '#2E7D32', border: '#A5D6A7' },
};


export const ItemDetailScreen: FC<Props> = ({ navigation, route }) => {
  const { itemId } = route.params;
  const { items, updateItem, deleteItem } = useItem();

  const item = items.find(i => i.id === itemId);

  // Si el item fue eliminado y la pantalla sigue montada
  if (!item) {
    return (
      <ScreenContainer>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Item no encontrado</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Volver</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <ItemDetailContent
        item={item}
        onUpdate={(changes) => updateItem(item.id, changes)}
        onDelete={() => {
          Alert.alert(
            'Eliminar',
            `¿Eliminar "${item.title}"?`,
            [
              { text: 'Cancelar', style: 'cancel' },
              {
                text: 'Eliminar',
                style: 'destructive',
                onPress: () => { deleteItem(item.id); navigation.goBack(); },
              },
            ]
          );
        }}
        onBack={() => navigation.goBack()}
      />
    </ScreenContainer>
  );
}

// ─── Contenido (separado para evitar que los hooks se rompan si item es null) ──

type ContentProps = {
  item: Item;
  onUpdate: (changes: Partial<Item>) => void;
  onDelete: () => void;
  onBack: () => void;
};

function ItemDetailContent({ item, onUpdate, onDelete, onBack }: ContentProps) {
  const [review, setReview] = useState(item.review);
  const [reviewSaved, setReviewSaved] = useState(false);

  const handleStatusChange = (status: ItemStatus) => {
    if (status === item.status) return;
    // Si baja de terminado, limpiamos rating
    const extra = status !== 'terminado' ? { rating: null } : {};
    onUpdate({ status, ...extra });
  };

  const handleRating = (value: number) => {
    // Toca la misma estrella → deseleccionar
    onUpdate({ rating: item.rating === value ? null : value });
  };

  const handleSaveReview = () => {
    onUpdate({ review });
    setReviewSaved(true);
    setTimeout(() => setReviewSaved(false), 2000);
  };

  const statusColor = STATUS_COLORS[item.status];

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.back}>← Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      {/* Hero: foto + info básica */}
      <View style={styles.hero}>
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.cover} />
        ) : (
          <View style={styles.coverPlaceholder}>
            {/* <Text style={styles.coverEmoji}>{TYPES.emoji[item.type]}</Text> */}
          </View>
        )}

        <View style={styles.heroInfo}>
          <View style={[styles.typeBadge]}>
            {/* <Text style={styles.typeBadgeText}>
              {TYPE_EMOJI[item.type]} {item.type}
            </Text> */}
          </View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.author ? (
            <Text style={styles.itemAuthor}>{item.author}</Text>
          ) : null}
          <Text style={styles.itemDate}>Agregado el {item.createdAt}</Text>
          {item.finishedAt ? (
            <Text style={styles.itemDate}>Terminado el {item.finishedAt}</Text>
          ) : null}
        </View>
      </View>

      {/* Estado */}
      <Section title="Estado">
        <View style={styles.statusRow}>
          {STATUSES.map(s => {
            const isActive = item.status === s.key;
            const color = STATUS_COLORS[s.key];
            return (
              <TouchableOpacity
                key={s.key}
                style={[
                  styles.statusBtn,
                  { backgroundColor: color.bg, borderColor: isActive ? color.border : 'transparent' },
                  isActive && styles.statusBtnActive,
                ]}
                onPress={() => handleStatusChange(s.key)}
                activeOpacity={0.75}
              >
                <Text style={styles.statusEmoji}>{s.emoji}</Text>
                <Text style={[styles.statusLabel, { color: color.text }]}>{s.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Section>

      {/* Rating — solo visible si está terminado */}
      {item.status === 'terminado' && (
        <Section title="Rating">
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(n => (
              <TouchableOpacity key={n} onPress={() => handleRating(n)} activeOpacity={0.7}>
                <Text style={[styles.star, item.rating && n <= item.rating ? styles.starFilled : styles.starEmpty]}>
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {item.rating ? (
            <Text style={styles.ratingLabel}>{item.rating} de 5</Text>
          ) : (
            <Text style={styles.ratingLabel}>Sin calificar</Text>
          )}
        </Section>
      )}

      {/* Reseña — solo visible si está terminado */}
      {item.status === 'terminado' && (
        <Section title="Reseña">
          <TextInput
            style={styles.reviewInput}
            placeholder="¿Qué te pareció? Escribí tu opinión..."
            placeholderTextColor="#BBB"
            multiline
            numberOfLines={4}
            value={review}
            onChangeText={(text) => { setReview(text); setReviewSaved(false); }}
          />
          <TouchableOpacity
            style={[styles.saveReviewBtn, reviewSaved && styles.saveReviewBtnSaved]}
            onPress={handleSaveReview}
            activeOpacity={0.8}
          >
            <Text style={styles.saveReviewBtnText}>
              {reviewSaved ? '✓ Guardado' : 'Guardar reseña'}
            </Text>
          </TouchableOpacity>
        </Section>
      )}

    </ScrollView>
  );
}

// ─── Section helper ────────────────────────────────────────────────────────────

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

// ─── Estilos ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7F5',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 24,
  },
  back: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#C0392B',
  },

  // Hero
  hero: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 28,
    alignItems: 'flex-start',
  },
  cover: {
    width: 100,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#EEE',
  },
  coverPlaceholder: {
    width: 100,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#EEEEF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverEmoji: {
    fontSize: 40,
  },
  heroInfo: {
    flex: 1,
    paddingTop: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEEEF4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6C63FF',
    textTransform: 'capitalize',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 26,
    marginBottom: 4,
  },
  itemAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemDate: {
    fontSize: 11,
    color: '#AAA',
    marginTop: 2,
  },

  // Section
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#AAA',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
  },

  // Status
  statusRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  statusBtnActive: {
    borderWidth: 1.5,
  },
  statusEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Rating
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  star: {
    fontSize: 36,
  },
  starFilled: {
    color: '#F5A623',
  },
  starEmpty: {
    color: '#DDD',
  },
  ratingLabel: {
    fontSize: 13,
    color: '#AAA',
    marginTop: 4,
  },

  // Reseña
  reviewInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    color: '#1A1A1A',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  saveReviewBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveReviewBtnSaved: {
    backgroundColor: '#2E7D32',
  },
  saveReviewBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // Not found
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  notFoundText: {
    fontSize: 16,
    color: '#AAA',
  },
});


