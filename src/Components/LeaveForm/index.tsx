import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { asyncUserLeave } from '../../Stores/actions/user.action';
import { useAppDispatch } from '../../Stores/hooks';
import {
  EMainStack,
  ERootStack,
  MainStackParams,
} from '../../Types/NavigationTypes';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import { LeavePayload } from '../../types/User';

export const LeaveForm = ({}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MainStackParams>>();

  const resetNavigation = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ERootStack.main }],
      })
    );
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      resetNavigation();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [resetNavigation]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LeavePayload>({
    defaultValues: {
      leaveType: '',
      leaveReason: '',
      startDate: '',
      endDate: '',
    },
  });

  const onSubmit = useCallback(
    async (body: LeavePayload) => {
      const res = await dispatch(asyncUserLeave(body)).unwrap();
      if (res) {
        navigation.navigate(EMainStack.home);
      }
    },
    [navigation, dispatch]
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <GlroyBold
            text={'Applying for a Leave ?'}
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
            name="leaveType"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Leave Type is required',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Leave Type"
                placeholder="Select Leave Type"
                value={value}
                onChange={onChange}
              />
            )}
          />

          {errors.leaveType?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.leaveType.message}
            />
          )}

          <Controller
            name="startDate"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Start Date is required',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Start Date"
                placeholder="Select Start Date"
                value={value}
                onChange={onChange}
              />
            )}
          />

          {errors.startDate?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.startDate.message}
            />
          )}

          <Controller
            name="endDate"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'End date is required',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="End Date"
                placeholder="Select End Date"
                value={value}
                onChange={onChange}
              />
            )}
          />

          {errors.endDate?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.endDate.message}
            />
          )}

          <Controller
            name="leaveReason"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Leave reason is required',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppInput
                label="Reason"
                placeholder="Enter Your Reason"
                value={value}
                onChange={onChange}
                isMultiple={true}
                numberOfLines={4}
                inputStyle={{
                  textAlignVertical: 'top',
                }}
              />
            )}
          />

          {errors.leaveReason?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.leaveReason.message}
            />
          )}
        </View>
        <View style={{ alignItems: 'center' }}>
          <AppButton
            title="Apply"
            btnStyle={{
              marginVertical: 10,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  para: {
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  heading: {
    alignItems: 'center',
  },
});
