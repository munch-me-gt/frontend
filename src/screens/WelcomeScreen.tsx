import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/munch-logo.png')} style={styles.logo} />
      <Text style={styles.loadingText}>Let's Munch!</Text>
      <ActivityIndicator size="large" color="#FF5722" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 10,
  },
});

export default WelcomeScreen;