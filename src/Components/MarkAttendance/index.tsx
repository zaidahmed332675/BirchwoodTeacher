import React from 'react';
import { StyleSheet, View } from 'react-native';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import GrayMediumText from '../GrayMediumText';
import { MarkAttendanceBtn } from '../MarkAttendanceBtn';

const MarkAttendance = () => {
  return (
    <View style={styles.container}>
      <MarkAttendanceBtn />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: vw * 85,
        }}>
        <View
          style={{
            backgroundColor: colors.theme.primary,
            padding: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '33%',
          }}>
          <GrayMediumText
            text="24"
            _style={{ fontSize: 30, color: colors.theme.white }}
          />
          <GrayMediumText
            text="Total Days"
            _style={{ color: colors.theme.white }}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.theme.primary,
            padding: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '33%',
          }}>
          <GrayMediumText
            text="30"
            _style={{ fontSize: 30, color: colors.theme.white }}
          />
          <GrayMediumText
            text="Attendance"
            _style={{ color: colors.theme.white }}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.theme.primary,
            padding: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexBasis: '33%',
          }}>
          <GrayMediumText
            text="0"
            _style={{ fontSize: 30, color: colors.theme.white }}
          />
          <GrayMediumText
            text="Leaves"
            _style={{ color: colors.theme.white }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
});

export { MarkAttendance };
