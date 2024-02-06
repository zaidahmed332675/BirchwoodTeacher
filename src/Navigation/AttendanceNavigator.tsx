import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Attendance from '../Screens/Attendance';
import {
  AttendanceStackParams,
  EAttendanceStack,
} from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';

const Stack = createStackNavigator<AttendanceStackParams>();

const AttendanceNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EAttendanceStack.attendance}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={EAttendanceStack.attendance} component={Attendance} />
    </Stack.Navigator>
  );
};

export default AttendanceNavigator;
