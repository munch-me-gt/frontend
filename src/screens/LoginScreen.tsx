import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Adjust this path if necessary
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Access the login function from context

  const handleLogin = async () => {
    try {
      const response = await fetch('https://lngq4d2o0g.execute-api.us-east-2.amazonaws.com/prod/login-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'xltVhrbbdO4enDZ4pTbr13cBAeKny0DN7GblTJYL',
        },
        body: JSON.stringify({
          email: username.toLowerCase(),
          password: password,
        }),
      });
  
      const data = await response.json();

      console.log(data)
  
      if (response.ok && data.user_info.message === 'Login successful') {
        const { address, 'gt email': email, name, gtid } = data.user_info.user;
  
        // Create a simple token based on the user's address, email, name, and gtid
        const tokenString = `${address}:${email}:${name}:${gtid}`;
        const token = btoa(tokenString);  // Base64 encoding for simple tokenization
  
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('userToken', token);
  
        // Trigger login in context and navigate to Home
        login();
        navigation.replace('Home');
      } 
      else if (data.user_info.message === 'Invalid password') {
        alert('Invalid password. Please try again.');
      }
      else if (data.user_info.message === 'User not found') {
        alert('User not found. Please try again.');
      }
      else {
        alert('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/munch-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome Back!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.footerText} onPress={() => navigation.navigate('Register')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1', // Match the background color from WelcomeScreen
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#FF5722',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footerText: {
    marginTop: 15,
    color: '#FF5722',
    fontSize: 16,
  },
});

export default LoginScreen;
