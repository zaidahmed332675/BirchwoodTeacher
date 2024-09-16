import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { vh, vw } from '../../Utils/units';
import { colors } from '../../Theme/colors';
import { GrayMediumText } from '../GrayMediumText';
import { attendanceEnum } from '../../Utils/options';

type AttendanceCardProps = {
  title: string;
  type: string;
  count: number;
};

export const AttendanceCard = ({ title, type, count }: AttendanceCardProps) => {
  let [dark, light] =
    type === attendanceEnum.PRESENT
      ? [colors.theme.darkGreen, colors.theme.lightGreen]
      : type === attendanceEnum.ABSENT
      ? [colors.theme.darkRed, colors.theme.lightRed]
      : [colors.theme.secondary, colors.theme.lightSecondary];

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: dark,
        },
      ]}>
      <View style={[styles.leftBorder, { backgroundColor: dark }]} />
      <View style={styles.content}>
        <GrayMediumText text={title} _style={{ color: colors.theme.black }} />
        <View style={[styles.dataContainer, { backgroundColor: light }]}>
          <Text style={[styles.dataTitle, { color: dark }]}>
            {String(count).padStart(2, '0')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: vw * 3.7,
    height: vh * 6,
    borderWidth: 1,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  leftBorder: {
    height: '100%',
    width: 13,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  dataContainer: {
    borderRadius: 100,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    // minWidth: 10,
    // minHeight: 10,
    borderRadius: 100,
  },
});
