import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StatusBar, StyleSheet, View } from 'react-native';
import forgot_child from '../../Assets/images/forgot_child.png';
import { AnimatedBackgroundImage } from '../../Components/AnimatedBackgroundImage';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { asyncEmailVerification } from '../../Stores/actions/user.action';
import { useAppDispatch } from '../../Stores/hooks';
import { colors } from '../../Theme/colors';
import { AuthStackParams, EAuthStack } from '../../Types/NavigationTypes';
import { EmailVerificationPayload } from '../../Types/User';
import { vh, vw } from '../../Utils/units';

type Props = StackScreenProps<AuthStackParams, 'emailVerification'>;

export default function EmailVerification({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationPayload>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = useCallback(
    async (body: EmailVerificationPayload) => {
      const res = await dispatch(asyncEmailVerification({ email: body?.email?.toLowerCase() })).unwrap();

      if (res?.data?.encodedEmail) {
        navigation.navigate(EAuthStack.verificaionCode, {
          email: body?.email?.toLowerCase(),
        });
      }
    },
    [navigation, dispatch]
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <AnimatedBackgroundImage additionalImage={forgot_child} />
      <View style={[styles.bottomContainer, { flex: 1 }]}>
        <View style={styles.heading}>
          <GlroyBold
            text={'Forgot Password ?'}
            _style={{ color: colors.theme.primary, fontSize: vh * 2.8 }}
          />
        </View>
        <GrayMediumText
          text={
            'Please enter the email address associated with your account below. We will send you a verification code to reset your password.'
          }
          _style={styles.para}
        />
        <View style={{ width: '100%' }}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email format is Invalid',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Enter Address"
                placeholder="Email your email"
                value={value}
                required
                onChange={onChange}
              />
            )}
          />
          {errors.email?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.email.message}
            />
          )}
        </View>
        <View style={{ alignItems: 'center' }}>
          <AppButton
            title={'Submit'}
            btnStyle={styles.submitBtn}
            onPress={handleSubmit(onSubmit)}
          />
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
    paddingVertical: vh * 2.63, // 20
    paddingHorizontal: vw * 5.56 // 20
  },
  para: {
    textAlign: 'center',
    marginTop: vh * 1.97, // 15
    lineHeight: 22,
  },
  heading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    marginVertical: vh * 1.32 // 10
  }
});
