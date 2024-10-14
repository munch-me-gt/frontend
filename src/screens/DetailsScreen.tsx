import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

const DetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params;

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      <Text>Other Param: {otherParam}</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;