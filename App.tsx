import React, { FC, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AuthProvider } from "./context/AuthContext";
import RootNavigator from "./navigation/RootNavigator";
import { ItemProvider } from "./context/ItemContext";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: FC = () => {
  useEffect(() => {
    Font.loadAsync(Ionicons.font);
  }, []);

  return (
    <AuthProvider>
      <ItemProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ItemProvider>
    </AuthProvider>
  );
};

export default App;
