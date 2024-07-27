import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, ScrollView, Text } from 'react-native';
import MealItem from '../components/MealItem'; 

interface Meal {
  id: number;
  title: string;
  description: string;
  picture: string;
  ingredients: string;
}

const MealDetailsScreen: React.FC<{ route: any; navigation: any }> = ({ route , navigation }) => {
  const { mealId } = route.params;
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    fetchMeal();
  }, []);

  const fetchMeal = async () => {
    try {
      const response = await fetch(`https://playground.devskills.co/api/rest/meal-roulette-app/meals/${mealId}`);
      const data = await response.json();
      const mealData: Meal = {
        id: data.meal_roulette_app_meals_by_pk.id,
        title: data.meal_roulette_app_meals_by_pk.title,
        description: data.meal_roulette_app_meals_by_pk.description,
        picture: data.meal_roulette_app_meals_by_pk.picture,
        ingredients: data.meal_roulette_app_meals_by_pk.ingredients,
      };
      setMeal(mealData);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  const navigateBack = () => {
    navigation.navigate('MealSelection');
  };

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const ingredientsArray = meal.ingredients.split(',');

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <MealItem 
          item={{ id: meal.id, title: meal.title, picture: meal.picture }} 
          onPress={() => {}} 
          imageStyle={{ width: 300, height: 250 }} 
        />
        <Text style={styles.description}>Description: {meal.description}</Text>
        <Text style={[styles.ingredientsTitle, styles.description]}>Ingredients:</Text>
        {ingredientsArray.map((ingredient, index) => (
          <Text key={index} style={[styles.ingredient, styles.description]}>{ingredient.trim()}</Text>
        ))}
        <Button title="Back" onPress={navigateBack} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
  },
  ingredientsTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredient: {
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default MealDetailsScreen;