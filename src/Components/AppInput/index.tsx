import React, { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from 'react-native';
import { vh, vw } from '../../Utils/units';
import { colors } from '../../Theme/colors';
import { VIcon } from '../VIcon';

interface AppInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  placeholderSize?: Number;
  value: string;
  required?: boolean;
  isPassword?: boolean;
  isMultiple?: boolean;
  // onChange: (value: string) => void;
  inputStyle?: object;
  numberOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  _containerStyle?: object;
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
  _containerStyle = {},
  ...props
}: AppInputProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  return (
    <View style={[styles.container, _containerStyle]}>
      {label && <Text style={styles.labelStyle}>
        {label} {required && <Text style={{ color: 'red' }}>*</Text>}
      </Text>}
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          multiline={isMultiple}
          numberOfLines={numberOfLines}
          placeholder={placeholder}
          style={[
            styles.textInputField,
            {
              fontSize: placeholderSize || vh * 1.58, // 12
              height: isMultiple ? vh * 15 : vh * 5.26 // 40
            },
            inputStyle,
          ]}
          placeholderTextColor={colors.text.altGrey}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onChange}
          {...props}
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
  container: {
    marginVertical: vh * 1.32, // 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInputField: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.input.background,
    color: colors.text.black,
    backgroundColor: colors.input.background,
    borderRadius: 10,
    paddingHorizontal: vw * 1.94, // 7
  },
  labelStyle: {
    fontSize: vh * 1.58, // 12
    marginBottom: vh * 0.66, // 5
    fontWeight: 'bold',
    color: colors.text.altGrey,
  },
});
