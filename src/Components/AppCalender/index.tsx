import { compareAsc, format } from 'date-fns';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { colors } from '../../theme/colors';
import { VIcon } from '../VIcon';

interface AppCalenderProps {
  data: Record<string, any>;
  calenderMonthYear: Date;
  handleMonthChange: (date: Date) => void;
  style?: object;
}

const PrevIcon = () => (
  <VIcon
    type="Ionicons"
    name="chevron-back-outline"
    size={22}
    color={colors.theme.primary}
    style={{
      paddingLeft: 15,
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
      paddingRight: 15,
    }}
  />
);

export const AppCalender = ({
  data,
  calenderMonthYear,
  handleMonthChange,
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
        customDatesStyles={date => {
          let calenderDate = format(date, 'yyyy-MM-dd');
          let calenderDateUserEntry = data[calenderDate];

          const isDateMatched =
            !isNaN(
              compareAsc(calenderDate, calenderDateUserEntry?.checkInDate)
            ) || undefined;

          if (date.getDay() === 0) {
            return {
              style: styles.weekEndDaysStyle,
            };
          } else if (isDateMatched && calenderDateUserEntry?.checkIn) {
            return {
              style: styles.presentDaysStyle,
              textStyle: styles.textStyle,
            };
          } else if (isDateMatched && !calenderDateUserEntry?.checkIn) {
            return {
              style: styles.absentDaysStyle,
              textStyle: styles.textStyle,
            };
          } else {
            return { textStyle: styles.daysLabelStyle };
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    overflow: 'hidden',
    paddingVertical: 6,
    width: '100%',
  },
  selectedRangeStartStyle: {
    backgroundColor: colors.theme.primary,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  selectedRangeEndStyle: {
    backgroundColor: colors.theme.primary,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  selectedRangeStyle: {
    backgroundColor: colors.theme.primary,
  },
  nextTitleStyle: {
    color: colors.theme.greyAlt,
    fontSize: 12,
  },
  previousTitleStyle: {
    color: colors.theme.greyAlt,
    fontSize: 12,
  },
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
    fontSize: 13,
  },
  textStyle: {
    color: colors.theme.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
  presentDaysStyle: {
    backgroundColor: colors.theme.darkGreen,
  },
  absentDaysStyle: {
    backgroundColor: colors.theme.darkRed,
  },
  weekEndDaysStyle: {
    backgroundColor: colors.theme.lightSecondary,
  },
});
