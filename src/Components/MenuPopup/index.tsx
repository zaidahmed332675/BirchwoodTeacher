import React from 'react';
import { Alert } from 'react-native';
import { Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

interface MenuPopupProps {}

export const MenuPopup = ({ children }: MenuPopupProps) => {
  return (
    <View>
      <Text>Hello world!</Text>
      <Menu>
        <MenuTrigger>{children}</MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => Alert.alert(`Save`)} text="Edit">
            <Text style={{ color: 'red' }}>Edit</Text>
          </MenuOption>
          <MenuOption onSelect={() => Alert.alert(`Delete`)}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};
