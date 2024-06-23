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
import { ERootStack, MainStackParams } from '../../Types/NavigationTypes';
import { leaveTypeEnum } from '../../Utils/options';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import { LeavePayload } from '../../types/User';
import { AppDatePicker } from '../AppDatePicker';
import { AppSelect } from '../AppSelect';

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
      leaveFrom: '',
      leaveTo: '',
      leaveType: '',
      leaveReason: '',
    },
  });

  const onSubmit = useCallback(
    async (body: LeavePayload) => {
      await dispatch(asyncUserLeave(body)).unwrap();
    },
    [dispatch]
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
            render={({ field: { onChange } }) => (
              <AppSelect
                data={Array.from(Object.keys(leaveTypeEnum ?? {}), key => ({
                  title: key.slice(0, 1) + key.slice(1).toLowerCase(),
                  value: key,
                }))}
                label="Leave Type"
                onSelect={item => onChange(item.value)}
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
            name="leaveFrom"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'From is required',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppDatePicker
                label="Leave From"
                onChange={onChange}
                value={value}
              />
            )}
          />

          {errors.leaveFrom?.message && (
            <GrayMediumText
              _style={{ color: colors.theme.lightRed }}
              text={errors.startDate.message}
            />
          )}

          <Controller
            name="leaveTo"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'To is required',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <AppDatePicker
                label="Leave To"
                onChange={onChange}
                value={value}
              />
            )}
          />

          {errors.leaveTo?.message && (
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
                label="Leave Reason"
                placeholder="Enter Your Reason"
                required
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
    paddingVertical: 30,
  },
  para: {
    textAlign: 'center',
    lineHeight: 22,
  },
  heading: {
    marginVertical: 15,
    alignItems: 'center',
  },
});
