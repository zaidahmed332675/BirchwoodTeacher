import { format, isValid } from 'date-fns';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { colors } from '../../apptheme/colors';

interface AppSelectProps {
  label?: string;
  pickerTitle?: string;
  pickerMode?: 'date' | 'time' | 'datetime';
  dateTimeFormat?: string;
  style?: object;
  required?: boolean;
  onChange: any;
  value: string;
}

export const AppDatePicker = ({
  label,
  pickerTitle = 'Select Date',
  pickerMode = 'date',
  dateTimeFormat = 'eeee, MMMM d, yyyy',
  required = true,
  onChange,
  value,
  style,
}: AppSelectProps) => {
  const [open, setOpen] = useState(false);
  const isValueValid = isValid(value)

  return (
    <View style={[styles.appInput, style]}>
      <Text style={styles.labelStyle}>
        {label} {required && <Text style={{ color: 'red' }}>*</Text>}
      </Text>
      <Pressable onPress={() => setOpen(true)}>
        <View style={styles.inputView}>
          <Text
            style={{
              flex: 1,
              fontSize: 12,
              color: isValueValid
                ? colors.theme.black
                : colors.theme.greyAlt2,
              paddingHorizontal: 7,
            }}>
            {isValueValid
              ? format(value, dateTimeFormat)
              : 'Please Select'}
          </Text>
          <DatePicker
            modal
            mode={pickerMode}
            open={open}
            date={isValueValid ? new Date(value) : new Date()}
            title={pickerTitle}
            onConfirm={selectedDate => {
              console.log(selectedDate, 'checko')
              onChange(selectedDate);
              setOpen(false);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </Pressable>
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
