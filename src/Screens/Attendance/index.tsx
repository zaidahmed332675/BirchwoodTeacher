import { compareAsc, format, getMonth, getYear, isToday } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AppCalender } from '../../Components/AppCalender';
import { AttendanceCard } from '../../Components/AttendanceCard';
import { CustomHeader } from '../../Components/CustomHeader';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { HolidayCard } from '../../Components/HolidayCard';
import { Layout } from '../../Components/Layout';
import { NotFound } from '../../Components/NotFound';
import { CustomSwitch } from '../../Components/Switch';
import { asyncGetAllHolidays, asyncUserMonthlyAttendance } from '../../Stores/actions/user.action';
import {
  useAppSelector,
  useLoaderDispatch
} from '../../Stores/hooks';
import { selectHolidaysMonthWise, selectUserAttendance } from '../../Stores/slices/user.slice';
import { colors } from '../../Theme/colors';
import { attendanceEnum } from '../../Utils/options';
import { vh, vw } from '../../Utils/units';

const Attendance = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [attendanceMonthYear, setAttendanceMonthYear] = useState(new Date());
  const [holidaysMonthYear, setHolidaysMonthYear] = useState(new Date());

  const [attendanceLoader, getUserMonthlyAttendnace] = useLoaderDispatch(asyncUserMonthlyAttendance);
  const [holidayLoader, getAllHolidays] = useLoaderDispatch(asyncGetAllHolidays, false);

  const monthlyWserAttendance = useAppSelector(selectUserAttendance(format(attendanceMonthYear, 'yyyy-M')));
  const monthlyUserHolidays = useAppSelector(selectHolidaysMonthWise(format(holidaysMonthYear, 'yyyy-MM')));

  const loadData = (ignoreLoading = false) => {
    if (tabIndex === 0 && (!attendanceLoader || ignoreLoading)) getUserMonthlyAttendnace({
      month: getMonth(attendanceMonthYear) + 1,
      year: getYear(attendanceMonthYear),
    });
    if (tabIndex === 1 && (!holidayLoader)) getAllHolidays()
  }

  useEffect(() => {
    loadData(true)
  }, [tabIndex, attendanceMonthYear, holidaysMonthYear, getUserMonthlyAttendnace, getAllHolidays]);

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
  };

  const attendanceData = monthlyWserAttendance?.attendance?.reduce((acc, curr) => {
    let formatedDate = curr.checkIn ? format(new Date(curr.checkIn), 'yyyy-MM-dd') : '';
    return {
      ...acc,
      [formatedDate]: {
        entryDate: formatedDate,
        status: curr.status,
      },
    };
  }, {} as Record<string, { entryDate: string; status?: string }>);

  const holidaysData = monthlyUserHolidays?.reduce((acc, curr) => {
    let formatedDate = format(new Date(curr.date), 'yyyy-MM-dd');
    return {
      ...acc,
      [formatedDate]: {
        entryDate: formatedDate,
      },
    };
  }, {} as Record<string, { entryDate: string }>);

  return (
    <Layout
      customHeader={<CustomHeader title="Attendance" />}
      showBottom={true}>
      <View style={styles.customSwitch}>
        <CustomSwitch
          selectionMode={tabIndex}
          roundCorner={true}
          options={['Attendance', 'Holidays']}
          onSelectSwitch={onSelectSwitch}
          selectionColor={colors.theme.secondary}
        />
      </View>
      <View style={styles.calender}>
        {tabIndex === 0 ? (
          <AppCalender
            data={attendanceData}
            calenderMonthYear={attendanceMonthYear}
            handleMonthChange={setAttendanceMonthYear}
            customDatesStyles={date => {
              let calenderDate = format(date, 'yyyy-MM-dd');
              let calenderDateUserEntry = attendanceData?.[calenderDate];
              const isTodayDate = isToday(date);

              const isDateMatched = !isNaN(compareAsc(calenderDate, calenderDateUserEntry?.entryDate)) || undefined;

              let baseStyle = {};
              let textStyle = styles.daysLabelStyle;

              if (isDateMatched) {
                if (calenderDateUserEntry?.status === attendanceEnum.PRESENT) {
                  baseStyle = styles.presentDaysStyle;
                  textStyle = styles.textStyle;
                } else if (calenderDateUserEntry?.status === attendanceEnum.ABSENT) {
                  baseStyle = styles.absentDaysStyle;
                  textStyle = styles.textStyle;
                } else if (calenderDateUserEntry?.status === attendanceEnum.LEAVE) {
                  baseStyle = styles.leaveDaysStyle;
                  textStyle = styles.textStyle;
                }
              } else if (date.getDay() === 0) {
                textStyle = { ...styles.textStyle, ...styles.weekEndDaysStyle };
              }

              // Apply today's style on top of the base style
              if (isTodayDate) {
                baseStyle = [baseStyle, styles.todayStyle];
              }

              return {
                style: baseStyle,
                textStyle,
              };
            }}
          />
        ) : (
          <AppCalender
            data={holidaysData}
            calenderMonthYear={holidaysMonthYear}
            handleMonthChange={setHolidaysMonthYear}
            customDatesStyles={date => {
              const calenderDate = format(date, 'yyyy-MM-dd');
              const calenderDateUserEntry = holidaysData?.[calenderDate];
              const isTodayDate = isToday(date);

              const isDateMatched = !isNaN(compareAsc(calenderDate, calenderDateUserEntry?.entryDate)) || undefined;

              let baseStyle = {};
              let textStyle = styles.daysLabelStyle;

              if (isDateMatched) {
                baseStyle = styles.presentDaysStyle;
                textStyle = styles.textStyle;
              } else if (date.getDay() === 0) {
                textStyle = { ...styles.textStyle, ...styles.weekEndDaysStyle };
              }

              // Apply today's style on top of the base style
              if (isTodayDate) {
                baseStyle = [baseStyle, styles.todayStyle];
              }

              return {
                style: baseStyle,
                textStyle,
              };
            }}
          />
        )}
        {tabIndex === 1 && (
          <GrayMediumText
            text="List of Holidays"
            _style={{
              color: colors.theme.black,
              fontSize: vh * 2.11, // 16
              marginVertical: vh * 1.97, // 15
              marginHorizontal: vw * 4.17, // 15,
            }}
          />
        )}
      </View>

      {tabIndex === 1 ? (
        monthlyUserHolidays.length ? <FlatList
          contentContainerStyle={{ gap: 10, paddingBottom: vh * 1.97 }}
          data={monthlyUserHolidays}
          renderItem={({ item }) => <HolidayCard holiday={item} />}
          keyExtractor={item => item._id}
        /> : <NotFound _containerStyle={{ marginTop: -15, position: 'relative' }} text={"Currently, there are no holidays available for this month."} />
      ) : (
        <View style={styles.stats}>
          <AttendanceCard
            type={attendanceEnum.PRESENT}
            title="Present"
            count={monthlyWserAttendance?.stats?.PRESENT ?? 0o0}
          />
          <AttendanceCard
            type={attendanceEnum.ABSENT}
            title="Absent"
            count={monthlyWserAttendance?.stats?.ABSENT ?? 0o0}
          />
          <AttendanceCard
            type={attendanceEnum.LEAVE}
            title="Leave"
            count={monthlyWserAttendance?.stats?.LEAVE ?? 0o0}
          />
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginTop: vh * 2.63, // 20
    flexDirection: 'row',
    justifyContent: 'center',
  },
  calender: {
    paddingTop: vh * 2.63, // 20
  },
  daysLabelStyle: {
    fontSize: vh * 1.71, // 13
  },
  textStyle: {
    color: colors.theme.white,
    fontWeight: 'bold',
    fontSize: vh * 1.71, // 13
  },
  presentDaysStyle: {
    backgroundColor: colors.theme.darkGreen,
  },
  absentDaysStyle: {
    backgroundColor: colors.theme.darkRed,
  },
  leaveDaysStyle: {
    backgroundColor: colors.theme.secondary,
  },
  weekEndDaysStyle: {
    color: colors.theme.darkRed,
    fontWeight: '400',
  },
  todayStyle: {
    borderWidth: 2,
    borderRadius: 50,
    borderStyle: 'dashed',
    borderColor: colors.theme.primary
  },
  stats: {
    marginTop: vh * 3.95, // 30
    gap: 10
  }
});

export default Attendance;
