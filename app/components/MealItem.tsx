import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, ViewStyle, ImageStyle } from 'react-native';

interface Props {
  item: {
    id: number;
    title: string;
    picture: string;
  };
  onPress?: (mealId: number) => void;
  imageStyle?: ImageStyle;
}

const MealItem: React.FC<Props> = ({ item, onPress = () => {}, imageStyle }) => (
    <TouchableOpacity onPress={() => onPress(item.id)} style={styles.mealItem} testID="mealItem">
    <Image 
      source={{ uri: item.picture }} 
      style={[styles.mealImage, imageStyle]} 
    />
    <Text>{item.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  mealItem: {
    width: '46%',
    marginBottom: 20,
    marginRight: '4%',
    alignItems: 'center',
  },
  mealImage: {
    width: 180,
    height: 200,
    borderRadius: 10,
  },
});

export default MealItem;