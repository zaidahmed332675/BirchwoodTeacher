import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Attendance } from '../Components/Attendance';
import { BottomBackground } from '../Components/BottomBackground';
import { Header } from '../Components/Header';
import { LeaveForm } from '../Components/LeaveForm';
import ChangePassword from '../Screens/ChangePassword';
import HomeScreen from '../Screens/Home';
import { useAppSelector } from '../Stores/hooks';
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

const Stack = createStackNavigator<MainStackParams>();

const AppNavigator = () => {
  const [isApplyingLeave, setIsApplyingLeave] = useState(false);
  const profile = useAppSelector(selectUserProfile);

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

  if (!attendanceEnum[profile?.newAttendance?.status] && !profile.checkIn) {
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
              <Attendance handleLeave={() => setIsApplyingLeave(true)} />
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
        name={EMainStack.changePassword}
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
