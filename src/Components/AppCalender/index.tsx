import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import CalendarPicker, { CustomDatesStylesFunc } from 'react-native-calendar-picker';
import { colors } from '../../Theme/colors';
import { VIcon } from '../VIcon';
import { vh, vw } from '../../Utils/units';

interface AppCalenderProps {
  calenderMonthYear: Date;
  handleMonthChange: (date: Date) => void;
  customDatesStyles: CustomDatesStylesFunc | undefined;
  style?: ViewStyle;
}

const PrevIcon = () => (
  <VIcon
    type="Ionicons"
    name="chevron-back-outline"
    size={22}
    color={colors.theme.primary}
    style={{
      paddingLeft: vw * 4.17, // 15,
    }}
  />
);

const NextIcon = () => (
  <VIcon
    type="Ionicons"
    name="chevron-forward-outline"
    size={22}
    color={colors.theme.primary}
    style={{
      paddingRight: vw * 4.17, // 15,
    }}
  />
);

export const AppCalender = ({
  calenderMonthYear,
  handleMonthChange,
  customDatesStyles,
  style,
}: AppCalenderProps) => {
  return (
    <View style={[styles.container, style]}>
      <CalendarPicker
        onMonthChange={handleMonthChange}
        initialDate={calenderMonthYear}
        startFromMonday={true}
        showDayStragglers={true}
        dayShape="circle"
        monthTitleStyle={{ fontWeight: 'bold' }}
        yearTitleStyle={{ fontWeight: 'bold' }}
        previousComponent={<PrevIcon />}
        nextComponent={<NextIcon />}
        monthYearHeaderWrapperStyle={styles.monthYearHeaderWrapperStyle}
        dayLabelsWrapper={styles.dayLabelsWrapper}
        todayBackgroundColor={colors.theme.primary}
        todayTextStyle={{
          color: colors.theme.white,
        }}
        selectedDayTextColor={colors.theme.white}
        customDayHeaderStyles={() => {
          return { textStyle: styles.daysLabelStyle };
        }}
        customDatesStyles={customDatesStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    overflow: 'hidden',
    paddingVertical: vh * 0.79, // 6
    width: '100%',
  },
  // selectedRangeStartStyle: {
  //   backgroundColor: colors.theme.primary,
  //   borderTopLeftRadius: 6,
  //   borderBottomLeftRadius: 6,
  // },
  // selectedRangeEndStyle: {
  //   backgroundColor: colors.theme.primary,
  //   borderTopRightRadius: 6,
  //   borderBottomRightRadius: 6,
  // },
  // selectedRangeStyle: {
  //   backgroundColor: colors.theme.primary,
  // },
  // nextTitleStyle: {
  //   color: colors.theme.greyAlt,
  //   fontSize: 12,
  // },
  // previousTitleStyle: {
  //   color: colors.theme.greyAlt,
  //   fontSize: 12,
  // },
  monthYearHeaderWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayLabelsWrapper: {
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  daysLabelStyle: {
    fontSize: vh * 1.71, // 13
  },
  // textStyle: {
  //   color: colors.theme.white,
  //   fontWeight: 'bold',
  //   fontSize: 13,
  // },
  // presentDaysStyle: {
  //   backgroundColor: colors.theme.darkGreen,
  // },
  // absentDaysStyle: {
  //   backgroundColor: colors.theme.darkRed,
  // },
  // leaveDaysStyle: {
  //   backgroundColor: colors.theme.secondary,
  // },
  // weekEndDaysStyle: {
  //   backgroundColor: colors.theme.lightSecondary,
  // },
  // todayStyle: {
  //   borderWidth: 2,
  //   borderRadius: 50,
  //   borderColor: colors.theme.lightGreen
  // }
});
