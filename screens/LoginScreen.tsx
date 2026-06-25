import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
  KeyboardAvoidingView, Platform, SafeAreaView,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../types/types';
import { AuthStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../components/ScreenContainer';

const initialState: LoginForm = { email: '', password: '' };

type NavProps = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type Props = {
  navigation: NavProps;
};

const LoginScreen = ({ navigation }: Props) => {
  const [form, setForm] = useState<LoginForm>(initialState);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const set = (key: keyof LoginForm) => (value: string) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleLogin = async () => {
    if (!isValidEmail(form.email) || form.password.length < 4) {
      Alert.alert(
        'Revisá los datos', 
        'Ingresá un email válido y una contraseña de al menos 4 caracteres.'
      );
      return;
    }

    setLoading(true);
    const success = await login(form.email, form.password);
    setLoading(false);

    if (!success) {
      Alert.alert('Credenciales inválidas', 'Revisá el email y la contraseña.');
    }
  };

  const canSubmit = form.email.includes('@') && form.password.length >= 4;

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>

          {/* Hero */}
          <View style={styles.heroRow}>
            <Text style={styles.heroEmoji}>🎬</Text>
            <Text style={styles.title}>WatchList</Text>
            <Text style={styles.subtitle}>Tu lista de libros y películas</Text>
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

          </View>

          {/* Botón ingresar */}
          <TouchableOpacity
            style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
            onPress={handleLogin}
            disabled={loading || !canSubmit}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.primaryBtnText}>Ingresar</Text>
            }
          </TouchableOpacity>

          {/* Link registro */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.registerLink}
          >
            <Text style={styles.registerLinkText}>
              ¿No tenés cuenta? <Text style={styles.registerLinkBold}>Registrate</Text>
            </Text>
          </TouchableOpacity>

        </View>
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
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  // Hero
  heroRow: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -1,
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
  registerLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  registerLinkText: {
    fontSize: 14,
    color: '#AAA',
  },
  registerLinkBold: {
    color: '#1A1A1A',
    fontWeight: '700',
  },
});

export default LoginScreen;
