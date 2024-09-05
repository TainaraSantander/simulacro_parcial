import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorage04 = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); // Estado para manejar la edición

  const loadItems = async () => {
    const storedItems = await AsyncStorage.getItem('items');
    if (storedItems) setItems(JSON.parse(storedItems));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const storeItem = async () => {
    if (editingItemId) {
      // Si estamos editando, actualizar el item existente
      const updatedItems = items.map(item => 
        item.id === editingItemId ? { id: item.id, nombre, cedula } : item
      );
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      setEditingItemId(null); // Limpiar estado de edición
    } else {
      // Si no estamos editando, crear un nuevo item
      const newItem = { id: Date.now().toString(), nombre, cedula };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    }
    setNombre('');
    setCedula('');
  };

  const deleteItem = async (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const editItem = (item) => {
    setNombre(item.nombre);
    setCedula(item.cedula);
    setEditingItemId(item.id); // Marcar el item para edición
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        style={styles.input}
      />
      <TouchableOpacity style={styles.saveButton} onPress={storeItem}>
        <Text style={styles.saveButtonText}>{editingItemId ? "Actualizar" : "Guardar"}</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nombre} - {item.cedula}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => editItem(item)}>
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f9',  // Fondo claro
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,             // Bordes redondeados
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',     // Fondo blanco para los inputs
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#e0e0e0',  // Fondo gris claro para cada item
    marginBottom: 15,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#28a745',  // Verde para "Editar"
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#dc3545',  // Rojo para "Eliminar"
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default AsyncStorage04;