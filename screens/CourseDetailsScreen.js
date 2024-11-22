import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Video } from 'expo-av';
import { Button, Card } from 'react-native-paper'; // Importando os componentes do Paper

export default function CourseDetailsScreen({ route }) {
  const { course } = route.params;

  const modules = [
    { id: '1', title: 'Introdução à Indústria 4.0', duration: '4:28 min', video: 'https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4' },
    { id: '2', title: 'Tecnologias Emergentes', duration: '6:12 min', video: 'https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4' },
    { id: '3', title: 'Competências Digitais para o Trabalhador da Indústria', duration: '43:58 min', video: 'https://edisciplinas.usp.br/pluginfile.php/5196097/mod_resource/content/1/Teste.mp4' },
  ];

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const videoRef = useRef(null); // Referência para o vídeo
  const [isPlaying, setIsPlaying] = useState(true); // Estado para pausar e reproduzir

  const handlePlayVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setModalVisible(true);
  };

  const togglePlayPause = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const skipForward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      await videoRef.current.setPositionAsync(status.positionMillis + 10000); // Avança 10 segundos
    }
  };

  const skipBackward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      await videoRef.current.setPositionAsync(status.positionMillis - 10000); // Volta 10 segundos
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>
      <Text>{`${course.duration} · ${course.rating}⭐`}</Text>
      <FlatList
        data={modules}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePlayVideo(item.video)}>
            <Card style={styles.moduleContainer}>
              <Card.Content>
                <Text style={styles.moduleTitle}>{item.title}</Text>
                <Text>{item.duration}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button mode="contained" onPress={() => alert('Iniciar Curso')} style={[styles.startButton, styles.blueButton]}>
        Comece Agora
      </Button>

      {/* Modal para exibir o vídeo */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: selectedVideo }}
            style={styles.videoPlayer}
            resizeMode="contain"
            shouldPlay
          />
          <View style={styles.controls}>
            <Button icon="rewind" mode="contained" onPress={skipBackward} style={[styles.controlButton, styles.blueButton]}>⏪</Button>
            <Button icon={isPlaying ? 'pause' : 'play'} mode="contained" onPress={togglePlayPause} style={[styles.controlButton, styles.blueButton]}>
              {isPlaying ? '⏸ Pausar' : '▶️ Reproduzir'}
            </Button>
            <Button icon="fast-forward" mode="contained" onPress={skipForward} style={[styles.controlButton, styles.blueButton]}>⏩</Button>
          </View>
          <Button mode="contained" onPress={() => setModalVisible(false)} style={[styles.closeButton, styles.blueButton]}>
            Fechar
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  moduleContainer: { marginVertical: 10, borderRadius: 10 },
  moduleTitle: { fontWeight: 'bold', marginBottom: 5 },
  videoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  videoPlayer: { width: '100%', height: 300 },
  controls: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: '100%' },
  controlButton: { flex: 1, marginHorizontal: 5 },
  startButton: { marginTop: 20, marginBottom: 10 },
  closeButton: { marginTop: 20, backgroundColor: '#f44336' },
  // Estilo para os botões azuis
  blueButton: {
    backgroundColor: '#2196F3',
  },
});
