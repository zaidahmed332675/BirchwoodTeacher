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
import { vw } from '../../Utils/units';
import { colors } from '../../theme/colors';
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
        text="Check-In"
      />

      <GlroyBold
        _style={{
          fontSize: vw * 5,
          textAlign: 'center',
          color: colors.theme.white,
        }}
        text="Press Here"
      />
    </TouchableOpacity>
  );
};

export const Attendance = ({ handleLeave }: { handleLeave: () => void }) => {
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

    // console.log(checkInDateTime)

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
            ? 'Please ensure to check in on time'
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
          'Reminder: If you have not yet checked in, please do so to avoid being marked absent'
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
        color={colors.theme.primary}
        unfilledColor={colors.theme.secondary}
        borderWidth={0}
        progress={(progress || 1) / 100}
        formatText={() => FormatedText({ onPress: onSubmit })}
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
    // paddingVertical: 30,
  },
});
