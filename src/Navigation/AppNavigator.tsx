import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomBackground } from '../Components/BottomBackground';
import { Header } from '../Components/Header';
import { LeaveForm } from '../Components/LeaveForm';
import { Attendance } from '../Components/Attendance';
import ChangePassword from '../Screens/ChangePassword';
import HomeScreen from '../Screens/Home';
import MyClass from '../Screens/MyClass';
import { EMainStack, MainStackParams } from '../Types/NavigationTypes';
import { attendanceEnum, NavigationOptions } from '../Utils/options';
import ActivityNavigator from './ActivityNavigator';
import AttendanceNavigator from './AttendanceNavigator';
import ChatNavigator from './ChatNavigator';
import DiaryNavigator from './DiaryNavigator';
import ProfileNavigator from './ProfileNavigator';
import { appShadow, colors } from '../theme/colors';
import StudentInfo from '../Screens/MyClass/StudentInfo';
import { useAppSelector } from '../Stores/hooks';
import { selectUserProfile } from '../Stores/slices/user.slice';

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

  console.log(profile, 'checko');

  if (!attendanceEnum.includes(profile?.newAttendance?.status ?? '')) {
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
      <Stack.Screen name={EMainStack.myClass} component={MyClass} />
      <Stack.Screen name={EMainStack.studentInfo} component={StudentInfo} />
      <Stack.Screen
        name={EMainStack.activityRoutes}
        component={ActivityNavigator}
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
