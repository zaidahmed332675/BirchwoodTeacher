import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Attendance } from '../Components/Attendance';
import { BottomBackground } from '../Components/BottomBackground';
import { Header } from '../Components/Header';
import { LeaveForm } from '../Components/LeaveForm';
import ChangePassword from '../Screens/ChangePassword';
import HomeScreen from '../Screens/Home';
import { useAppDispatch, useAppSelector } from '../Stores/hooks';
import { setLikeDislike, setLoveUnlove } from '../Stores/slices/post.slice';
import { selectUserProfile, setUser } from '../Stores/slices/user.slice';
import { EMainStack, MainStackParams } from '../Types/NavigationTypes';
import { NavigationOptions, attendanceEnum } from '../Utils/options';
import { appShadow, colors } from '../Theme/colors';
import AttendanceNavigator from './AttendanceNavigator';
import ChatNavigator from './ChatNavigator';
import ClassNavigator from './ClassNavigator';
import DiaryNavigator from './DiaryNavigator';
import PostNavigator from './PostNavigator';
import ProfileNavigator from './ProfileNavigator';
import TimetableNavigator from './TimetableNavigator';
import { socket } from '../Utils/socket';
import { ClassRoom } from '../Types/Class';
import { vh, vw } from '../Utils/units';
import useSocket from '../hooks/useSocket';

const Stack = createStackNavigator<MainStackParams>();

const AppNavigator = () => {
  const [isApplyingLeave, setIsApplyingLeave] = useState(false);
  const [skipCheckIn, setSkipCheckIn] = useState(false);

  const profile = useAppSelector(selectUserProfile);
  useSocket(profile);

  const dispatch = useAppDispatch()

  const handleClassAssignByAdmin = (record: any) => {
    dispatch(setUser({ classroom: { _id: record.classroom } as ClassRoom }))
  }

  // useEffect(() => {
  //   console.log("Connecting Socket!!");
  //   socket.on('connect', () => {
  //     console.log("Socket Server Connected");
  //     socket.emit('setup', { _id: profile._id });
  //   });

  //   socket.on("connected", () => {
  //     console.log("User Socket Connected");
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('User Socket Disconnected');
  //   });

  //   socket.on('connect_error', (error) => {
  //     console.error('User Socket Connection failed:', error);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [profile?._id]);

  useEffect(() => {
    socket.on('classNotice', handleClassAssignByAdmin);

    return () => {
      socket.off('classNotice', handleClassAssignByAdmin);
    };
  }, []);

  if (!attendanceEnum[profile?.todayAttendance?.status] && !skipCheckIn) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          {isApplyingLeave ? (
            <View style={styles.card}>
              <LeaveForm />
            </View>
          ) : (
            <View style={[styles.card, { justifyContent: 'center' }]}>
              <Attendance handleLeave={() => setIsApplyingLeave(true)} handleSkip={() => { setSkipCheckIn(true) }} />
            </View>
          )}
        </View>
        <BottomBackground />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={EMainStack.home}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={EMainStack.home} component={HomeScreen} />
      <Stack.Screen
        name={EMainStack.profileRoutes}
        component={ProfileNavigator}
      />
      <Stack.Screen name={EMainStack.myClassRoutes} component={ClassNavigator} />
      <Stack.Screen
        name={EMainStack.postRoutes}
        component={PostNavigator}
      />
      <Stack.Screen name={EMainStack.diaryRoutes} component={DiaryNavigator} />
      <Stack.Screen name={EMainStack.chatRoutes} component={ChatNavigator} />
      <Stack.Screen
        name={EMainStack.attendanceRoutes}
        component={AttendanceNavigator}
      />
      <Stack.Screen
        name={EMainStack.timeTableRoutes}
        component={TimetableNavigator}
      />
      <Stack.Screen
        name={EMainStack.changePassword}
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.theme.white },
  content: {
    flex: 1,
    paddingHorizontal: vw * 2.78, // 10
    paddingTop: vh * 1.32, // 10
  },
  card: {
    flex: 1,
    borderRadius: 20,
    marginBottom: vh * 1.32, // 10
    ...appShadow(4),
  },
});

export default AppNavigator;
