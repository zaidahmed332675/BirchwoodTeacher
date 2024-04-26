import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';
import { colors } from '../../theme/colors';
import { vh } from '../../Utils/units';
import { VIcon } from '../VIcon';

interface AppInputProps {
  label: string;
  placeholder: string;
  placeholderSize?: Number;
  value: string;
  required?: boolean;
  isPassword?: boolean;
  isMultiple?: boolean;
  onChange: (value: string) => void;
  inputStyle?: object;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
}

export const AppInput = ({
  label,
  placeholder,
  placeholderSize,
  value,
  required = false,
  isPassword = false,
  isMultiple = false,
  onChange,
  inputStyle,
  numberOfLines = 1,
  keyboardType = 'default',
}: AppInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.labelStyle}>
        {label} {required && <Text style={{ color: 'red' }}>*</Text>}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          keyboardType={keyboardType}
          multiline={isMultiple}
          numberOfLines={numberOfLines}
          placeholder={placeholder}
          style={[
            styles.textInputField,
            {
              fontSize: placeholderSize || 12,
              height: isMultiple ? vh * 15 : 40,
            },
            inputStyle,
          ]}
          placeholderTextColor={colors.text.altGrey}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onChange}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(prev => !prev)}
            style={{ position: 'absolute', right: 10 }}>
            <VIcon
              type="Ionicons"
              name={secureTextEntry ? 'eye' : 'eye-off'}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputField: {
    borderWidth: 1.5,
    borderColor: colors.input.background,
    color: colors.text.black,
    backgroundColor: colors.input.background,
    borderRadius: 10,
    paddingHorizontal: 7,
    flex: 1,
  },
  labelStyle: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.text.altGrey,
  },
});
