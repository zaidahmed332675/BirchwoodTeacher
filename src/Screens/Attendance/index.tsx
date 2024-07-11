import { format, getMonth, getYear } from 'date-fns';
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
import { attendanceEnum } from '../../Utils/options';
import { colors } from '../../theme/colors';

const Attendance = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [calenderMonthYear, setCalenderMonthYear] = useState(new Date());

  const [attendanceLoader, getUserMonthlyAttendnace] = useLoaderDispatch(asyncUserMonthlyAttendance);
  const [holidayLoader, getAllHolidays] = useLoaderDispatch(asyncGetAllHolidays);

  const userAttendance = useAppSelector(selectUserAttendance);
  const monthWiseHolidays = useAppSelector(selectHolidaysMonthWise(format(calenderMonthYear, 'yyyy-MM')));

  useEffect(() => {
    if (tabIndex === 1) getUserMonthlyAttendnace({
      month: getMonth(calenderMonthYear),
      year: getYear(calenderMonthYear),
    });
  }, [tabIndex, calenderMonthYear, getUserMonthlyAttendnace]);

  const [isHolidayCalled, setIsHolidayCalled] = useState(false)
  useEffect(() => {

    const loadData = async () => {
      let res = await getAllHolidays()
      if (res.status) setIsHolidayCalled(true)
    }

    if (tabIndex === 2 && !isHolidayCalled) {
      loadData()
    }
  }, [tabIndex, getAllHolidays])

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
  };

  const handleMonthChange = (date: Date) => {
    setCalenderMonthYear(date);
  };

  const attendanceData = userAttendance?.attendance?.reduce((acc, curr) => {
    let formatedDate = format(new Date(curr.checkIn), 'yyyy-MM-dd');
    return {
      ...acc,
      [formatedDate]: {
        checkInDate: formatedDate,
        checkIn: curr.teacher.checkIn,
        status: curr.status,
      },
    };
  }, []);

  const holidaysData = monthWiseHolidays?.reduce((acc, curr) => {
    let formatedDate = format(new Date(curr.date), 'yyyy-MM-dd');
    return {
      ...acc,
      [formatedDate]: {
        ...curr,
        checkInDate: formatedDate,
        checkIn: true,
      },
    };
  }, []);

  // console.log(attendanceData, 'checking attendance')
  console.log(holidaysData, 'checking holidays yar')

  return (
    <Layout
      customHeader={<CustomHeader title="Attendance" />}
      showBottom={true}>
      <View style={styles.customSwitch}>
        <CustomSwitch
          selectionMode={1}
          roundCorner={true}
          option1={'Attendance'}
          option2={'Holiday'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={colors.theme.primary}
        />
      </View>
      <View>
        {tabIndex === 1 ? (
          <AppCalender
            data={attendanceData}
            calenderMonthYear={calenderMonthYear}
            handleMonthChange={handleMonthChange}
          />
        ) : (
          <AppCalender
            data={holidaysData}
            calenderMonthYear={calenderMonthYear}
            handleMonthChange={handleMonthChange}
          />
        )}
        {tabIndex === 2 && (
          <GrayMediumText
            text="List of Holidays"
            _style={{
              color: colors.theme.black,
              fontSize: 16,
              margin: 15,
            }}
          />
        )}
      </View>

      {tabIndex === 2 ? (
        monthWiseHolidays.length ? <FlatList
          contentContainerStyle={{ gap: 10, paddingBottom: 15 }}
          data={monthWiseHolidays}
          renderItem={({ item }) => <HolidayCard holiday={item} />}
          keyExtractor={item => item._id}
        /> : <NotFound _containerStyle={{ marginTop: -15, position: 'relative' }} _textStyle={{ fontSize: 18 }} text={"Currently, there are no holidays available for this month."} />
      ) : (
        <View style={{ marginTop: 30, gap: 10 }}>
          <AttendanceCard
            type={attendanceEnum.PRESENT}
            title="Present"
            count={userAttendance.stats?.PRESENT}
          />
          <AttendanceCard
            type={attendanceEnum.ABSENT}
            title="Absent"
            count={userAttendance.stats?.ABSENT}
          />
          <AttendanceCard
            type={attendanceEnum.LEAVE}
            title="Leave"
            count={userAttendance.stats?.LEAVE}
          />
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default Attendance;
