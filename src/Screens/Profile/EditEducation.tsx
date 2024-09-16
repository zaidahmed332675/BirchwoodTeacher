import { StackScreenProps } from '@react-navigation/stack';
import _, { isArray } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import { colors } from '../../Theme/colors';
import { UserEducation } from '../../types/User';
import { format, isValid } from 'date-fns';

type Props = StackScreenProps<ProfileStackParams, 'editEducation'>;

export default function EditEducation({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserProfile);

  const initObj = useMemo(
    () => ({
      school: '',
      start: '',
      end: '',
      subject: [],
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
      user?.education.forEach((education, index) => {
        append(initObj);
        Object.keys(education).forEach((itemKey) => {
          const value = user?.education[index][itemKey];
          if (!Array.isArray(value)) {
            if (isValid(new Date(value))) setValue(`edu.${index}.${itemKey}`, new Date(value));
            else setValue(`edu.${index}.${itemKey}`, value);
          }
          else {
            value.forEach((subject, ind) => {
              setValue(`edu.${index}.${itemKey}.${ind}`, { subject });
            })
          }
        })
      });
    } else {
      if (!fields.length) {
        append(initObj);
      }
    }
  }, [initObj, user?.education?.length]);

  const onSubmit = useCallback(
    async ({ edu }: { edu: UserEducation[] }) => {

      let education = edu.map((eduRecord: UserEducation) => ({
        ...eduRecord,
        subject: eduRecord.subject.map((sub: any) => sub.subject)
        // start: new Date(eduRecord.start),
        // end: new Date(eduRecord.end),
      }));

      // let existingEducation = user.education.map(eduRecord => ({
      //   ...eduRecord,
      //   start: eduRecord.start,
      //   end: eduRecord.end
      // }))

      // console.log(education, '001')
      // console.log(existingEducation, '002')
      // console.log(user?.education, '003')

      // if (isArrayOfObjectsEqual(user.education, education, _.keys(initObj))) {
      //   return dispatch(asyncShowError('No changes have been made!'));
      // } else {
      await dispatch(asyncUpdateEducation({ education })).unwrap();
      navigation.navigate('profile')

      // }
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
    <Layout customHeader={<CustomHeader title={user?.education?.length ? "Edit Education" : "Add Education"} />}>
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
                    name={`edu.${index}.school`}
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

                  {errors?.edu?.[index]?.school?.message && (
                    <GrayMediumText
                      text={errors.edu[index].school.message}
                      _style={{ color: colors.theme.lightRed }}
                    />
                  )}

                  <NestedFieldArray control={control} nestIndex={index} fieldName="subject" fieldLabel="Subjects" placeholder="Enter Subject" errors={errors} />

                  <Controller
                    name={`edu.${index}.start`}
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

                  {errors?.edu?.[index]?.start?.message && (
                    <GrayMediumText
                      text={errors.edu[index].start.message}
                      _style={{ color: colors.theme.lightRed }}
                    />
                  )}

                  <Controller
                    name={`edu.${index}.end`}
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

                  {errors?.edu?.[index]?.end?.message && (
                    <GrayMediumText
                      text={errors.edu[index].end.message}
                      _style={{ color: colors.theme.lightRed }}
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
              title={user?.education?.length ? 'Update' : 'Submit'}
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

export const NestedFieldArray = ({ control, nestIndex, fieldName, rules, fieldLabel = "", placeholder = "", errors }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `edu.${nestIndex}.${fieldName}`
  });

  useEffect(() => {
    !fields.length && append("");
  }, [])

  return (
    <View>
      <Text style={styles.labelStyle}>
        {fieldLabel} <Text style={{ color: 'red' }}>*</Text>
      </Text>
      {fields.map((item, index) => (
        <View key={item.id}>
          <Controller
            name={`edu.${nestIndex}.${fieldName}.${index}.subject`}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Field is required',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <AppInput
                  label={""}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  required
                  _containerStyle={{
                    flex: 1,
                    marginVertical: 0,
                    marginBottom: 10,
                  }}
                />
                {fields.length > 1 && <TouchableOpacity
                  onPress={() => remove(index)}
                  style={{
                    paddingLeft: 10
                  }}
                >
                  <VIcon
                    type="AntDesign"
                    name={"delete"}
                    size={20}
                    color={colors.theme.darkRed}
                  />
                </TouchableOpacity>
                }
              </View>
            )}
          />
          {errors.edu?.[nestIndex]?.[fieldName]?.[index]?.[fieldName]?.message && (
            <GrayMediumText
              text={errors.edu[nestIndex][fieldName][index][fieldName].message}
              _style={{ color: colors.theme.lightRed, marginBottom: 10 }}
            />
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={() => append({ school: "" })}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.theme.primary,
          borderRadius: 8,
          paddingVertical: 6,
        }}>
        <VIcon
          type="FontAwesome"
          name="plus"
          size={18}
          color={colors.theme.greyAlt}
        />
      </TouchableOpacity>
    </View>
  )
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
  labelStyle: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    color: colors.text.altGrey,
    marginTop: 10
  },
});
