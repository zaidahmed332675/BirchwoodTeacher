import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { io } from 'socket.io-client';
import { Attendance } from '../Components/Attendance';
import { BottomBackground } from '../Components/BottomBackground';
import { Header } from '../Components/Header';
import { LeaveForm } from '../Components/LeaveForm';
import ChangePassword from '../Screens/ChangePassword';
import HomeScreen from '../Screens/Home';
import { useAppDispatch, useAppSelector } from '../Stores/hooks';
import { setChatRoomMessage } from '../Stores/slices/class.slice';
import { setLikeDislike, setLoveUnlove } from '../Stores/slices/post.slice';
import { selectUserProfile } from '../Stores/slices/user.slice';
import { EMainStack, MainStackParams } from '../Types/NavigationTypes';
import { NavigationOptions, attendanceEnum } from '../Utils/options';
import { appShadow, colors } from '../theme/colors';
import AttendanceNavigator from './AttendanceNavigator';
import ChatNavigator from './ChatNavigator';
import ClassNavigator from './ClassNavigator';
import DiaryNavigator from './DiaryNavigator';
import PostNavigator from './PostNavigator';
import ProfileNavigator from './ProfileNavigator';
import TimetableNavigator from './TimetableNavigator';

const Stack = createStackNavigator<MainStackParams>();

export const socket = io("https://darkmodelabs.com:8201");

const AppNavigator = () => {
  const [isApplyingLeave, setIsApplyingLeave] = useState(false);
  const [skipCheckIn, setSkipCheckIn] = useState(false);

  const profile = useAppSelector(selectUserProfile);

  const dispatch = useAppDispatch()

  const handleNewMessage = (record: any) => {
    let { sender, reciever, ...data } = record
    dispatch(setChatRoomMessage({
      chatRoomId: record?.chat,
      message: {
        sender: sender?._id,
        ...data
      }
    }))
  }

  const handlePostInteraction = (record: any) => {
    let { userId, postId, interactionType } = record

    if (userId === profile._id) return

    console.log(record, profile._id, 'record')
    if (['like', 'unlike'].includes(interactionType)) {
      dispatch(setLikeDislike({
        _id: postId,
        userId
      }))
    } else if (['love', 'unlove'].includes(interactionType)) {
      dispatch(setLoveUnlove({
        _id: postId,
        userId
      }))
    }
  }

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('setup', { _id: '66607840143e17e55bc48d77' }); // Teacher
      socket.emit('join chat', '66c8a613d2d70bdd407d28f4'); // Chat Id
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection failed:', error);
    });

    socket.on('message', handleNewMessage)
    socket.on('postInteraction', handlePostInteraction)

    return () => {
      socket.off('message', handleNewMessage)
      socket.off('postInteraction', handlePostInteraction)
      socket.disconnect();
    }
  }, [])

  if (!attendanceEnum[profile?.todayAttendance?.status] && !profile.checkIn && !skipCheckIn) {
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
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 10,
    ...appShadow(4),
  },
});

export default AppNavigator;
