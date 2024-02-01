import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../theme/colors';

interface GlroyBoldTextProps {
  text: string;
  _style?: object;
}

const GlroyBold = ({ text, _style }: GlroyBoldTextProps) => {
  return <Text style={{ ...styles.text, ..._style }}>{text}</Text>;
};

export default GlroyBold;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Glory-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.grey,
  },
});
