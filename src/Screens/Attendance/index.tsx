import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BottomBackground } from '../../Components/BottomBackground';
import AppDatePicker from '../../Components/DatePicker/DatePicker';
import Layout from '../../Components/Layout';
import { MarkAttendance } from '../../Components/MarkAttendance';
import { CustomSwitch } from '../../Components/Switch';
import { AttendanceStackParams } from '../../Types/NavigationTypes';
import { colors } from '../../theme/colors';
import { CustomHeader } from '../../Components/CustomHeader';

type Props = StackScreenProps<AttendanceStackParams, 'attendance'>;

const Attendance = ({}: Props) => {
  const onSelectSwitch = (index: number) => {
    console.log(index);
  };

  return (
    <Layout customHeader={<CustomHeader title="Attendance" />}>
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <AppDatePicker />
        <MarkAttendance />
      </ScrollView>
      <BottomBackground />
    </Layout>
  );
};

const styles = StyleSheet.create({
  customSwitch: {
    marginVertical: 20,
    alignItems: 'center',
  },
  diaryRecord: {
    marginVertical: 10,
  },
});

export default Attendance;
