import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../apptheme/colors';
import { GrayMediumText } from '../GrayMediumText';

export interface NotFoundProps {
  text: string;
  _containerStyle?: {},
  _textStyle?: {}
}

export const NotFound = ({ text = 'No Items are available', _containerStyle, _textStyle }: NotFoundProps) => {
  return (
    <View style={[styles.container, _containerStyle]}>
      <GrayMediumText _style={[styles.text, _textStyle]} text={text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: '100%'
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    color: colors.theme.primary
  },
});
