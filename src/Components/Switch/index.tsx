import React, { useState } from 'react';

import { Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';

interface CustomSwitchProps {
  selectionMode: number;
  roundCorner: boolean;
  option1: string;
  option2: string;
  onSelectSwitch: (index: number) => void;
  selectionColor: string;
}

export const CustomSwitch = ({
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
}: CustomSwitchProps) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner] = useState(roundCorner);

  const updatedSwitchData = (index: number) => {
    setSelectionMode(index);
    onSelectSwitch(index);
  };

  return (
    <View>
      <View
        style={{
          height: 40,
          width: 215,
          backgroundColor: colors.theme.primary,
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 0,
          borderColor: colors.theme.secondary,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 0,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode === 1 ? 'white' : selectionColor,
            borderRadius: getRoundCorner ? 25 : 0,
            borderWidth: getSelectionMode === 1 ? 2 : 0,
            borderColor: colors.theme.secondary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode === 1 ? selectionColor : 'white',
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode === 2 ? 'white' : selectionColor,
            borderRadius: getRoundCorner ? 25 : 0,
            borderWidth: getSelectionMode === 2 ? 2 : 0,
            borderColor: colors.theme.secondary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode === 2 ? selectionColor : 'white',
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
