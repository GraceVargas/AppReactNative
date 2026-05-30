import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Image, Alert,
  ActivityIndicator, SafeAreaView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useItem from '../hooks/useItem';
import { ItemType } from '../types/types';


type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function AddItemScreen({ navigation }: Props) {
  const { addItem } = useItem();

  const [title, setTitle]   = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType]     = useState<ItemType | null>(null);
  const [photo, setPhoto]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ── Cámara / Galería ──────────────────────────────────────────────────────────

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para sacar la foto.');
      return false;
    }
    return true;
  };

  const requestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería.');
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    if (!(await requestCameraPermission())) return;
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],   // proporción de portada
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const pickFromGallery = async () => {
    if (!(await requestGalleryPermission())) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0.7,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const handlePhotoPress = () => {
    Alert.alert('Foto de portada', '¿De dónde querés sacar la foto?', [
      { text: '📷 Cámara',  onPress: takePhoto },
      { text: '🖼️ Galería', onPress: pickFromGallery },
      { text: 'Cancelar',   style: 'cancel' },
    ]);
  };

  // ── Guardar ───────────────────────────────────────────────────────────────────

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Campo requerido', 'El título no puede estar vacío.');
      return;
    }
    if (!type) {
      Alert.alert('Campo requerido', 'Seleccioná un tipo.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      addItem({
        title: title.trim(),
        author: author.trim() || undefined,
        type,
        photo: photo ?? undefined,
      });
      setLoading(false);
      navigation.goBack();
    }, 300);
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  const authorLabel = type === 'libro' ? 'Autor' : 'Director / Creador';
  const authorPlaceholder = type === 'libro' ? 'Ej: Gabriel García Márquez' : 'Ej: Christopher Nolan';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.back}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Nuevo item</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Foto */}
        <TouchableOpacity style={styles.photoArea} onPress={handlePhotoPress} activeOpacity={0.8}>
          {photo ? (
            <>
              <Image source={{ uri: photo }} style={styles.photo} />
              <TouchableOpacity style={styles.removePhoto} onPress={() => setPhoto(null)}>
                <Text style={styles.removePhotoText}>✕ Quitar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.cameraEmoji}>📷</Text>
              <Text style={styles.photoHint}>Agregá la portada</Text>
              <Text style={styles.photoSub}>Cámara o galería</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Formulario */}
        <View style={styles.form}>

          {/* Tipo */}
          <Text style={styles.label}>Tipo *</Text>
          <View style={styles.typeRow}>
            {TYPES.map(t => (
              <TouchableOpacity
                key={t.key}
                style={[styles.typeBtn, type === t.key && styles.typeBtnActive]}
                onPress={() => setType(t.key)}
                activeOpacity={0.75}
              >
                <Text style={styles.typeEmoji}>{t.emoji}</Text>
                <Text style={[styles.typeLabel, type === t.key && styles.typeLabelActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Título */}
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Cien años de soledad"
            placeholderTextColor="#BBB"
            value={title}
            onChangeText={setTitle}
          />

          {/* Autor / Director */}
          <Text style={styles.label}>{authorLabel}</Text>
          <TextInput
            style={styles.input}
            placeholder={authorPlaceholder}
            placeholderTextColor="#BBB"
            value={author}
            onChangeText={setAuthor}
          />

        </View>

        {/* Botón guardar */}
        <TouchableOpacity
          style={[styles.saveBtn, (!title.trim() || !type) && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={loading || !title.trim() || !type}
          activeOpacity={0.85}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.saveBtnText}>Guardar</Text>
          }
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Estilos ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7F5',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginBottom: 24,
  },
  back: {
    color: '#1A1A1A',
    fontSize: 15,
    fontWeight: '600',
    width: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
  },

  // Foto
  photoArea: {
    alignSelf: 'center',
    marginBottom: 28,
    alignItems: 'center',
  },
  photo: {
    width: 130,
    height: 195,   // proporción 2:3 de portada
    borderRadius: 12,
  },
  photoPlaceholder: {
    width: 130,
    height: 195,
    borderRadius: 12,
    backgroundColor: '#EEEEF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#D0D0E0',
    borderStyle: 'dashed',
  },
  cameraEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  photoHint: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  photoSub: {
    fontSize: 11,
    color: '#AAA',
    marginTop: 3,
  },
  removePhoto: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#FFE5E5',
    borderRadius: 20,
  },
  removePhotoText: {
    fontSize: 12,
    color: '#C0392B',
    fontWeight: '600',
  },

  // Formulario
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
  },

  // Tipo
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  typeBtnActive: {
    backgroundColor: '#F0EEFF',
    borderColor: '#6C63FF',
  },
  typeEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
  typeLabelActive: {
    color: '#6C63FF',
  },

  // Botón guardar
  saveBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#CDCDCD',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
