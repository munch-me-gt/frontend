import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import RegisterScreen from './src/screens/RegisterScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Details: { itemId: number; otherParam: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </>
      )
      }
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Simulate a loading delay of 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <WelcomeScreen navigation={undefined} />; // Show loading screen while loading is true
  }

  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
