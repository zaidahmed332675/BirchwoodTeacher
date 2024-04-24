import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { colors } from '../../theme/colors';
import { VIcon } from '../VIcon';

interface AppDatePickerProps {
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

export const AppDatePicker = ({ style }: AppDatePickerProps) => {
  const [selectedStartDate, setSelectedStartDate] = useState<string>('');

  const onDateChange = (date: any) => {
    setSelectedStartDate(date);
  };

  const startDate: string = selectedStartDate
    ? selectedStartDate?.toString()
    : '';

  console.log(startDate);

  return (
    <View style={[styles.container, style]}>
      <CalendarPicker
        initialDate={new Date()}
        startFromMonday={true}
        showDayStragglers={true}
        dayShape="circle"
        onDateChange={onDateChange}
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
          if (date.getDay() === 0) {
            return {
              style: styles.weekEndDaysStyle,
            };
          } else if (date.getDate() === 1) {
            return {
              style: styles.presentDaysStyle,
              textStyle: styles.textStyle,
            };
          } else if (date.getDate() === 2) {
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
