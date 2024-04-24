import { addHours, format, isAfter, isBefore, startOfToday } from 'date-fns';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
import { AppButton } from '../Button';
import { GlroyBold } from '../GlroyBoldText';
import { GrayMediumText } from '../GrayMediumText';

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
      {seconds ? (
        <GrayMediumText
          _style={{
            fontSize: vw * 4,
            textAlign: 'center',
            color: colors.theme.white,
            fontWeight: 'normal',
          }}
          text="To record your check-in"
        />
      ) : null}
      <GlroyBold
        _style={{
          fontSize: vw * 4,
          textAlign: 'center',
          color: colors.theme.white,
        }}
        text={!seconds ? 'Continue To App\nPress Here' : 'Press Here'}
      />
    </TouchableOpacity>
  );
};

export const MarkAttendanceBtn = ({
  onPress,
  handleLeave,
}: {
  onPress: () => void;
  handleLeave: () => void;
}) => {
  const totalSeconds = useRef(0);
  const checkInTime = useMemo(() => addHours(startOfToday(), 13), []);
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const currentTime = new Date();
    if (isAfter(currentTime, checkInTime)) {
      setSeconds(0);
      setProgress(0);
    } else if (isBefore(currentTime, checkInTime)) {
      const remainingSeconds = Math.floor(
        (checkInTime.getTime() - currentTime.getTime()) / 1000
      );
      totalSeconds.current = remainingSeconds;
      setSeconds(remainingSeconds);

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
    }
  }, [checkInTime]);

  useEffect(() => {
    setProgress((seconds / totalSeconds.current) * 100);
  }, [seconds]);

  return (
    <View style={styles.container}>
      <AppButton
        title="Apply for leave"
        btnStyle={{
          paddingHorizontal: 20,
          paddingVertical: 6,
          backgroundColor: colors.theme.darkRed,
          borderColor: colors.theme.darkRed,
          marginBottom: 20,
        }}
        onPress={handleLeave}
      />
      <GrayMediumText
        _style={{
          color: colors.theme.primary,
          fontSize: vw * 5,
          textAlign: 'center',
          marginBottom: 10,
        }}
        text={
          !seconds
            ? 'You missed the check-in\nPlease ensure to check in on time'
            : "Please record today's check-in"
        }
      />
      <GrayMediumText
        _style={{
          color: colors.theme.primary,
          fontSize: vw * 3,
          textAlign: 'center',
          fontWeight: 'normal',
        }}
        text={
          'Reminder: If you have not yet checked in, please do so before \n9 AM to avoid being marked absent'
        }
      />
      <View
        style={{
          backgroundColor: colors.theme.primary,
          paddingVertical: 8,
          width: vw * 70,
          borderRadius: 50,
          marginVertical: 20,
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
        color={seconds ? colors.theme.primary : colors.theme.secondary}
        unfilledColor={colors.theme.secondary}
        borderWidth={0}
        progress={(progress || 1) / 100}
        formatText={() => FormatedText({ seconds, onPress })}
        strokeCap="round"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
