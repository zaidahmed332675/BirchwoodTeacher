import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import GlroyBold from '../../Components/GlroyBoldText';
import GrayMediumText from '../../Components/GrayMediumText';
import CustomTextInput from '../../Components/InputField';
import CustomButton from '../../Components/Button';
import { colors } from '../../theme/colors';
import { AuthStackParams } from '../../Types/NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<AuthStackParams, 'resetPassword'>;

export default function ResetPassword({ handleScreen }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <View style={styles.contanier}>
      <View style={styles.heading}>
        <GlroyBold
          text={'Reset Password?'}
          _style={{ color: colors.text.black }}
        />
      </View>
      <GrayMediumText
        text={
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        }
        _style={styles.para}
      />
      <View>
        <CustomTextInput
          label="Password"
          placeholder={'password'}
          value={password}
          required
          onChangeText={setPassword}
          password={true}
        />
        <CustomTextInput
          label="Confirm New Password"
          placeholder={'confirm new password'}
          value={confirmPassword}
          required
          onChangeText={setConfirmPassword}
          password={true}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <CustomButton
          isFocused={true}
          title={'Nex'}
          onPress={() => handleScreen(2)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  para: {
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
