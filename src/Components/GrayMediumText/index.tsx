import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { colors } from '../../apptheme/colors';

interface GrayMediumTextProps {
  text: any;
  _style?: StyleProp<TextStyle>;
}

export const GrayMediumText = ({ text, _style }: GrayMediumTextProps) => {
  return <Text style={[styles.text, _style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.grey,
  },
});
