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
import { getMonth, getYear } from 'date-fns';
import { setLoading } from '../../Stores/slices/common.slice';

const Attendance = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const [calenderMonthYear, setCalenderMonthYear] = useState(new Date());
  const [loading, getUserMonthlyAttendnace] = useLoaderDispatch(
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

  const attendanceData = [
    {
      id: 1,
      title: 'Absent',
      data: '03',
      isAttendance: true,
    },
    {
      id: 2,
      title: 'Festival & Holiday',
      data: '05',
      isFestival: true,
    },
  ];

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

  const renderItems = ({ item }: any) => {
    if (tabIndex > 1) {
      return <HolidayCard item={item} />;
    } else {
      return <AttendanceCard item={item} />;
    }
  };

  const ItemSeperator = useCallback(() => <View style={{ margin: 10 }} />, []);

  const handleMonthChange = (date: Date) => {
    setCalenderMonthYear(date);
  };

  if (loading) {
    return <DataLoader />;
  }

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
        <AppCalender
          calenderMonthYear={calenderMonthYear}
          attendance={userAttendance}
          handleMonthChange={handleMonthChange}
        />
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
      <FlatList
        data={tabIndex > 1 ? holidaysData : attendanceData}
        renderItem={renderItems}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeperator}
      />
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
