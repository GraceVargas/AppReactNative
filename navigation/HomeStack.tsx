import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ItemDetailScreen } from '../screens/ItemDetailScreen';
import { HomeStackParamList } from '../types/navigation';
import AddItemScreen from '../screens/AddItemScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
    <Stack.Screen name="AddItem" component={AddItemScreen} />
  </Stack.Navigator>
);

export default HomeStack;