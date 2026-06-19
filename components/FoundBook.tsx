import React from 'react';
import {
  View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BookResult } from '../types/types';
import { getCoverUrl } from '../services/openLibrary';

    type Props = {
    item: BookResult;
    handleAdd: (book: BookResult, added: boolean) => void;
    added: boolean;
    };

export const FoundBook = ({ item, handleAdd, added }: Props) => {
    return (
      <View style={styles.card}>
        {item.cover_i ? (
          <Image
            source={{ uri: getCoverUrl(item.cover_i) }}
            style={styles.cover}
          />
        ) : (
          <View style={styles.coverPlaceholder}>
            <Text style={styles.coverEmoji}>📖</Text>
          </View>
        )}

        <View style={styles.cardBody}>
          <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
          {item.author_name?.[0] ? (
            <Text style={styles.bookAuthor} numberOfLines={1}>
              {item.author_name[0]}
            </Text>
          ) : null}
          {item.first_publish_year ? (
            <Text style={styles.bookYear}>{item.first_publish_year}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[styles.addBtn, added && styles.addBtnDone]}
          onPress={() => handleAdd(item, added)}
          disabled={added}
          activeOpacity={0.8}
        >
          <Text style={[styles.addBtnText, added && styles.addBtnTextDone]}>
            {added ? '✓' : '+'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 14,
      padding: 12,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 1,
    },
    cover: {
      width: 46,
      height: 64,
      borderRadius: 6,
      backgroundColor: '#EEE',
    },
    coverPlaceholder: {
      width: 46,
      height: 64,
      borderRadius: 6,
      backgroundColor: '#F0EEF8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    coverEmoji: {
      fontSize: 22,
    },
    cardBody: {
      flex: 1,
      marginHorizontal: 12,
    },
    bookTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: '#1A1A1A',
      lineHeight: 19,
    },
    bookAuthor: {
      fontSize: 12,
      color: '#888',
      marginTop: 3,
    },
    bookYear: {
      fontSize: 11,
      color: '#BBB',
      marginTop: 2,
    },
    addBtn: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: '#1A1A1A',
      justifyContent: 'center',
      alignItems: 'center',
    },
    addBtnDone: {
      backgroundColor: '#E8F5E9',
    },
    addBtnText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '300',
      lineHeight: 24,
    },
    addBtnTextDone: {
      color: '#2E7D32',
      fontSize: 16,
      fontWeight: '700',
    }
  });
  