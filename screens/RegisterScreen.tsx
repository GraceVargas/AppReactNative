import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { RegisterForm } from "../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../types/navigation";

const initialState = { email: "", password: "", acepta: false };

type NavProps = NativeStackNavigationProp<AuthStackParamList, 'Register'> 

type Props = {
  navigation: NavProps;
}

const RegisterScreen = ({ navigation }: Props) => {
  const { register } = useAuth();
  const [form, setForm] = useState<RegisterForm>(initialState);

  const handleRegister = async () => {
    if (!form.email.includes("@") || form.password.length < 4 || !form.acepta) {
      alert("Revisa los datos y acepta términos");
      return;
    }

    const success = await register(form.email, form.password);

    if (!success) {
      Alert.alert("Error", "El usuario ya existe");
      return;
    }

    Alert.alert("Registro exitoso", "Ya puedes iniciar sesión", [
      {
        text: "Ir a login",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };
    

    return (
      <View style={{ flex: 1, padding: 16, justifyContent: "center", gap: 8 }}>
        <Text style={styles.title}>Registro</Text>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Acepto términos</Text>
          <Switch
            value={form.acepta}
            onValueChange={(v) => setForm((f) => ({ ...f, acepta: v }))}
          />
        </View>
        <Button title="Confirmar" onPress={handleRegister} />
        <Text style={styles.title}>¿Ya tenes cuenta?</Text>
        <Button title="Iniciar sesión" onPress={() => navigation.navigate("Login")} />
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

export default RegisterScreen;
