import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { colors } from '../../theme/colors';
import VIcon from '../VIcon';

interface AppDatePickerProps {
  style?: object;
}

const perfectSize = (val: any) => val;
const PrevIcon = () => (
  <VIcon
    type="Ionicons"
    // onPress={() => navigation.goBack()}
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
    // onPress={() => navigation.goBack()}
    name="chevron-forward-outline"
    size={22}
    color={colors.theme.primary}
    style={{
      paddingRight: 15,
    }}
  />
);

const AppDatePicker = ({ style }: AppDatePickerProps) => {
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
          return { textStyle: styles.daysStyle };
        }}
        customDatesStyles={date => {
          if (date.getDay() === 0) {
            return {
              style: {
                backgroundColor: colors.theme.greyAlt2,
              },
              textStyle: {
                color: colors.theme.black,
              },
            };
          } else {
            return { textStyle: styles.daysStyle };
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
    paddingVertical: perfectSize(6),
    width: '100%',
  },
  selectedRangeStartStyle: {
    backgroundColor: colors.theme.primary,
    borderTopLeftRadius: perfectSize(6),
    borderBottomLeftRadius: perfectSize(6),
  },
  selectedRangeEndStyle: {
    backgroundColor: colors.theme.primary,
    borderTopRightRadius: perfectSize(6),
    borderBottomRightRadius: perfectSize(6),
  },
  selectedRangeStyle: {
    backgroundColor: colors.theme.primary,
  },
  nextTitleStyle: {
    color: colors.theme.greyAlt,
    fontSize: perfectSize(12),
  },
  previousTitleStyle: {
    color: colors.theme.greyAlt,
    fontSize: perfectSize(12),
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
  daysStyle: {
    fontSize: perfectSize(13),
    lineHeight: perfectSize(18),
    color: '#94A3B8',
  },
});

export default AppDatePicker;
