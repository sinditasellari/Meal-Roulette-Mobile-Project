import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MealSelectionScreen from '../../screens/MealSelectionScreen';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        meal_roulette_app_meals: [
          {
            id: 1,
            title: 'Chorizo & mozzarella gnocchi bake',
          },
          {
            id: 2,
            title: 'Easy butter chicken',
          },
        ],
      }),
  })
);

describe('MealSelectionScreen component', () => {
  it('fetches initial meals from the API', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <MealSelectionScreen />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Chorizo & mozzarella gnocchi bake')).toBeTruthy();
      expect(getByText('Easy butter chicken')).toBeTruthy();
    });
  });
});