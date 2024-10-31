import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(['transformação digital', 'processos industria']);

  const courses = [
    { id: '1', title: 'Automação e Digitalização de Processos Industriais', level: 'Intermediário', exercises: '28 exercícios', duration: '6h 30min', rating: 4.9, isFavorite: true },
    { id: '2', title: 'Tecnologias Disruptivas na Manufatura', level: 'Iniciante', exercises: '24 exercícios', duration: '3h 42min', rating: 4.8, isFavorite: false },
    { id: '3', title: 'Uso de Ferramentas Digitais no Ambiente Industrial', level: 'Avançado', exercises: '46 exercícios', duration: '8h 28min', rating: 4.6, isFavorite: true },
    { id: '4', title: 'Digitalização de Operações Industriais: Um Guia Prático', level: 'Intermediário', exercises: '39 exercícios', duration: '2h 34min', rating: 4.9, isFavorite: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Pesquisa</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="cog-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        {filters.map((filter, index) => (
          <View key={index} style={styles.filterTag}>
            <Text style={styles.filterText}>{filter}</Text>
          </View>
        ))}
      </View>

      {/* Courses List */}
      <FlatList
        data={courses.filter(course => course.title.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.courseContainer, item.isFavorite ? styles.favoriteBackground : null]}>
            <Image source={{ uri: 'https://as2.ftcdn.net/v2/jpg/04/21/82/47/1000_F_421824738_bIajUPDXqrbf3s0o0pvqHk0XbLnOWfrx.jpg' }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseDetails}>{`${item.level} · ${item.exercises}`}</Text>
              <View style={styles.courseMeta}>
                <Text style={styles.courseDuration}>{item.duration}</Text>
                <Text style={styles.courseRating}>⭐ {item.rating}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteIcon}>
              <MaterialCommunityIcons name={item.isFavorite ? "heart" : "heart-outline"} size={24} color={item.isFavorite ? "red" : "grey"} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  
  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerText: { fontSize: 18, fontWeight: 'bold' },

  // Search
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  searchBar: { flex: 1, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 },
  filterButton: { marginLeft: 10, padding: 10, backgroundColor: '#007bff', borderRadius: 8 },

  // Filters
  filtersContainer: { flexDirection: 'row', marginBottom: 10 },
  filterTag: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#e6f2ff', borderRadius: 20, marginRight: 5 },
  filterText: { color: '#007bff' },

  // Course List
  courseContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 10, borderRadius: 10, marginBottom: 10 },
  favoriteBackground: { backgroundColor: '#d9ebff' },
  courseImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  courseInfo: { flex: 1 },
  courseTitle: { fontSize: 16, fontWeight: 'bold' },
  courseDetails: { color: '#666', fontSize: 12, marginVertical: 5 },
  courseMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  courseDuration: { color: '#007bff', fontSize: 12 },
  courseRating: { color: '#ffcc00', fontSize: 12 },

  // Favorite Icon
  favoriteIcon: { marginLeft: 10 },
});
