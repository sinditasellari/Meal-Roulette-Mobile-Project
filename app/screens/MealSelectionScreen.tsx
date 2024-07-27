import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MealItem from '../components/MealItem'; 

interface Meal {
  id: number;
  title: string;
  picture: string;
}

const MealSelectionScreen: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const navigation = useNavigation<{ navigate: (screen: string, params: { mealId: number }) => void }>();


  useEffect(() => {
    fetchInitialMeals();
  }, []);

  const fetchInitialMeals = async () => {
    try {
      const response = await fetch('https://playground.devskills.co/api/rest/meal-roulette-app/meals');
      const data = await response.json();
      const extractedMeals = data.meal_roulette_app_meals.map((meal: any) => ({
        id: meal.id,
        title: meal.title,
        picture: meal.picture,
      }));
      setMeals(extractedMeals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const fetchNextMeals = async () => {
    try {
      const response = await fetch('https://playground.devskills.co/api/rest/meal-roulette-app/meals/limit/4/offset/4');
      const data = await response.json();
      const extractedMeals = data.meal_roulette_app_meals_aggregate.nodes.map((node: any) => ({
        id: node.id,
        title: node.title,
        picture: node.picture,
      }));
  
      // Shuffle meals
      const shuffledMeals = shuffleArray(extractedMeals);
      setMeals(shuffledMeals);
    } catch (error) {
      console.error('Error fetching limited meals:', error);
    }
  };
  
  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const navigateToDetails = (mealId: number) => {
    navigation.navigate('MealDetails', { mealId });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        renderItem={({ item }) => <MealItem item={item} onPress={navigateToDetails} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <Button title="Refresh" onPress={fetchNextMeals} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default MealSelectionScreen;