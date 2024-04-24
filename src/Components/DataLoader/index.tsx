import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GrayMediumText } from '../GrayMediumText';

export const DataLoader = ({ text = 'Loading Data...!' }) => {
  return (
    <View style={styles.noItem}>
      <GrayMediumText _style={styles.noItemText} text={text} />
    </View>
  );
};

const styles = StyleSheet.create({
  noItem: {
    alignItems: 'center',
  },
  noItemText: {
    fontSize: 22,
    marginVertical: 40,
  },
});
