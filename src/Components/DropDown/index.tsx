import React, { useCallback, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import { colors } from '../../apptheme/colors';
import { VIcon } from '../VIcon';

interface DropDownCustomProps {
  items: ItemType<ValueType>[];
  label: string;
  value: ValueType;
  multiple: true | false;
  badge?: boolean;
  required?: boolean;
  starColor?: string;
  mainContainer_style?: object;
  placeholderStyle?: Record<string, any>;
}

export const DropDown = ({
  label,
  placeholder,
  required = false,
  items,
  value,
  setValue,
  mainContainer_style,
  multiple = false,
  starColor,
  placeholderStyle,
  searchable = false,
  badge = false,
  disabled = false,
  // min,
  // max,
  // multipleText,
  // labelStyle,
  // setItems,
}: DropDownPickerProps<ValueType> & DropDownCustomProps) => {

  const [open, setOpen] = useState(false);

  const ArrowUpIconComponent = useCallback(
    (props: { style: StyleProp<ViewStyle> }) => (
      <VIcon
        {...props}
        name={'chevron-up'}
        style={styles.dropdownButtonArrowStyle}
        type="MaterialCommunityIcons"
      />
    ),
    []
  );

  const ArrowDownIconComponent = useCallback(
    (props: { style: StyleProp<ViewStyle> }) => (
      <VIcon
        {...props}
        name={'chevron-down'}
        style={styles.dropdownButtonArrowStyle}
        type="MaterialCommunityIcons"
      />
    ),
    []
  );

  // console.log(items, 'items is here')

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={[styles.labelStyle]}>
        {label} {required && <Text style={{ color: starColor || 'red' }}>*</Text>}
      </Text>
      <DropDownPicker
        items={items}
        open={open}
        mode={badge ? 'BADGE' : 'SIMPLE'}
        listMode='SCROLLVIEW'
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        multiple={false}
        disabled={disabled}
        style={[styles.mainContainer_style, mainContainer_style, { zIndex: 9999 }]}
        placeholder={placeholder}
        placeholderStyle={[styles.placeholder, placeholderStyle]}
        searchable={searchable}
        textStyle={styles.textStyle}
        dropDownContainerStyle={{
          borderColor: colors.input.background,
        }}
        disabledItemLabelStyle={{
          opacity: 0.5,
        }}
        disabledStyle={{
          opacity: 0.5,
        }}
        ArrowDownIconComponent={ArrowDownIconComponent}
        ArrowUpIconComponent={ArrowUpIconComponent}
        dropDownDirection='BOTTOM'
      // multipleText={multipleText}
      // setItems={multiple ? setItems : undefined}
      // labelStyle={labelStyle ? labelStyle : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer_style: {
    // paddingVertical: 0,
    paddingHorizontal: 7,
    color: colors.text.grey,
    borderWidth: 1.5,
    borderColor: colors.input.background,
    borderRadius: 10,
    backgroundColor: colors.input.background,
  },
  placeholder: {
    color: colors.text.altGrey,
    fontSize: 12,
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text.altGrey,
  },
  textStyle: {
    fontSize: 12,
    color: colors.theme.black
  },
  dropdownButtonArrowStyle: {
    fontSize: 22,
    color: colors.text.altGrey,
  },
});
