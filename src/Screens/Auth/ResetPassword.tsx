import { CommonActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import reset_pass_child from '../../Assets/images/reset_pass_child.png';
import { AnimatedBackgroundImage } from '../../Components/AnimatedBackgroundImage';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { asyncResetPassword } from '../../Stores/actions/user.action';
import { useAppDispatch } from '../../Stores/hooks';
import { colors } from '../../Theme/colors';
import { AuthStackParams, ERootStack } from '../../Types/NavigationTypes';
import { ResetPasswordPayload } from '../../Types/User';
import { vh, vw } from '../../Utils/units';

type Props = StackScreenProps<AuthStackParams, 'resetPassword'>;

export default function ResetPassword({ navigation, route }: Props) {
  const dispatch = useAppDispatch();
  let data = route.params;

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<ResetPasswordPayload>({
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (data.email && data.code) {
      setValue('email', data.email);
      setValue('code', data.code);
    }
  }, [data.email, data.code, setValue]);

  const onSubmit = useCallback(
    async (body: ResetPasswordPayload) => {
      const res = await dispatch(asyncResetPassword(body)).unwrap();

      if (res.status) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: ERootStack.auth }],
          })
        );
      }
    },
    [navigation, dispatch]
  );

  return (
    <View style={styles.container}>
      <AnimatedBackgroundImage additionalImage={reset_pass_child} />
      <View style={[styles.bottomContainer, { flex: 1 }]}>
        <View style={styles.heading}>
          <GlroyBold
            text={'Reset Password ?'}
            _style={{ color: colors.theme.primary, fontSize: vh * 2.8 }}
          />
        </View>
        <GrayMediumText
          text={
            'Please enter a new password for your account below. Make sure it is strong and secure.'
          }
          _style={styles.para}
        />
        <View style={{ width: '100%' }}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 8,
                message: 'Password must be minimum 8 characters',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Password"
                placeholder={'Enter password'}
                value={value}
                required
                onChange={onChange}
                isPassword
              />
            )}
          />

          {errors.password?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.password.message}
            />
          )}

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Confirm Password is required',
              },
              validate: {
                matchesPreviousPassword: value => {
                  const { password } = getValues();
                  return (
                    (value && password === value) || 'Passwords do not match'
                  );
                },
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Confirm New Password"
                placeholder={'Enter password to confirm'}
                value={value}
                required
                onChange={onChange}
                isPassword
              />
            )}
          />

          {errors.confirmPassword?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.confirmPassword.message}
            />
          )}
        </View>
        <View style={{ alignItems: 'center' }}>
          <AppButton
            title={'Reset'}
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
