import { CommonActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { store } from '../../Stores';
import {
  asyncChangePassword,
  asyncSignOut,
} from '../../Stores/actions/user.action';
import { useAppDispatch } from '../../Stores/hooks';
import { MainStackParams } from '../../Types/NavigationTypes';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import { ChangePasswordPayload } from '../../types/User';

type Props = StackScreenProps<MainStackParams, 'changePassword'>;

function ChangePassword({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ChangePasswordPayload>({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = useCallback(
    async (body: ChangePasswordPayload) => {
      const res = await dispatch(asyncChangePassword(body)).unwrap();

      if (res.status) {
        await store.dispatch(asyncSignOut()).unwrap();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'auth' }],
          })
        );
      }
    },
    [navigation, dispatch]
  );

  return (
    <Layout customHeader={<CustomHeader title="Change Password" />}>
      <View style={styles.heading}>
        <GlroyBold
          text={'Change Password ?'}
          _style={{ color: colors.theme.primary, fontSize: vw * 6 }}
        />
      </View>
      <GrayMediumText
        text={
          'Please enter a new password for your account below. Make sure it is strong and secure.'
        }
        _style={styles.para}
      />
      <View>
        <Controller
          name="old_password"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Current password is required',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <AppInput
              label="Current Password"
              placeholder="Enter current password"
              value={value}
              required
              onChange={onChange}
              isPassword
            />
          )}
        />

        {errors.old_password?.message && (
          <GrayMediumText
            text={errors.old_password.message}
            _style={{ color: colors.theme.lightRed }}
          />
        )}

        <Controller
          name="new_password"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'New password is required',
            },
            minLength: {
              value: 8,
              message: 'Password must be minimum 8 characters',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <AppInput
              label="New password"
              placeholder="Enter new password"
              value={value}
              required
              onChange={onChange}
              isPassword
            />
          )}
        />

        {errors.new_password?.message && (
          <GrayMediumText
            text={errors.new_password.message}
            _style={{ color: colors.theme.lightRed }}
          />
        )}

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Confirm password is required',
            },
            validate: {
              matchesPreviousPassword: value => {
                const { new_password } = getValues();
                return (
                  (value && new_password === value) || 'Passwords do not match'
                );
              },
            },
          }}
          render={({ field: { onChange, value } }) => (
            <AppInput
              label="Confirm Password"
              placeholder="Confirm New Password"
              value={value}
              required
              onChange={onChange}
              isPassword
            />
          )}
        />

        {errors.confirmPassword?.message && (
          <GrayMediumText
            text={errors.confirmPassword.message}
            _style={{ color: colors.theme.lightRed }}
          />
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <AppButton
          title="Update"
          btnStyle={{
            marginVertical: 10,
          }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  para: {
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  heading: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChangePassword;
