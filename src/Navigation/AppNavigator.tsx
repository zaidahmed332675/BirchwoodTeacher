import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { EMainStack, MainStackParams } from '../Types/NavigationTypes';
import HomeScreen from '../Screens/HomeScreen';
import { NavigationOptions } from '../Utils/options';
import ProfileNavigator from './ProfileNavigator';
import ActivityNavigator from './ActivityNavigator';
import DiaryNavigator from './DiaryNavigator';
import ChatNavigator from './ChatNavigator';
import AttendanceNavigator from './AttendanceNavigator';

const Stack = createStackNavigator<MainStackParams>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EMainStack.home}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={EMainStack.home} component={HomeScreen} />
      <Stack.Screen
        name={EMainStack.profileRoutes}
        component={ProfileNavigator}
      />
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
        name={EAuthStack.emailVerification}
        component={EmailVerification}
      />
      <Stack.Screen
        name={EAuthStack.verificaionCode}
        component={VerificationCode}
      />
      <Stack.Screen name={EAuthStack.resetPassword} component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
