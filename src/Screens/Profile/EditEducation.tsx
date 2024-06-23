import { StackScreenProps } from '@react-navigation/stack';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppDatePicker } from '../../Components/AppDatePicker';
import { AppInput } from '../../Components/AppInput';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { VIcon } from '../../Components/VIcon';
import { asyncShowError } from '../../Stores/actions/common.action';
import { asyncUpdateEducation } from '../../Stores/actions/user.action';
import { useAppDispatch, useAppSelector } from '../../Stores/hooks';
import { selectUserProfile } from '../../Stores/slices/user.slice';
import { ProfileStackParams } from '../../Types/NavigationTypes';
import { isArrayOfObjectsEqual } from '../../Utils/options';
import { colors } from '../../theme/colors';

type Props = StackScreenProps<ProfileStackParams, 'editEducation'>;

export default function EditEducation({}: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserProfile);

  const initObj = useMemo(
    () => ({
      instituteName: '',
      degree: '',
      startingDate: '',
      endingDate: '',
      fieldOfStudy: '',
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
    name: 'edu',
  });

  useEffect(() => {
    if (user?.education?.length) {
      setValue('edu.0.instituteName', 'testing institute by zaid');
    } else {
      !fields.length && append(initObj);
    }
  }, [append, fields.length, initObj, setValue, user?.education?.length]);

  const onSubmit = useCallback(
    async (data: any) => {
      if (isArrayOfObjectsEqual(user.education, data, _.keys(initObj))) {
        return dispatch(asyncShowError('No changes have been made!'));
      } else {
        await dispatch(asyncUpdateEducation(data.edu)).unwrap();
      }
    },
    [dispatch, user, initObj]
  );

  const addEducationField = () => {
    append(initObj);
  };

  const removeEducationField = (index: number) => {
    remove(index);
  };

  return (
    <Layout customHeader={<CustomHeader title="Edit Education" />}>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView>
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
                      text={`Institute - 0${index + 1}`}
                    />
                    {fields.length > 1 && (
                      <TouchableOpacity
                        onPress={() => removeEducationField(index)}
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
                    name={`edu.${index}.instituteName`}
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Instinute name is required',
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <AppInput
                        label="Institute Name"
                        placeholder={'Enter institute name'}
                        value={value}
                        onChange={onChange}
                        required
                      />
                    )}
                  />

                  {errors?.edu?.[index]?.instituteName?.message && (
                    <GrayMediumText
                      text={errors?.edu?.[index]?.instituteName.message}
                      _style={{ color: colors.theme.lightRed }}
                    />
                  )}

                  <Controller
                    name={`edu.${index}.degree`}
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Degree name is required',
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <AppInput
                        label="Degree Name"
                        placeholder={'Enter degree name'}
                        value={value}
                        onChange={onChange}
                        required
                      />
                    )}
                  />

                  {errors?.edu?.[index]?.degree?.message && (
                    <GrayMediumText
                      text={errors?.edu?.[index]?.degree.message}
                      _style={{ color: colors.theme.lightRed }}
                    />
                  )}

                  <Controller
                    name={`edu.${index}.fieldOfStudy`}
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'Field of study is required',
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <AppInput
                        label="Field Of Study Date"
                        placeholder={'Enter Field of study'}
                        value={value}
                        onChange={onChange}
                        required
                      />
                    )}
                  />

                  {errors?.edu?.[index]?.fieldOfStudy?.message && (
                    <GrayMediumText
                      text={errors?.edu?.[index]?.fieldOfStudy.message}
                      _style={{ color: colors.theme.lightRed }}
                    />
                  )}

                  <Controller
                    name={`edu.${index}.startingDate`}
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

                  {errors?.edu?.[index]?.startingDate?.message && (
                    <GrayMediumText
                      text={errors?.edu?.[index]?.startingDate.message}
                      _style={{ color: colors.theme.lightRed }}
                    />
                  )}

                  <Controller
                    name={`edu.${index}.endingDate`}
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

                  {errors?.edu?.[index]?.endingDate?.message && (
                    <GrayMediumText
                      _style={{ color: colors.theme.lightRed }}
                      text={errors?.edu?.[index]?.endingDate.message}
                    />
                  )}
                </View>
              ))}
            </View>

            <AppButton
              prefix
              bordered
              title={'Add Education'}
              onPress={addEducationField}
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
          </ScrollView>
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
