import React, { useState } from 'react';
import {
  View, Text, TextInput, Switch, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
  KeyboardAvoidingView, Platform, ScrollView, SafeAreaView,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { RegisterForm } from '../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation';
import ScreenContainer from '../components/ScreenContainer';
import utils from '../utils';

const initialState: RegisterForm = { email: '', password: '', acepta: false };

type NavProps = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

type Props = {
  navigation: NavProps;
};

const RegisterScreen = ({ navigation }: Props) => {
  const { register } = useAuth();
  const { isValidEmail } = utils;
  const [form, setForm] = useState<RegisterForm>(initialState);
  const [loading, setLoading] = useState(false);


  const set = (key: keyof RegisterForm) => (value: string | boolean) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleRegister = async () => {
    if (!isValidEmail(form.email) || form.password.length < 4 || !form.acepta) {
      Alert.alert('Revisá los datos', 'Email válido, contraseña de al menos 4 caracteres y aceptar términos.');
      return;
    }

    setLoading(true);
    const success = await register(form.email, form.password);
    setLoading(false);

    if (!success) {
      Alert.alert('Error', 'Ya existe una cuenta con ese email.');
      return;
    }

    Alert.alert('¡Listo!', 'Cuenta creada. Ya podés iniciar sesión.', [
      { text: 'Ir al login', onPress: () => navigation.navigate('Login') },
    ]);
  };

  const canSubmit = form.email.includes('@') && form.password.length >= 4 && form.acepta;

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.back}>← Volver</Text>
          </TouchableOpacity>

          <View style={styles.heroRow}>
            <Text style={styles.heroEmoji}>📋</Text>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.subtitle}>Registrate para guardar tu lista</Text>
          </View>

          {/* Form card */}
          <View style={styles.card}>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={set('email')}
              placeholder="tu@email.com"
              placeholderTextColor="#BBB"
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              value={form.password}
              onChangeText={set('password')}
              placeholder="Mínimo 4 caracteres"
              placeholderTextColor="#BBB"
              secureTextEntry
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Acepto los términos y condiciones</Text>
              <Switch
                value={form.acepta}
                onValueChange={set('acepta')}
                trackColor={{ false: '#DDD', true: '#1A1A1A' }}
                thumbColor="#fff"
              />
            </View>

          </View>

          {/* Botón registrar */}
          <TouchableOpacity
            style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
            onPress={handleRegister}
            disabled={loading || !canSubmit}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.primaryBtnText}>Crear cuenta</Text>
            }
          </TouchableOpacity>

          {/* Link login */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
            <Text style={styles.loginLinkText}>
              ¿Ya tenés cuenta? <Text style={styles.loginLinkBold}>Iniciá sesión</Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

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
  backBtn: {
    paddingTop: 20,
    marginBottom: 24,
  },
  back: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },

  // Hero
  heroRow: {
    alignItems: 'center',
    marginBottom: 32,
  },
  heroEmoji: {
    fontSize: 52,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 4,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A1A',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  switchLabel: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    marginRight: 12,
  },

  // Botones
  primaryBtn: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryBtnDisabled: {
    backgroundColor: '#CDCDCD',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginLinkText: {
    fontSize: 14,
    color: '#AAA',
  },
  loginLinkBold: {
    color: '#1A1A1A',
    fontWeight: '700',
  },
});

export default RegisterScreen;
