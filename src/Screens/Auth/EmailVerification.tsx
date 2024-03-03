import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { colors } from '../../theme/colors';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParams, EAuthStack } from '../../Types/NavigationTypes';
import { AnimatedBackgroundImage } from '../../Components/AnimatedBackgroundImage';
import { AppButton } from '../../Components/Button';
import { AppInput } from '../../Components/AppInput';
import forgot_child from '../../Assets/images/forgot_child.png';
import { vw } from '../../Utils/units';

type Props = StackScreenProps<AuthStackParams, 'emailVerification'>;

export default function EmailVerification({ navigation }: Props) {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <AnimatedBackgroundImage additionalImage={forgot_child} />
      <View style={[styles.bottomContainer, { flex: 1 }]}>
        <View>
          <View style={styles.heading}>
            <GlroyBold
              text={'Forgot Password ?'}
              _style={{ color: colors.theme.primary, fontSize: vw * 6 }}
            />
          </View>
          <GrayMediumText
            text={
              'Please enter the email address associated with your account below. We will send you a verification code to reset your password.'
            }
            _style={styles.para}
          />
          <View>
            <AppInput
              label="Enter your Email"
              placeholder={'Email'}
              value={email}
              required
              onChange={setEmail}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <AppButton
              title={'Submit'}
              onPress={() => {
                navigation.navigate(EAuthStack.verificaionCode, {
                  email: '',
                });
              }}
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
