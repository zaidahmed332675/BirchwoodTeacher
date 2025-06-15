import { NavigationProp, useNavigation } from '@react-navigation/native';
import { addHours, format, isAfter, isBefore, startOfToday } from 'date-fns';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { asyncCheckInUser } from '../../Stores/actions/user.action';
import { useAppDispatch } from '../../Stores/hooks';
import { EMainStack, MainStackParams } from '../../Types/NavigationTypes';
import { vh, vw } from '../../Utils/units';
import { colors } from '../../Theme/colors';
import { AppButton } from '../Button';
import { GlroyBold } from '../GlroyBoldText';
import { GrayMediumText } from '../GrayMediumText';

interface FormatTextProps {
  onPress: (event: GestureResponderEvent) => void;
}

const FormatedText = ({ onPress }: FormatTextProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        backgroundColor: colors.theme.secondary,
        width: vw * 60,
        height: vh * 28.42,
        borderRadius: (vw * 60) / 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <GrayMediumText
        _style={{
          fontSize: vh * 5.71,
          textAlign: 'center',
          color: colors.theme.white,
        }}
        text="Check-In"
      />

      <GlroyBold
        _style={{
          fontSize: vh * 2.37,
          textAlign: 'center',
          color: colors.theme.white,
        }}
        text="Press Here"
      />
    </TouchableOpacity>
  );
};

export const Attendance = ({ handleLeave, handleSkip }: { handleLeave: () => void, handleSkip: () => void }) => {
  const totalSeconds = useRef(0);
  const checkInTime = useMemo(() => addHours(startOfToday(), 8), []);
  const [progress] = useState(100);
  const [seconds, setSeconds] = useState(0);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MainStackParams>>();

  useEffect(() => {
    const currentTime = new Date();
    if (isAfter(currentTime, checkInTime)) {
      setSeconds(0);
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

  const onSubmit = useCallback(async () => {
    const date = new Date();
    const checkInDateTime = date.toISOString();

    const res = await dispatch(
      asyncCheckInUser({ checkIn: checkInDateTime })
    ).unwrap();
    if (res.status) {
      navigation.navigate(EMainStack.home);
    }
  }, [navigation, dispatch]);

  return (
    <View style={styles.container}>
      <AppButton
        title="Apply for leave"
        btnStyle={styles.btnLeave}
        onPress={handleLeave}
      />
      <GrayMediumText
        _style={styles.title}
        text={
          !seconds
            ? 'Please ensure to check in on time'
            : "Please record today's check-in"
        }
      />
      <GrayMediumText
        _style={styles.desc}
        text={
          'Reminder: If you have not yet checked in, please do so to avoid being marked absent'
        }
      />
      <View
        style={styles.dateLabel}>
        <GrayMediumText
          _style={styles.dateLabelText}
          text={format(new Date(), 'LLLL dd yyyy')}
        />
      </View>
      {/* <Progress.Circle
        size={vw * 80}
        thickness={25}
        showsText={true}
        color={colors.theme.primary}
        unfilledColor={colors.theme.secondary}
        borderWidth={0}
        progress={(progress || 1) / 100}
        formatText={() => FormatedText({ onPress: onSubmit })}
        strokeCap="round"
      /> */}
      <TouchableOpacity onPress={handleSkip}>
        <GrayMediumText
          _style={styles.skipText}
          text={`Want to skip this \n check-in and continue?`}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw * 2.78, // 10
  },
  btnLeave: {
    paddingHorizontal: vw * 5.56, // 20
    paddingVertical: vh * 0.79, // 6
    backgroundColor: colors.theme.darkRed,
    borderColor: colors.theme.darkRed,
    marginBottom: vh * 2.63, // 20
  },
  title: {
    color: colors.theme.primary,
    fontSize: vh * 2.37,
    textAlign: 'center',
    marginBottom: vh * 1.32, // 10
  },
  desc: {
    color: colors.theme.primary,
    fontSize: vh * 1.42,
    textAlign: 'center',
    fontWeight: 'normal',
  },
  dateLabel: {
    backgroundColor: colors.theme.primary,
    paddingVertical: vh * 1.05, // 8
    width: vw * 70,
    borderRadius: 50,
    marginVertical: vh * 2.63, // 20
  },
  dateLabelText: {
    color: colors.theme.white,
    textAlign: 'center',
    fontSize: vh * 2.84,
  },
  skipText: {
    color: colors.theme.primary,
    fontSize: vh * 1.89,
    textAlign: 'center',
    marginTop: vh * 6.58, // 50
  }
});
