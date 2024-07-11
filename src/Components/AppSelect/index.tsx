import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { colors } from '../../theme/colors';
import { VIcon } from '../VIcon';

interface AppSelectProps {
  data: any[];
  defaultValue?: string;
  label?: string;
  icon?: string;
  placeholder?: string;
  style?: object;
  selectStyle?: object;
  buttonTextStyle?: object;
  required?: boolean;
  onSelect: (selectedItem: any, index: number) => void;
}

export const AppSelect = ({
  data,
  onSelect,
  label,
  placeholder = 'Please Select',
  defaultValue = '',
  required = true,
  style,
  ...rest
}: AppSelectProps) => {
  return (
    <View style={[styles.appInput, style]}>
      <Text style={styles.labelStyle}>
        {label} {required && <Text style={{ color: 'red' }}>*</Text>}
      </Text>
      <View style={styles.inputView}>
        <SelectDropdown
          {...rest}
          defaultValue={defaultValue}
          data={data}
          onSelect={onSelect}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text
                  style={[
                    styles.dropdownButtonTxtStyle,
                    selectedItem &&
                    selectedItem.title && { color: colors.theme.black },
                  ]}>
                  {(selectedItem && selectedItem.title) || placeholder}
                </Text>
                <VIcon
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  style={styles.dropdownButtonArrowStyle}
                  type="MaterialCommunityIcons"
                />
              </View>
            );
          }}
          renderItem={(item, key, isSelected) => {
            return (
              <View
                key={key}
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && {
                    backgroundColor: colors.theme.secondary,
                  }),
                }}>
                <Text
                  style={[
                    styles.dropdownItemTxtStyle,
                    isSelected && { color: colors.theme.white },
                  ]}>
                  {item.title}
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
          statusBarTranslucent
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appInput: {
    marginVertical: 10,
    width: '100%',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.input.background,
  },
  dropdownButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 12,
    color: colors.text.altGrey,
  },
  dropdownButtonArrowStyle: {
    fontSize: 22,
    color: colors.text.altGrey,
  },
  dropdownMenuStyle: {
    marginTop: 15,
    backgroundColor: colors.input.background,
    borderRadius: 10,
  },
  dropdownItemStyle: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    color: colors.theme.greyAlt2,
  },
  labelStyle: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.text.altGrey,
  },
});
