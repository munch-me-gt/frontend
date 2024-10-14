import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Details: { itemId: number; otherParam: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Home' }} 
          />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            options={{ title: 'Details' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;