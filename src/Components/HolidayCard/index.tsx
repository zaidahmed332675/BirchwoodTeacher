import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { vh, vw } from '../../Utils/units';
import { colors } from '../../Theme/colors';
import { Holiday } from '../../types/User';
import { GrayMediumText } from '../GrayMediumText';

export const HolidayCard = ({ holiday }: { holiday: Holiday }) => {
  return (
    <View style={styles.container}>
      <GrayMediumText
        text={holiday.name}
        _style={{ color: colors.theme.black }}
      />
      <View style={styles.contentBody}>
        <GrayMediumText
          text={format(holiday.date, 'do MMMM yy')}
          _style={{ color: colors.theme.grey }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: vw * 3.7,
    borderWidth: 1,
    borderColor: colors.theme.greyAlt,
    borderRadius: 10,
    paddingVertical: vh * 1.32, // 10
    paddingHorizontal: vw * 2.78, // 10
  },
  contentBody: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: vh * 1.32, // 10
  },
  date: {
    fontSize: vh * 1.58, // 12
  },
});
