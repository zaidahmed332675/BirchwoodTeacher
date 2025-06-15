import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import checkIn from '../../Assets/images/check-in.png';
import { asyncCheckInUser } from '../../Stores/actions/user.action';
import { useAppDispatch } from '../../Stores/hooks';
import { appShadow, colors } from '../../Theme/colors';
import { EMainStack, MainStackParams } from '../../Types/NavigationTypes';
import { vh, vw } from '../../Utils/units';
import { AppButton } from '../Button';
import { GrayMediumText } from '../GrayMediumText';
import { ImageBox } from '../UploadImage';
interface FormatTextProps {
  onPress: (event: GestureResponderEvent) => void;
}

function formatTime12Hour(date: any) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const parts = formatter.formatToParts(date);
  const hour = parts.find(p => p.type === 'hour')?.value.padStart(2, '0');
  const minute = parts.find(p => p.type === 'minute')?.value;
  const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value;

  return `${hour}:${minute} ${dayPeriod}`;
}

const formatDate = (date: any) => {
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };

  const dateString = date.toLocaleDateString('en-US', dateOptions); // "Wednesday, March 19, 2025"

  const [weekday, rest, year] = dateString.split(', ');
  return `${rest}, ${year} -  ${weekday}`;
};

const FormatedText = ({ onPress }: FormatTextProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        borderRadius: (vw * 60) / 2,
        ...appShadow(5),
      }}>
      <LinearGradient
        colors={[colors.theme.primary, colors.theme.secondary]}
        locations={[0, 1]}
        style={{
          borderRadius: (vw * 60) / 2,
          width: vw * 50,
          height: vh * 23,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBox image={{ uri: undefined }} imagePlaceholder={checkIn} _imageStyle={{
          width: 50,
          height: 50,
          borderRadius: 0,
        }} />
        <GrayMediumText
          _style={{
            fontSize: vh * 3,
            textAlign: 'center',
            color: colors.theme.white,
          }}
          text="CHECK IN"
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const Attendance = ({ handleLeave, handleSkip }: { handleLeave: () => void, handleSkip: () => void }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MainStackParams>>();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <GrayMediumText
          _style={styles.titleTime}
          text={formatTime12Hour(currentTime)}
        />
        <GrayMediumText
          _style={styles.titleDate}
          text={formatDate(currentTime)}
        />
        <FormatedText onPress={onSubmit} />
        <AppButton
          title="Apply for leave"
          btnStyle={styles.btnLeave}
          onPress={handleLeave}
        />
        {/* <TouchableOpacity onPress={handleSkip}>
          <GrayMediumText
            _style={styles.skipText}
            text={`Want to skip this \n check-in and continue?`}
          />
        </TouchableOpacity> */}
      </View>
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
    paddingHorizontal: vw * 7, // 20
    paddingVertical: vh * 1.2, // 6
    borderColor: colors.theme.darkGray,
    marginTop: vh * 3, // 20
    ...appShadow(5, colors.theme.darkGray),
  },
  titleTime: {
    color: colors.theme.black,
    fontSize: vh * 5,
    fontWeight: '800',
    textAlign: 'center',
  },
  titleDate: {
    color: colors.theme.greyAlt2,
    fontSize: vh * 2,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: vh * 3, // 20
  },
  skipText: {
    color: colors.theme.primary,
    fontSize: vh * 1.89,
    textAlign: 'center',
  }
});
