import React from 'react';
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, Alert,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import ScreenContainer from '../components/ScreenContainer';

function PersonScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Seguro que querés salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: logout },
      ]
    );
  };

  const initial = user?.email?.[0].toUpperCase() ?? '?';

  return (
    <ScreenContainer>
      <View style={styles.container}>

        {/* Header */}
        <Text style={styles.screenTitle}>Mi cuenta</Text>

        {/* Avatar */}
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarLetter}>{initial}</Text>
        </View>

        {/* Info card */}
        <View style={styles.card}>
          <InfoRow label="Email" value={user?.email ?? '-'} />
          <View style={styles.divider} />
          <InfoRow label="ID de usuario" value={user?.id ?? '-'} mono />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

      </View>
    </ScreenContainer>
  );
}


type InfoRowProps = {
  label: string;
  value: string;
  mono?: boolean;
};

const InfoRow = ({ label, value, mono }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, mono && styles.infoValueMono]} numberOfLines={1}>
      {value}
    </Text>
  </View>
);


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F7F5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },

  // Header
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
    alignSelf: 'flex-start',
    marginBottom: 32,
  },

  // Avatar
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarLetter: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
  },

  // Card
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 32,
  },
  infoRow: {
    paddingVertical: 14,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#AAA',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  infoValueMono: {
    fontFamily: 'monospace' as const,
    fontSize: 13,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },

  // Logout
  logoutBtn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#C0392B',
    alignItems: 'center',
  },
  logoutText: {
    color: '#C0392B',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default PersonScreen;
