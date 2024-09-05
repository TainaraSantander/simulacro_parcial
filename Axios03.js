import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const Axios03 = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,     // Espaciado lateral
    paddingTop: 20,            // Espaciado desde la parte superior
    backgroundColor: '#f4f6f9', // Fondo claro
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#e0e0e0', // Fondo gris claro para cada elemento
    marginBottom: 10,          // Espaciado entre elementos
    borderRadius: 8,           // Bordes redondeados para un mejor diseño
  },
  name: {
    fontSize: 18,              // Tamaño más grande para el nombre
    fontWeight: 'bold',
    color: '#333',             // Color oscuro para el nombre
  },
  email: {
    fontSize: 16,              // Tamaño más pequeño para el email
    color: '#555',             // Color gris oscuro para el email
    marginTop: 5,              // Espaciado entre nombre y email
  },
});

export default Axios03;