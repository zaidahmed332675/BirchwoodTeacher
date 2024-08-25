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
import { DataLoader } from '../../Components/DataLoader';

const Attendance = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [calenderMonthYear, setCalenderMonthYear] = useState(new Date());
  const [switchLoader, setSwitchLoader] = useState(false);

  const [attendanceLoader, getUserMonthlyAttendnace] = useLoaderDispatch(asyncUserMonthlyAttendance);
  const [holidayLoader, getAllHolidays] = useLoaderDispatch(asyncGetAllHolidays, false);

  const userAttendance = useAppSelector(selectUserAttendance);
  const monthWiseHolidays = useAppSelector(selectHolidaysMonthWise(format(calenderMonthYear, 'yyyy-MM')));

  const [isHolidayCalled, setIsHolidayCalled] = useState(false)
  useEffect(() => {
    if (tabIndex === 0) getUserMonthlyAttendnace({
      month: getMonth(calenderMonthYear) + 1,
      year: getYear(calenderMonthYear),
    });

    const loadData = async () => {
      let res = await getAllHolidays()
      if (res.status) {
        setIsHolidayCalled(true)
      }
    }

    if (tabIndex === 1 && !isHolidayCalled) {
      loadData()
    }

    setSwitchLoader(false)
  }, [tabIndex, calenderMonthYear, getUserMonthlyAttendnace, getAllHolidays]);

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
    setSwitchLoader(true)
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
        isHoliday: true,
      },
    };
  }, []);

  if (switchLoader) {
    return <DataLoader />;
  }

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
        {tabIndex === 1 && (
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

      {tabIndex === 1 ? (
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
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  calender: {
    paddingTop: 20
  }
});

export default Attendance;
