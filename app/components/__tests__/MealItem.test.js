import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MealItem from '../MealItem';

describe('MealItem component', () => {
  it('calls onPress function with correct meal id when pressed', () => {
    const onPressMock = jest.fn();
    const item = {
      id: 123,
      title: 'Test Meal',
      picture: 'test.jpg',
    };

    const { getByTestId } = render(
      <MealItem item={item} onPress={onPressMock} />
    );
    fireEvent.press(getByTestId('mealItem'));

    expect(onPressMock).toHaveBeenCalledWith(item.id);
  });
});