import { StackScreenProps } from '@react-navigation/stack';
import { addDays, format, getMonth, getYear, isSameDay, startOfWeek } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../../Components/Button';
import { CustomHeader } from '../../Components/CustomHeader';
import { GlroyBold } from '../../Components/GlroyBoldText';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { Layout } from '../../Components/Layout';
import { ImageBox } from '../../Components/UploadImage';
import { asyncCheckInChildByTeacher, asyncChildMonthlyAttendance } from '../../Stores/actions/class.action';
import { useAppSelector, useLoaderDispatch } from '../../Stores/hooks';
import { selectChildById, selectCurrentWeekAttendance } from '../../Stores/slices/class.slice';
import { colors } from '../../Theme/colors';
import { ChildCheckInOutResponse } from '../../Types/Class';
import { ClassStackParams } from '../../Types/NavigationTypes';
import { vh, vw } from '../../Utils/units';
import { getCheckInBtnColor, getCheckInBtnLabel } from '../../Utils/options';

type Props = StackScreenProps<ClassStackParams, 'childInfo'>;

const ChildInfo = ({ route }: Props) => {
  const { childId } = route.params
  const [calenderMonthYear] = useState(new Date());

  const [_, checkInChildByTeacher] = useLoaderDispatch(asyncCheckInChildByTeacher);
  const [__, getChildMonthlyAttendnace] = useLoaderDispatch(asyncChildMonthlyAttendance);

  const child = useAppSelector(selectChildById(childId));
  const currentWeekAttendance = useAppSelector(selectCurrentWeekAttendance(childId, startOfWeek(calenderMonthYear, { weekStartsOn: 1 })))

  useEffect(() => {
    getChildMonthlyAttendnace({
      childId,
      month: getMonth(calenderMonthYear) + 1,
      year: getYear(calenderMonthYear),
    });
  }, [childId, calenderMonthYear, getChildMonthlyAttendnace]);

  const reports = [
    {
      id: '1',
      title: 'Weekly Report',
      description: 'View the weekly attendance report',
    },
    {
      id: '2',
      title: 'Monthly Report',
      description: 'View the monthly attendance report',
    },
  ];

  const handleCheckIn = useCallback(async () => {
    if (child?.todayAttendance?._id) return

    const date = new Date();
    const checkInDateTime = date.toISOString();
    checkInChildByTeacher({ children: childId, checkIn: checkInDateTime })
  }, [checkInChildByTeacher]);

  const reportsCards = (items: any, indx: number) => {
    return (
      <View
        key={indx}
        style={[styles.reportCard, { marginTop: indx !== 0 ? vh * 2.63 : vh * 0.66 }]}>
        <View style={{ flex: 1 }}>
          <GrayMediumText
            text={items.title}
            _style={{
              color: colors.theme.black,
            }}
          />
          <GrayMediumText
            text={items.description}
            _style={{
              fontSize: vh * 1.58, // 12
              color: colors.theme.grey,
              fontWeight: 'normal',
            }}
          />
        </View>
        <AppButton
          title="View Report"
          onPress={() => { }}
          btnStyle={{
            paddingVertical: vh * 1.05, // 8
            paddingHorizontal: vw * 5.56, // 20
            bordeRadius: 100,
          }}
          textStyle={{
            fontSize: vh * 1.32, // 10
          }}
        />
      </View>
    );
  };

  return (
    <Layout customHeader={<CustomHeader title={'Child Information'} />}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <ImageBox image={{ uri: child.image }} _imageStyle={styles.profilePhoto} />
            <GlroyBold
              text={`${child.firstName} ${child.lastName}`}
              _style={styles.childName}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <GrayMediumText text={child.classroom.classroomName} />
              <GrayMediumText
                text={'|'}
                _style={{
                  fontSize: vh * 2.11, // 16
                  marginHorizontal: vw * 1.39, // 5
                }}
              />
              <GrayMediumText text={`Roll No: ${child.rollNumber}`} />
            </View>
          </View>
          <AppButton title={getCheckInBtnLabel(child?.todayAttendance?.status)} onPress={handleCheckIn} btnStyle={{ backgroundColor: getCheckInBtnColor(child?.todayAttendance?.status), marginTop: vh * 1.05 }} />
          <View
            style={styles.sectionTitleBox}>
            <GrayMediumText
              text="Current Weekly Attendance"
              _style={{
                color: colors.theme.black,
              }}
            />
          </View>
          <View style={styles.attendanceTableContainer}>
            <View style={styles.tableHeading}>
              {['Date', 'Check-in', 'Check-out'].map((item, indx) => {
                return (
                  <View
                    style={styles.tableHeadingBox}
                    key={indx}>
                    <Text style={{ fontSize: vh * 1.84, color: colors.theme.black }}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={{ margin: 1 }} />
            {Array.from({ length: 5 }).map((_, indx) => {
              const weekDay = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), indx)
              const day = currentWeekAttendance?.find(item => isSameDay(weekDay, item?.createdAt ?? "")) || {} as ChildCheckInOutResponse
              let checkIn = day.checkIn ? format(new Date(day.checkIn), "hh:mm a") : 'N/A'

              const childTodayCheckIn = child.todayAttendance?.checkIn ?? ""
              if (isSameDay(checkIn, childTodayCheckIn)) {
                checkIn = format(new Date(childTodayCheckIn), "hh:mm a")
              }

              const checkOut = day.checkOut ? format(new Date(day.checkOut), "hh:mm a") : 'N/A'

              return (
                <View
                  style={[
                    styles.tableItems,
                    { borderBottomWidth: 6 === indx ? 0 : 1 },
                  ]}
                  key={indx}>
                  <GrayMediumText
                    text={format(weekDay, 'cccc')}
                    _style={styles.attendanceItem}
                  />
                  <GrayMediumText
                    text={checkIn}
                    _style={styles.attendanceItem}
                  />
                  <GrayMediumText
                    text={checkOut}
                    _style={styles.attendanceItem}
                  />
                </View>
              );
            })}
          </View>
          <View
            style={styles.sectionTitleBox}>
            <GrayMediumText
              text="Reports"
              _style={{
                color: colors.theme.black,
              }}
            />
          </View>
          {reports.map((items, indx) => reportsCards(items, indx))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: vh * 2.5,
  },
  profilePhoto: {
    width: vw * 27.78, // 100
    height: vh * 13.16, // 100
    borderWidth: 2,
    borderColor: colors.theme.primary,
  },
  attendanceTableContainer: {
    borderWidth: 1,
    borderColor: colors.theme.borderColor,
    borderRadius: 10,
    backgroundColor: colors.theme.greyAlt,
  },
  tableHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.theme.borderColor,
    paddingVertical: vh * 0.66, // 5
    paddingHorizontal: vw * 1.39, // 5
  },
  tableHeadingBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: vh * 0.66, // 5
  },
  tableItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.theme.borderColor,
    borderBottomColor: colors.theme.borderColor,
  },
  attendanceItem: {
    paddingVertical: vh * 1.97, // 15
    paddingHorizontal: vw * 4.17, // 15
    flex: 1,
    textAlign: 'center',
    color: colors.theme.black,
    fontSize: vh * 1.71, // 13
    alignSelf: 'center',
  },
  reportCard: {
    borderWidth: 1,
    paddingVertical: vh * 1.32, // 10
    paddingHorizontal: vw * 2.78, // 10
    backgroundColor: colors.theme.greyAlt,
    borderColor: colors.theme.borderColor,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleBox: {
    alignItems: 'center',
    marginTop: vh * 3.95, // 30
    marginBottom: vh * 1.32, // 10
  },
  childName: {
    marginVertical: vh * 1.05,
    color: colors.theme.black
  }
});

export default ChildInfo;
