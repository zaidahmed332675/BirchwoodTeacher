import { StatusBar, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import GlroyBold from '../../Components/GlroyBoldText';
import GrayMediumText from '../../Components/GrayMediumText';
import { colors } from '../../theme/colors';
import { AuthStackParams, EAuthStack } from '../../Types/NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';
import AnimatedBackgroundImage from '../../Components/AnimatedBackgroundImage';
import verification_child from '../../Assets/images/verification_child.png';
import AppButton from '../../Components/Button';
import AppInput from '../../Components/AppInput';
import { vw } from '../../Utils/units';

type Props = StackScreenProps<AuthStackParams, 'verificaionCode'>;

export default function VerificationCode({ navigation }: Props) {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <AnimatedBackgroundImage additionalImage={verification_child} />
      <View style={[styles.bottomContainer, { flex: 1 }]}>
        <View>
          <View style={styles.heading}>
            <GlroyBold
              text={'Verification Code ?'}
              _style={{ color: colors.theme.primary, fontSize: vw * 6 }}
            />
          </View>
          <GrayMediumText
            text={'Please enter the verification code sent to your email.'}
            _style={styles.para}
          />
          <View>
            <AppInput
              label="Enter your verification code"
              placeholder={'Code'}
              value={email}
              required
              onChange={setEmail}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <AppButton
              title={'Verify'}
              onPress={() =>
                navigation.navigate(EAuthStack.resetPassword, {
                  email: '',
                  code: '',
                })
              }
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
