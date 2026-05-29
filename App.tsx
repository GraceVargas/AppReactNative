import React, { FC, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { AuthProvider } from "./context/AuthContext";
import RootNavigator from "./navigation/RootNavigator";
import { ItemProvider } from "./context/ItemContext";

const App: FC = () => {
  useEffect(() => {
    Font.loadAsync(Ionicons.font);
  }, []);

  return (
    <AuthProvider>
      <ItemProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ItemProvider>
    </AuthProvider>
  );
};

export default App;
