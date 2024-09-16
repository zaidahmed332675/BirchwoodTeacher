import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import verification_child from '../../Assets/images/verification_child.png';
import { AnimatedBackgroundImage } from '../../Components/AnimatedBackgroundImage';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { asyncOtpVerification } from '../../Stores/actions/user.action';
import { useAppDispatch } from '../../Stores/hooks';
import { colors } from '../../Theme/colors';
import { AuthStackParams, EAuthStack } from '../../Types/NavigationTypes';
import { OtpVerificationPayload } from '../../Types/User';
import { vw } from '../../Utils/units';

type Props = StackScreenProps<AuthStackParams, 'verificaionCode'>;

export default function VerificationCode({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  let data = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OtpVerificationPayload>({
    defaultValues: {
      email: '',
      code: '',
    },
  });

  useEffect(() => {
    if (data?.email) {
      setValue('email', data.email);
    }
  }, [data?.email, setValue]);

  const onSubmit = useCallback(
    async (body: OtpVerificationPayload) => {
      const res = await dispatch(asyncOtpVerification(body)).unwrap();

      if (res.status) {
        navigation.navigate(EAuthStack.resetPassword, {
          email: body.email,
          code: body.code,
        });
      }
    },
    [navigation, dispatch]
  );

  return (
    <View style={styles.container}>
      <AnimatedBackgroundImage additionalImage={verification_child} />
      <View style={[styles.bottomContainer, { flex: 1 }]}>
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
        <View style={{ width: '100%' }}>
          <Controller
            name="code"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Otp is required',
              },
              minLength: {
                value: 4,
                message: 'Otp is incomplete',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Enter your verification code"
                placeholder={'Code'}
                value={value}
                required
                onChange={onChange}
                keyboardType="number-pad"
              />
            )}
          />

          {errors.code?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.code.message}
            />
          )}
        </View>
        <View style={{ alignItems: 'center' }}>
          <AppButton
            title={'Verify'}
            btnStyle={{
              marginVertical: 10,
            }}
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
    padding: 20,
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
