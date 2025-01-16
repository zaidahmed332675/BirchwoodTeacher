import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../Theme/colors';
import { vh } from '../../Utils/units';

interface GlroyBoldTextProps {
  text: string;
  _style?: object;
}

export const GlroyBold = ({ text, _style }: GlroyBoldTextProps) => {
  return <Text style={{ ...styles.text, ..._style }}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Glory-Bold',
    fontSize: vh * 2.11, // 16
    fontWeight: 'bold',
    color: colors.text.grey,
  },
});
