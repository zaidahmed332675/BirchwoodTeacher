import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { colors } from '../../Theme/colors';
import { vh } from '../../Utils/units';

interface GrayMediumTextProps {
  text: any;
  _style?: StyleProp<TextStyle>;
}

export const GrayMediumText = ({ text, _style }: GrayMediumTextProps) => {
  return <Text style={[styles.text, _style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: vh * 1.84, // 14
    fontWeight: 'bold',
    color: colors.text.grey,
  },
});
