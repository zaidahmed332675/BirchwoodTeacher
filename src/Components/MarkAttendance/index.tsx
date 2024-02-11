import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import GrayMediumText from '../GrayMediumText';

const FormatedText = () => (
  <TouchableOpacity
    style={{
      backgroundColor: colors.theme.primary,
      width: vw * 60,
      height: vw * 60,
      borderRadius: vw * 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <GrayMediumText
      _style={{ fontSize: vw * 12, color: colors.theme.white }}
      text="Marked"
    />
  </TouchableOpacity>
);

const MarkAttendance: React.FC = () => {
  const [progress, setProgress] = useState(80);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => (prevProgress < 100 ? prevProgress + 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <GrayMediumText
        _style={{
          color: colors.theme.primary,
          fontSize: vw * 5,
        }}
        text="Please record today's attendance."
      />
      <View
        style={{
          backgroundColor: colors.theme.primary,
          marginTop: 18,
          paddingVertical: 8,
          width: vw * 70,
          borderRadius: 50,
        }}>
        <GrayMediumText
          _style={{
            color: colors.theme.white,
            textAlign: 'center',
            fontSize: vw * 6,
          }}
          text={format(new Date(), 'LLLL d yyyy')}
        />
      </View>
      <Progress.Circle
        size={vw * 80}
        thickness={30}
        showsText={true}
        color={colors.theme.primary}
        unfilledColor={colors.theme.secondary}
        borderWidth={0}
        progress={(progress || 1) / 100}
        formatText={FormatedText}
        strokeCap="round"
        style={{
          marginVertical: 40,
        }}
      />
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
            _style={{ color: colors.theme.white, wordWrap: 'break-word' }}
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
