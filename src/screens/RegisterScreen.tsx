import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Adjust this path if necessary

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [gtid, setGtid] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('https://lngq4d2o0g.execute-api.us-east-2.amazonaws.com/prod/register-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'xltVhrbbdO4enDZ4pTbr13cBAeKny0DN7GblTJYL',
          },
        body: JSON.stringify({
          email,
          address,
          gtid,
          name,
          password,
          orders_dropped: [],
          orders_picked: [],
          verified: false,
        }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        Alert.alert('Registration Successful', 'You can now log in with your credentials.');
        navigation.navigate('Login'); // Navigate to login after successful registration
      } else {
        Alert.alert('Registration Failed', data.user_info.message || 'Please try again.'); // Handle error
      }
    } catch (error) {
      console.error('Registration failed', error);
      Alert.alert('Registration Error', 'An error occurred. Please try again later.'); // Generic error message
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/munch-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="GTID"
        value={gtid}
        onChangeText={setGtid}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.footerText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Log In
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1', // Match the background color from other screens
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

export default RegisterScreen;
