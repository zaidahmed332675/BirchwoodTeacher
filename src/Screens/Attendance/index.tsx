import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AppCalender } from '../../Components/AppCalender';
import { AttendanceCard } from '../../Components/AttendanceCard';
import { CustomHeader } from '../../Components/CustomHeader';
import { DataLoader } from '../../Components/DataLoader';
import { GrayMediumText } from '../../Components/GrayMediumText';
import { HolidayCard } from '../../Components/HolidayCard';
import { Layout } from '../../Components/Layout';
import { CustomSwitch } from '../../Components/Switch';
import { asyncUserMonthlyAttendance } from '../../Stores/actions/user.action';
import {
  useAppDispatch,
  useAppSelector,
  useLoaderDispatch,
} from '../../Stores/hooks';
import { selectUserAttendance } from '../../Stores/slices/user.slice';
import { colors } from '../../theme/colors';
import { format, getMonth, getYear } from 'date-fns';
import { setLoading } from '../../Stores/slices/common.slice';
import { attendanceEnum } from '../../Utils/options';

const Attendance = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [calenderMonthYear, setCalenderMonthYear] = useState(new Date());
  const [_, getUserMonthlyAttendnace] = useLoaderDispatch(
    asyncUserMonthlyAttendance
  );
  const userAttendance = useAppSelector(selectUserAttendance);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
  }, [dispatch]);

  const loadData = useCallback(async () => {
    let res = await getUserMonthlyAttendnace({
      month: getMonth(calenderMonthYear),
      year: getYear(calenderMonthYear),
    });
    if (res.status) {
      dispatch(setLoading(false));
    }
  }, [calenderMonthYear, getUserMonthlyAttendnace, dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const holidaysData = [
    {
      id: 1,
      title: 'Easter',
      date: '11th november',
    },
    {
      id: 2,
      title: 'Good Friday',
      date: '14th november',
    },
    {
      id: 3,
      title: 'Chritsmas',
      date: '25th november',
    },
  ];

  const onSelectSwitch = (index: number) => {
    setTabIndex(index);
  };

  // const renderItems = ({ item }: any) => {
  //   if (tabIndex > 1) {
  //     return <HolidayCard item={item} />;
  //   } else {
  //     return <AttendanceCard item={item} />;
  //   }
  // };

  // const ItemSeperator = useCallback(() => <View style={{ margin: 10 }} />, []);

  const handleMonthChange = (date: Date) => {
    setCalenderMonthYear(date);
  };

  // if (true) {
  //   return <DataLoader />;
  // }

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
        {tabIndex > 1 ? (
          <AppCalender
            data={attendanceData}
            calenderMonthYear={calenderMonthYear}
            handleMonthChange={handleMonthChange}
          />
        ) : (
          <AppCalender
            data={attendanceData}
            calenderMonthYear={calenderMonthYear}
            handleMonthChange={handleMonthChange}
          />
        )}
        {tabIndex > 1 && (
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

      {tabIndex > 1 ? (
        <HolidayCard item={holidaysData[0]} />
      ) : (
        <View style={{ marginTop: 30, rowGap: 10 }}>
          <AttendanceCard
            type={attendanceEnum.PRESENT}
            title="Present"
            count={userAttendance.stats.PRESENT}
          />
          <AttendanceCard
            type={attendanceEnum.ABSENT}
            title="Absent"
            count={userAttendance.stats.ABSENT}
          />
          <AttendanceCard
            type={attendanceEnum.LEAVE}
            title="Leave"
            count={userAttendance.stats.LEAVE}
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
