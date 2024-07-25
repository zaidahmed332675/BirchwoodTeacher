import { StackScreenProps } from '@react-navigation/stack';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppDatePicker } from '../../Components/AppDatePicker';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { VIcon } from '../../Components/VIcon';
import { asyncShowError } from '../../Stores/actions/common.action';
import { asyncUpdateExperience } from '../../Stores/actions/user.action';
import { useAppDispatch, useAppSelector } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { ProfileStackParams } from '../../Types/NavigationTypes';
import { isArrayOfObjectsEqual } from '../../Utils/options';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<ProfileStackParams, 'editExperience'>;

export default function EditExperience({}: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserProfile);

  const initObj = useMemo(
    () => ({
      officeName: '',
      designation: '',
      startingDate: '',
      endingDate: '',
    }),
    []
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exp',
  });

  useEffect(() => {
    if (user?.employment?.length) {
      setValue('exp.0.instituteName', 'testing institute by zaid');
    } else {
      !fields.length && append(initObj);
    }
  }, [append, fields.length, initObj, setValue, user?.employment?.length]);

  const onSubmit = useCallback(
    async (data: any) => {
      if (isArrayOfObjectsEqual(user.education, data, _.keys(initObj))) {
        return dispatch(asyncShowError('No changes have been made!'));
      } else {
        await dispatch(asyncUpdateExperience(data.edu)).unwrap();
      }
    },
    [dispatch, user, initObj]
  );

  const addExperienceField = () => {
    append(initObj);
  };

  const removeExperienceField = (index: number) => {
    remove(index);
  };

  // console.log(errors, 'errors');

  return (
    <Layout customHeader={<CustomHeader title="Edit Experience" />}>
      <ScrollView>
        <View style={styles.container}>
          {/* Dynamic Fields */}
          <View style={styles.groupContainer}>
            {fields.map((item, index) => (
              <View key={item.id} style={styles.fieldGroup}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <GlroyBold
                    _style={{
                      color: colors.theme.primary,
                      fontSize: 22,
                    }}
                    text={`Employment - 0${index + 1}`}
                  />
                  {fields.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeExperienceField(index)}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.theme.primary,
                        borderRadius: 8,
                        padding: 4,
                      }}>
                      <VIcon
                        type="Ionicons"
                        name="close"
                        size={20}
                        color={colors.theme.white}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <Controller
                  name={`exp.${index}.officeName`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Office name is required',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label="Office Name"
                      placeholder={'Enter office name'}
                      value={value}
                      onChange={onChange}
                      required
                    />
                  )}
                />

                {errors?.exp?.[index]?.officeName?.message && (
                  <GrayMediumText
                    text={errors?.exp?.[index]?.officeName.message}
                    _style={{ color: colors.theme.lightRed }}
                  />
                )}

                <Controller
                  name={`exp.${index}.designation`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Designation name is required',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label="Designation Name"
                      placeholder={'Enter designation name'}
                      value={value}
                      onChange={onChange}
                      required
                    />
                  )}
                />

                {errors?.exp?.[index]?.designation?.message && (
                  <GrayMediumText
                    text={errors?.exp?.[index]?.designation.message}
                    _style={{ color: colors.theme.lightRed }}
                  />
                )}

                <Controller
                  name={`exp.${index}.startingDate`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Start date is required',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <AppDatePicker
                      label="Start Date"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />

                {errors?.exp?.[index]?.startingDate?.message && (
                  <GrayMediumText
                    text={errors?.exp?.[index]?.startingDate.message}
                    _style={{ color: colors.theme.lightRed }}
                  />
                )}

                <Controller
                  name={`exp.${index}.endingDate`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'End date is required',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <AppDatePicker
                      label="End Date"
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />

                {errors?.exp?.[index]?.endingDate?.message && (
                  <GrayMediumText
                    text={errors?.exp?.[index]?.endingDate.message}
                    _style={{ color: colors.theme.lightRed }}
                  />
                )}
              </View>
            ))}
          </View>
          <AppButton
            prefix
            bordered
            title={'Add Experience'}
            onPress={addExperienceField}
            btnStyle={{
              marginVertical: 10,
            }}
          />
          <AppButton
            title={'Update'}
            btnStyle={{
              marginVertical: 10,
            }}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  groupContainer: {},
  fieldGroup: {
    marginTop: 20,
  },
});
