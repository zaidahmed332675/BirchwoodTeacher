import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { vh, vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import { GrayMediumText } from '../GrayMediumText';

const AttendanceCard = ({ item }) => {
  if (item.isAttendance) {
    return (
      <View style={[styles.container, { borderColor: colors.theme.darkRed }]}>
        <View
          style={[styles.leftBorder, { backgroundColor: colors.theme.darkRed }]}
        />
        <View style={styles.content}>
          <GrayMediumText
            text="Absent"
            _style={{ color: colors.theme.black }}
          />
          <View
            style={[
              styles.dataContainer,
              { backgroundColor: colors.theme.lightRed },
            ]}>
            <Text style={[styles.dataTitle, { color: colors.theme.darkRed }]}>
              {item.data}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (item.isFestival) {
    return (
      <View style={[styles.container, { borderColor: colors.theme.darkGreen }]}>
        <View
          style={[
            styles.leftBorder,
            { backgroundColor: colors.theme.darkGreen },
          ]}
        />
        <View style={styles.content}>
          <GrayMediumText
            text="Festival & Holidays"
            _style={{ color: colors.theme.black }}
          />
          <View
            style={[
              styles.dataContainer,
              { backgroundColor: colors.theme.lightGreen },
            ]}>
            <Text style={[styles.dataTitle, { color: colors.theme.darkGreen }]}>
              {item.data}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export { AttendanceCard };

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
  },
});
