import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AttendanceCard } from '../../Components/AttendanceCard';
import { CustomHeader } from '../../Components/CustomHeader';
import { AppDatePicker } from '../../Components/DatePicker/DatePicker';
import { HolidayCard } from '../../Components/HolidayCard';
import { Layout } from '../../Components/Layout';
import { CustomSwitch } from '../../Components/Switch';
import { colors } from '../../theme/colors';
import { GrayMediumText } from '../../Components/GrayMediumText';

const Attendance = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);

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

  const renderItems = ({ item }) => {
    if (tabIndex > 1) {
      return <HolidayCard item={item} />;
    } else {
      return <AttendanceCard item={item} />;
    }
  };

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
      <FlatList
        data={tabIndex > 1 ? holidaysData : attendanceData}
        renderItem={renderItems}
        ListHeaderComponent={() => (
          <View>
            <AppDatePicker />
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
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
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
