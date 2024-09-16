import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';
import lodash from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppDatePicker } from '../../Components/AppDatePicker';
import { AppInput } from '../../Components/AppInput';
import { AppSelect } from '../../Components/AppSelect';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { asyncShowError } from '../../Stores/actions/common.action';
import { asyncCreateTimeTableRecord, asyncUpdateTimeTableRecord } from '../../Stores/actions/timeTable.action';
import { useAppDispatch, useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectTimeTableRecordById } from '../../Stores/slices/timeTable.slice';
import { colors } from '../../apptheme/colors';
import { ETimeTableStack, TimeTableStackParams } from '../../Types/NavigationTypes';
import { CreateTimeTableRecordPayload } from '../../Types/TimeTable';
import { DaysEnum } from '../../Utils/options';
import { DropDown } from '../../Components/DropDown';
import { selectUserProfile } from '../../Stores/slices/user.slice';

type Props = StackScreenProps<TimeTableStackParams, 'createTimeTable'>;

export default function CreateTimeTable({ navigation, route }: Props) {
  const [_, createTimeTableRecord] = useLoaderDispatch(asyncCreateTimeTableRecord);
  const [__, updateTimeTableRecord] = useLoaderDispatch(asyncUpdateTimeTableRecord);
  const timeTableRecordById = useAppSelector(selectTimeTableRecordById(route.params?.timeTableRecordId!, route.params?.day!))
  const profile = useAppSelector(selectUserProfile)

  const dispatch = useAppDispatch()

  const isEdit = !!route.params?.timeTableRecordId

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<any>({
    defaultValues: {
      day: '',
      classroom: '',
      startTime: '',
      endTime: '',
      description: '',
      subject: '',
      meta: '',
    },
  });

  const onSubmit = useCallback(
    async (data: CreateTimeTableRecordPayload) => {

      data.startTime = format(data.startTime, "hh:mm a")
      data.endTime = format(data.endTime, "hh:mm a")

      let body = {} as typeof data

      body.classroom = data.classroom

      if (data.day !== timeTableRecordById?.day) {
        body.day = data.day;
      }
      if (data.meta !== timeTableRecordById?.meta) {
        body.meta = data.meta;
      }
      if (data.subject !== timeTableRecordById?.subject) {
        body.subject = data.subject;
      }
      if (data.description !== timeTableRecordById?.description) {
        body.description = data.description;
      }
      if (data.startTime !== timeTableRecordById?.startTime) {
        body.startTime = data.startTime;
      }
      if (data.endTime !== timeTableRecordById?.endTime) {
        body.endTime = data.endTime;
      }

      if (Object.keys(body).length === 0) {
        return dispatch(asyncShowError('No changes have been made!'));
      } else {
        let res = isEdit ? await updateTimeTableRecord({ timeTableRecordId: timeTableRecordById._id, prevDay: timeTableRecordById.day, data: body }) : await createTimeTableRecord(data)
        if (res.status) navigation.navigate(ETimeTableStack.timeTable)
      }
    },
    [dispatch, createTimeTableRecord]
  );

  useEffect(() => {
    if (isEdit) {
      setValue('classroom', timeTableRecordById.classroom);
      setValue('day', timeTableRecordById.day);
      setValue('meta', timeTableRecordById.meta);
      setValue('subject', timeTableRecordById.subject);
      setValue('description', timeTableRecordById.description);
      // setValue('startTime', timeTableRecordById.startTime);
      // setValue('endTime', timeTableRecordById.endTime);
    } else {
      setValue('classroom', profile?.classroom?._id);
    }
  }, [setValue, timeTableRecordById]);

  return (
    <Layout customHeader={<CustomHeader title={isEdit ? "Update Time Table" : "Create Time Table"} />}>
      <ScrollView>
        <View style={styles.container}>
          <ScrollView>
            <Controller
              name="day"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Day is required',
                },
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <DropDown
                    label="Day"
                    placeholder='Please select'
                    required={true}
                    items={Array.from(Object.keys(DaysEnum ?? {}), key => ({
                      label: lodash.capitalize(key),
                      value: key,
                    }))}
                    value={value}
                    setValue={_ => onChange(_(value))}
                    multiple={false}
                    open={true}
                    setOpen={() => { }}
                  />
                )
              }}
            />

            {errors.day?.message && (
              <GrayMediumText
                _style={{ color: colors.theme.lightRed }}
                text={errors.day.message}
              />
            )}

            <Controller
              name="meta"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Period is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="Period"
                  placeholder="Enter Period"
                  value={value}
                  required
                  onChange={onChange}
                />
              )}
            />

            {errors.meta?.message && (
              <GrayMediumText
                text={errors.meta.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <Controller
              name="subject"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Subject is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  label="Subject"
                  placeholder="Enter Subject"
                  value={value}
                  required
                  onChange={onChange}
                />
              )}
            />

            {errors.subject?.message && (
              <GrayMediumText
                text={errors.subject.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Please write your thoughts!',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppInput
                  isMultiple={true}
                  required={true}
                  label='Description'
                  textAlignVertical="top"
                  placeholder={"What's in your mind?...."}
                  placeholderTextColor={colors.text.altGrey}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.description?.message && (
              <GrayMediumText
                text={errors.description.message}
                _style={{ color: colors.theme.lightRed }}
              />
            )}

            <Controller
              name="startTime"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Start time is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppDatePicker
                  label="Start Time"
                  pickerTitle='Select Start Time'
                  pickerMode='time'
                  dateTimeFormat="hh:mm a"
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            {errors.startTime?.message && (
              <GrayMediumText
                _style={{ color: colors.theme.lightRed }}
                text={errors.startTime.message}
              />
            )}

            <Controller
              name="endTime"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'End time is required',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppDatePicker
                  label="End Time"
                  pickerTitle='Select End Time'
                  pickerMode='time'
                  dateTimeFormat="hh:mm a"
                  onChange={onChange}
                  value={value}
                />
              )}
            />

            {errors.endTime?.message && (
              <GrayMediumText
                _style={{ color: colors.theme.lightRed }}
                text={errors.endTime.message}
              />
            )}

            <AppButton
              title={'Submit'}
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
  profileGrid: {
    marginBottom: 24,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 13,
    width: '100%',
  },
  profilePhoto: {
    borderWidth: 3,
    borderColor: colors.theme.primary,
  },
});