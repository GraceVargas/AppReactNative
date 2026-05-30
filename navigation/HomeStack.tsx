import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import { HomeStackParamList } from '../types/navigation';
import AddItemScreen from '../screens/AddItemScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ItemDetail" component={DetailScreen} />
    <Stack.Screen name="AddItem" component={AddItemScreen} />
  </Stack.Navigator>
);

export default HomeStack;