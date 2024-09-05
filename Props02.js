import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Props02 = ({ route }) => {
  const { nombre, estado } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{nombre}</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Estado:</Text>
        <Text style={styles.value}>{estado.toString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',  // Alinear el contenido en la parte superior
    alignItems: 'flex-start',      // Alinear horizontalmente al inicio
    paddingTop: 10,                // Reducir la separación en la parte superior
    paddingHorizontal: 20,         // Ajustar el padding horizontal
    backgroundColor: '#f4f6f9',    // Fondo claro
  },
  item: {
    marginBottom: 20,              // Espacio entre las etiquetas
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 20,
    color: '#007bff',              // Color del valor resaltado
  },
});

export default Props02;