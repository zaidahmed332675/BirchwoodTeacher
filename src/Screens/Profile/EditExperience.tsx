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
import { isValid } from 'date-fns';
import { UserExperience } from '../../types/User';

type Props = StackScreenProps<ProfileStackParams, 'editExperience'>;

export default function EditExperience({ }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserProfile);

  const initObj = useMemo(
    () => ({
      school: '',
      position: '',
      address: "",
      start: '',
      end: '',
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
    name: 'emp',
  });


  useEffect(() => {
    if (user?.employment?.length) {
      user?.employment.forEach((employment, index) => {
        append(initObj);
        Object.keys(employment).forEach((itemKey) => {
          const value = user?.employment[index][itemKey];
          if (isValid(new Date(value))) setValue(`emp.${index}.${itemKey}`, new Date(value));
          else setValue(`emp.${index}.${itemKey}`, value);
        })
      });
    } else {
      if (!fields.length) append(initObj);
    }
  }, [initObj, user?.employment?.length]);


  useEffect(() => {
    if (user?.employment?.length) {
      setValue('emp.0.school', 'testing institute by zaid');
    } else {
      !fields.length && append(initObj);
    }
  }, [initObj, user?.employment?.length]);

  const onSubmit = useCallback(
    async ({ emp }: { emp: UserExperience[] }) => {

      let employment = emp.map((eduRecord: UserExperience) => ({
        ...eduRecord,
        start: eduRecord.start.toISOString(),
        end: eduRecord.end.toISOString(),
      }));

      if (isArrayOfObjectsEqual(user.employment, employment, _.keys(initObj))) {
        return dispatch(asyncShowError('No changes have been made!'));
      } else {
        await dispatch(asyncUpdateExperience({ employment })).unwrap();
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

  return (
    <Layout customHeader={<CustomHeader title={user?.employment?.length ? "Edit Employment" : "Add Employment"} />}>
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
                  name={`emp.${index}.school`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Institute name is required',
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

                {errors?.emp?.[index]?.school?.message && (
                  <GrayMediumText
                    text={errors.emp[index].school.message}
                    _style={{ color: colors.theme.lightRed }}
                  />
                )}

                <Controller
                  name={`emp.${index}.position`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Designation is required',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label="Designation"
                      placeholder={'Enter designation'}
                      value={value}
                      onChange={onChange}
                      required
                    />
                  )}
                />

                {errors?.emp?.[index]?.position?.message && (
                  <GrayMediumText
                    text={errors.emp[index].position.message}
                    _style={{ color: colors.theme.lightRed }}
                  />
                )}

                <Controller
                  name={`emp.${index}.start`}
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

                {errors?.emp?.[index]?.start?.message && (
                  <GrayMediumText
                    text={errors.emp[index].start.message}
                    _style={{ color: colors.theme.lightRed }}
                  />
                )}

                <Controller
                  name={`emp.${index}.end`}
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

                {errors?.emp?.[index]?.end?.message && (
                  <GrayMediumText
                    text={errors.emp[index].end.message}
                    _style={{ color: colors.theme.lightRed }}
                  />
                )}

                <Controller
                  name={`emp.${index}.address`}
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Address is required',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label="Address Reason"
                      placeholder="Enter address"
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

                {errors?.emp?.[index]?.address?.message && (
                  <GrayMediumText
                    text={errors.emp[index].address.message}
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
            title={user?.employment?.length ? 'Update' : 'Submit'}
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
