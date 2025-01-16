import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import lodash from 'lodash';
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
import { vh, vw } from '../../Utils/units';
import { colors } from '../../Theme/colors';
import { LeavePayload } from '../../types/User';
import { AppDatePicker } from '../AppDatePicker';
import { AppSelect } from '../AppSelect';
import { DropDown } from '../DropDown';

export const LeaveForm = ({ }) => {
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
            _style={{ color: colors.theme.primary, fontSize: vh * 2.8 }}
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
            render={({ field: { value, onChange } }) => (
              <DropDown
                label="Leave Type"
                placeholder='Please select'
                required={true}
                items={Array.from(Object.keys(leaveTypeEnum ?? {}), key => ({
                  label: lodash.capitalize(key),
                  value: key,
                }))}
                value={value}
                setValue={_ => onChange(_(value))}
                multiple={false}
                open={true}
                setOpen={() => { }}
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
              text={errors.leaveFrom.message}
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
              text={errors.leaveTo.message}
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
            btnStyle={styles.submitBtn}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: vw * 2.78, // 10
    paddingVertical: vh * 3.95, // 30
  },
  para: {
    textAlign: 'center',
    lineHeight: 22,
  },
  heading: {
    marginVertical: vh * 1.97, // 15
    alignItems: 'center',
  },
  submitBtn: {
    marginVertical: vh * 1.32 // 10
  }
});
