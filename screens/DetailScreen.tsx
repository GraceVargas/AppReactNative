import React from 'react'
import { View, StyleSheet, Text } from "react-native"
import { contactos } from '../db';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../types/navigation';

type RouteProps = RouteProp<HomeStackParamList, 'Detalle'>;

type Props = {
    route: RouteProps
    }

const DetailScreen = ({ route }: Props) => {
  const { id } = route.params;
  const contacto = contactos.find(c => c.id === id);
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Detalle</Text>
        <Text>{contacto?.nombre}</Text>
        <Text>{contacto?.telefono}</Text>
    </View>
    )
}
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#d0a3f3',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
    });

export default DetailScreen