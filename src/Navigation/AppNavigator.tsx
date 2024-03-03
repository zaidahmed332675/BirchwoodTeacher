import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { EMainStack, MainStackParams } from '../Types/NavigationTypes';
import HomeScreen from '../Screens/Home';
import { NavigationOptions } from '../Utils/options';
import ProfileNavigator from './ProfileNavigator';
import ActivityNavigator from './ActivityNavigator';
import DiaryNavigator from './DiaryNavigator';
import ChatNavigator from './ChatNavigator';
import AttendanceNavigator from './AttendanceNavigator';
import { MarkAttendanceBtn } from '../Components/MarkAttendanceBtn';
import { Header } from '../Components/Header';
import { View } from 'react-native';
import { BottomBackground } from '../Components/BottomBackground';

const Stack = createStackNavigator<MainStackParams>();

const AppNavigator = () => {
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(true);

  if (!isAttendanceMarked) {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <MarkAttendanceBtn onPress={() => setIsAttendanceMarked(true)} />
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
