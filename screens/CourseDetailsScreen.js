import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

export default function CourseDetailsScreen({ route }) {
  const { course } = route.params;
  const modules = [
    { id: '1', title: 'Introdução à Indústria 4.0', duration: '4:28 min' },
    { id: '2', title: 'Tecnologias Emergentes', duration: '6:12 min' },
    { id: '3', title: 'Competências Digitais para o Trabalhador da Indústria', duration: '43:58 min' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text>{`${course.duration} · ${course.rating}⭐`}</Text>
      <FlatList
        data={modules}
        renderItem={({ item }) => (
          <View style={styles.moduleContainer}>
            <Text>{item.title}</Text>
            <Text>{item.duration}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Button title="Comece Agora" onPress={() => alert('Iniciar Curso')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  moduleContainer: { marginVertical: 10, padding: 10, backgroundColor: '#e6f2ff', borderRadius: 10 },
});
