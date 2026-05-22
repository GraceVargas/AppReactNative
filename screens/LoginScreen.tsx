import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Switch,
  Button,
  Alert,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../types/types";
import { AuthStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const initialState = { email: "", password: ""};

type NavProps = NativeStackNavigationProp<AuthStackParamList, 'Login'> 

type Props = {
  navigation: NavProps;
}

const LoginScreen = ({ navigation }: Props) => {
  const [form, setForm] = useState<LoginForm>(initialState);
  const { login } = useAuth();

  const enviar = async () => {
    if (!form.email.includes("@") || form.password.length < 4) {
      Alert.alert("Revisa los datos");
      return;
    }

    const success = await login(form.email, form.password);

    if (!success) {
      Alert.alert("Credenciales inválidas", "Revisa email y contraseña");
      return;
    }

    Alert.alert("Bienvenido", "Has iniciado sesión correctamente");
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 8 }}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Text>Email</Text>
      <TextInput
        value={form.email}
        onChangeText={(v) => setForm((f) => ({ ...f, email: v }))}
        placeholder="email"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Text>Contraseña</Text>
      <TextInput
        value={form.password}
        onChangeText={(v) => setForm((f) => ({ ...f, password: v }))}
        placeholder="contraseña"
        secureTextEntry
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button title="Ingresar" onPress={enviar} />
      <Text style={styles.title}>¿Todavía no tenes cuenta?</Text>
      <Button title="Registrarme" onPress={() => navigation.navigate("Register")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
