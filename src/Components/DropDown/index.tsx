import React, { useCallback } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';

interface DropDownCustomProps {
  items: ItemType<ValueType>[];
  label: string;
  badge?: boolean;
  required?: boolean;
  starColor?: string;
  mainContainer_style: any;
  placeholderStyle?: Record<string, any>;
}

export const DropDown = ({
  // placeholder,
  items,
  // setValue,
  // value,
  // min,
  // max,
  // searchable,
  multiple = false,
  // disabled,
  // multipleText,
  // open,
  // setOpen,
  mainContainer_style,
  // labelStyle,
  listMode = 'DEFAULT',
  placeholderStyle,
  // setItems,
  badge = false,
  label,
  required = false,
  starColor,
  ...restProps
}: DropDownPickerProps<ValueType> & DropDownCustomProps) => {
  const ArrowUpIconComponent = useCallback(
    (props: { style: StyleProp<ViewStyle> }) => (
      <Ionicon
        name="chevron-up"
        size={20}
        color={colors.text.altGrey}
        {...props}
      />
    ),
    []
  );

  const ArrowDownIconComponent = useCallback(
    (props: { style: StyleProp<ViewStyle> }) => (
      <Ionicon
        name="chevron-down"
        size={20}
        color={colors.text.altGrey}
        {...props}
      />
    ),
    []
  );

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={[styles.labelStyle]}>
        {label}{' '}
        {required && <Text style={{ color: starColor || 'red' }}>*</Text>}
      </Text>
      <DropDownPicker
        {...restProps}
        items={items}
        // value={value}
        // placeholder={placeholder}
        containerStyle={{ borderRadius: 10 }}
        style={[styles.mainContainer_style, mainContainer_style]}
        // multipleText={multipleText}
        // open={open}
        // setOpen={setOpen}
        // setValue={setValue}
        // disabled={disabled}
        // searchable={searchable}
        // setItems={multiple ? setItems : undefined}
        multiple={multiple}
        // labelStyle={labelStyle ? labelStyle : null}
        listMode={listMode}
        placeholderStyle={[styles.placeholder, placeholderStyle]}
        dropDownContainerStyle={{
          borderColor: colors.input.background,
        }}
        mode={badge ? 'BADGE' : 'SIMPLE'}
        disabledItemLabelStyle={{
          opacity: 0.5,
        }}
        disabledStyle={{
          opacity: 0.5,
        }}
        ArrowDownIconComponent={ArrowDownIconComponent}
        ArrowUpIconComponent={ArrowUpIconComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    color: colors.text.altGrey,
  },
  mainContainer_style: {
    borderWidth: 1.5,
    borderColor: colors.input.background,
    borderRadius: 10,
    paddingHorizontal: 7,
    color: colors.text.grey,
    backgroundColor: colors.input.background,
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text.altGrey,
  },
});
