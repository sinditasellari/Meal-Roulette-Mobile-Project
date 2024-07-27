import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import MealSelectionScreen from './screens/MealSelectionScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';

enableScreens();

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MealSelection">
        <Stack.Screen name="MealSelection" component={MealSelectionScreen} />
        <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;