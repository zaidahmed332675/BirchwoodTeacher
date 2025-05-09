import React, { useState } from 'react';

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../Theme/colors';

interface CustomSwitchProps {
  selectionMode: number;
  roundCorner: boolean;
  options: string[];
  onSelectSwitch: (index: number) => void;
  selectionColor: string;
}

export const CustomSwitch = ({
  selectionMode,
  roundCorner,
  options = ['All', 'Class', 'Child'],
  onSelectSwitch,
  selectionColor,
}: CustomSwitchProps) => {

  return (
    <View
      style={[styles.container, { borderRadius: roundCorner ? 25 : 0 }]}>
      {
        options.map((option, index) => {
          return <TouchableOpacity key={option}
            activeOpacity={1}
            onPress={() => onSelectSwitch(index)}
            style={{
              flex: 1,
              backgroundColor: selectionMode === index ? 'white' : selectionColor,
              borderRadius: roundCorner ? 25 : 0,
              borderWidth: selectionMode === index ? 2 : 0,
              borderColor: colors.theme.secondary,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: selectionMode === index ? selectionColor : 'white',
              }}>
              {option}
            </Text>
          </TouchableOpacity>
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 40,
    maxWidth: '80%',
    backgroundColor: colors.theme.secondary,
    borderWidth: 0,
    borderColor: colors.theme.secondary,
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 0,
  }
})