import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Componente01 = () => {
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation();

  const items = [
    { id: '1', title: 'Props02', screen: 'Props02' },
    { id: '2', title: 'Axios03', screen: 'Axios03' },
    { id: '3', title: 'AsyncStorage04', screen: 'AsyncStorage04' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal</Text>
      
      <TextInput
        placeholder="Ingresa un texto"
        value={inputText}
        onChangeText={setInputText}
        style={styles.input}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => navigation.navigate(item.screen, { nombre: inputText, estado: false })}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',  // Fondo suave
    justifyContent: 'center',     // Centrar verticalmente
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',           // Centrar el título
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,              // Bordes redondeados
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',       // Fondo blanco del input
  },
  itemButton: {
    padding: 15,
    backgroundColor: '#6c757d',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Componente01;