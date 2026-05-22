import React, { FC } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { contactos } from '../db';
import { HomeStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type NavProps = NativeStackNavigationProp<HomeStackParamList, 'Lista'> //detallo el tipo de navegacion que va a tener esta pantalla, en este caso, la pantalla Lista, y le paso el HomeStackParamList para que sepa que pantallas tengo en mi app y pueda navegar entre ellas

type Props = {
  navigation: NavProps;
}

const ListScreen: FC<Props> = ({ navigation }) => {
  return (
      <View style={styles.container}>
      <Text style={styles.title}>Lista de contactos</Text>
      <FlatList
        data={contactos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item: prod}) => 
          <View style={styles.item}>
            <Text>{prod.nombre}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Detalle', { id: prod.id })}
            >
             <Ionicons name="eye" size={16} color="#fff" />
            </TouchableOpacity>
          </View>}  
        contentContainerStyle={styles.lista}
      />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ebf3a3',
      color: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    lista: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 30
    },  
    item: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 20
    },
    button: {
      marginTop: 10,
      backgroundColor: '#2563eb',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '700',
    }
  });
  
  export default ListScreen