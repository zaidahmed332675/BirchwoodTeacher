import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';

interface GrayMediumTextProps {
  text: string;
  _style?: object;
}

const GrayMediumText = ({ text, _style }: GrayMediumTextProps) => {
  return <Text style={{ ...styles.text, ..._style }}>{text}</Text>;
};

export { GrayMediumText };

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text.grey,
  },
});
