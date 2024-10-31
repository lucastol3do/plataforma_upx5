import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const courses = [
    { id: '1', title: 'Capacitação Digital para a Indústria 4.0', subtitle: 'Transformação Digital', exercises: '28 exercícios', duration: '6h 30min', rating: 4.9 },
    { id: '2', title: 'Competências', subtitle: 'Inovação', exercises: '28 lessons', duration: '8h 30min', rating: 4.8 },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.greeting}>Olá, Larissa</Text>
      <Text style={styles.subtitle}>Encontre seus cursos</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Pesquisar..." style={styles.searchInput} />
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Popular Courses */}
      <View style={styles.popularContainer}>
        <Text style={styles.popularText}>Mais Populares</Text>
        <Text style={styles.courseCount}>+100 cursos</Text>
        <TouchableOpacity style={styles.popularButton} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.buttonText}>Ver agora</Text>
        </TouchableOpacity>
      </View>

      {/* Courses in Highlight */}
      <View style={styles.highlightHeader}>
        <Text style={styles.highlightText}>Cursos em alta</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>Ver Tudo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={courses}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CourseDetails', { course: item })}
            style={styles.courseContainer}
          >
            <Image source={{ uri: 'https://as2.ftcdn.net/v2/jpg/04/21/82/47/1000_F_421824738_bIajUPDXqrbf3s0o0pvqHk0XbLnOWfrx.jpg' }} style={styles.image} />
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseSubtitle}>{item.subtitle}</Text>
            <Text style={styles.exerciseText}>{item.exercises}</Text>
            <View style={styles.courseInfo}>
              <Text style={styles.durationText}>{item.duration}</Text>
              <Text style={styles.ratingText}>
                <MaterialCommunityIcons name="star" size={12} color="#ffcc00" /> {item.rating}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.courseList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  greeting: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#666', marginBottom: 20 },

  // Search Bar
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  searchInput: { flex: 1, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  filterButton: { marginLeft: 10, padding: 10, backgroundColor: '#007bff', borderRadius: 8 },

  // Popular Section
  popularContainer: { padding: 15, backgroundColor: '#e6f2ff', borderRadius: 10, marginBottom: 20 },
  popularText: { fontSize: 16, fontWeight: 'bold', color: '#007bff' },
  courseCount: { fontSize: 14, color: '#666', marginVertical: 5 },
  popularButton: { marginTop: 10, backgroundColor: '#007bff', paddingVertical: 8, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },

  // Highlight Header
  highlightHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  highlightText: { fontSize: 18, fontWeight: 'bold' },
  viewAllText: { color: '#007bff' },

  // Course List
  courseList: { marginTop: 10 },
  courseContainer: { width: 200, marginRight: 15, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 10 },
  image: { width: '100%', height: 120, borderRadius: 8, marginBottom: 10 },
  courseTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  courseSubtitle: { fontSize: 14, color: '#666', marginBottom: 5 },
  exerciseText: { fontSize: 12, color: '#999', marginBottom: 10 },
  courseInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  durationText: { fontSize: 12, color: '#007bff' },
  ratingText: { fontSize: 12, color: '#ffcc00' },
});
