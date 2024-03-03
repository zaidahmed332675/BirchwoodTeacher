import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import GrayMediumText from '../GrayMediumText';
import GlroyBold from '../GlroyBoldText';

interface FormatTextProps {
  seconds: number;
  onPress: () => void;
}

const FormatedText = ({ seconds, onPress }: FormatTextProps) => {
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 60 / 60);
    const minutes = Math.floor((timeInSeconds / 60) % 60);
    seconds = Math.floor(timeInSeconds % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.theme.secondary,
        width: vw * 60,
        height: vw * 60,
        borderRadius: vw * 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GrayMediumText
        _style={{
          fontSize: vw * 12,
          textAlign: 'center',
          color: colors.theme.white,
        }}
        text={formatTime(seconds)}
      />
      <GrayMediumText
        _style={{
          fontSize: vw * 4,
          textAlign: 'center',
          color: colors.theme.white,
          fontWeight: 'normal',
        }}
        text="To record your attendance"
      />
      <GlroyBold
        _style={{
          fontSize: vw * 4,
          textAlign: 'center',
          color: colors.theme.white,
        }}
        text="Press Here"
      />
    </TouchableOpacity>
  );
};

const MarkAttendanceBtn = ({ onPress }: { onPress: () => void }) => {
  const totalSeconds = 7200;
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(totalSeconds);

    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 0) {
          clearInterval(interval);
          return 0;
        } else {
          return prevSeconds - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setProgress((seconds / totalSeconds) * 100);
  }, [seconds]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ marginVertical: 20 }}>
        <GrayMediumText
          _style={{
            color: colors.theme.primary,
            fontSize: vw * 3,
            textAlign: 'center',
          }}
          text="Skip attendance? Navigate to the homepage"
        />
      </TouchableOpacity>
      <GrayMediumText
        _style={{
          color: colors.theme.primary,
          fontSize: vw * 5,
        }}
        text="Please record today's attendance"
      />
      <GrayMediumText
        _style={{
          color: colors.theme.primary,
          fontSize: vw * 3,
          textAlign: 'center',
          fontWeight: 'normal',
        }}
        text="Reminder: If you have not yet marked your attendance, please do so before 9 AM to avoid being marked absent"
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
          text={format(new Date(), 'LLLL dd yyyy')}
        />
      </View>
      <Progress.Circle
        size={vw * 80}
        thickness={25}
        showsText={true}
        color={colors.theme.primary}
        unfilledColor={colors.theme.secondary}
        borderWidth={0}
        progress={(progress || 1) / 100}
        formatText={() => FormatedText({ seconds, onPress })}
        strokeCap="round"
        style={{
          marginVertical: 40,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
});

export { MarkAttendanceBtn };
