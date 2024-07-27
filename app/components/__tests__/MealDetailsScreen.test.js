import React from 'react';
import { render } from '@testing-library/react-native';
import MealDetailsScreen from '../../screens/MealDetailsScreen';

describe('MealDetailsScreen component', () => {
  test('renders loading message when meal data is not available', () => {
    const { getByText } = render(<MealDetailsScreen route={{ params: { mealId: 123 } }} navigation={{ navigate: jest.fn() }} />);
    const loadingText = getByText('Loading...');
    expect(loadingText).toBeTruthy();
  });
});
