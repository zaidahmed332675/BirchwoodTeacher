import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import GlroyBold from '../../Components/GlroyBoldText';
import GrayMediumText from '../../Components/GrayMediumText';
import { colors } from '../../theme/colors';
import { AuthStackParams, EAuthStack } from '../../Types/NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';
import AppInput from '../../Components/AppInput';
import AppButton from '../../Components/Button';
import reset_pass_child from '../../Assets/images/reset_pass_child.png';
import AnimatedBackgroundImage from '../../Components/AnimatedBackgroundImage';

type Props = StackScreenProps<AuthStackParams, 'resetPassword'>;

export default function ResetPassword({ navigation }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AnimatedBackgroundImage additionalImage={reset_pass_child} />

      <View style={[styles.bottomContainer, { flex: 1.3 }]}>
        <View>
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
            <AppInput
              label="Password"
              placeholder={'password'}
              value={password}
              required
              onChange={setPassword}
              isPassword
            />
            <AppInput
              label="Confirm New Password"
              placeholder={'confirm new password'}
              value={confirmPassword}
              required
              onChange={setConfirmPassword}
              isPassword
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <AppButton
              bordered
              title={'Reset'}
              onPress={() => navigation.navigate(EAuthStack.signIn)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
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
