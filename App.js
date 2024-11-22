import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CourseDetailsScreen from './screens/CourseDetailsScreen';
import SearchScreen from './screens/SearchScreen';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Senha deve ter pelo menos 8 caracteres, com pelo menos uma letra e um número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

async function saveUserData(userData) {
  try {
    let users = await AsyncStorage.getItem('users');
    users = users ? JSON.parse(users) : [];
    users.push(userData);
    await AsyncStorage.setItem('users', JSON.stringify(users));
  } catch (error) {
    console.error("Erro ao salvar dados do usuário", error);
  }
}

async function checkUserLogin(email, password) {
  try {
    let users = await AsyncStorage.getItem('users');
    users = users ? JSON.parse(users) : [];
    const user = users.find(user => user.email === email && user.password === password);
    return user !== undefined;
  } catch (error) {
    console.error("Erro ao verificar login", error);
    return false;
  }
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres, incluindo apenas letras e números.');
      return;
    }

    const isValidUser = await checkUserLogin(email, password);
    if (isValidUser) {
      navigation.replace('Main');
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo!</Text>
      <Text style={styles.screenTitle}>Login</Text>
      <TextInput 
        label="Email" 
        mode="outlined" 
        style={styles.input} 
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        label="Senha" 
        mode="outlined" 
        secureTextEntry 
        style={styles.input} 
        value={password}
        onChangeText={setPassword}
      />
      <Button 
        mode="contained" 
        onPress={handleLogin}
        style={styles.button}
        buttonColor="#007BFF">
        Entrar
      </Button>
      <Button 
        mode="outlined" 
        onPress={() => navigation.navigate('Register')} 
        style={styles.button}
        textColor="#007BFF">
        Cadastrar-se
      </Button>
    </View>
  );
}

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name) {
      Alert.alert('Erro', 'Por favor, insira o seu nome.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres, incluindo apenas letras e números.');
      return;
    }

    await AsyncStorage.setItem('userName', name);

    const userData = { name, email, password };
    await saveUserData(userData);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo!</Text>
      <Text style={styles.screenTitle}>Cadastro</Text>
      <TextInput 
        label="Nome" 
        mode="outlined" 
        style={styles.input} 
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        label="Email" 
        mode="outlined" 
        style={styles.input} 
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        label="Senha" 
        mode="outlined" 
        secureTextEntry 
        style={styles.input} 
        value={password}
        onChangeText={setPassword}
      />
      <Button 
        mode="contained" 
        onPress={handleRegister}
        style={styles.button}
        buttonColor="#007BFF">
        Cadastrar
      </Button>
      <Button 
        mode="outlined" 
        onPress={() => navigation.navigate('Login')} 
        style={styles.button}
        textColor="#007BFF">
        Já tem uma conta? Login
      </Button>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} options={{ title: 'Detalhes do Curso' }} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ title: 'Pesquisa' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
        <AuthStack.Screen name="Main" component={MainTabNavigator} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
  },
});
