import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TimeTable from '../Screens/TimeTable';
import CreateTimeTable from '../Screens/TimeTable/CreateTimeTable';
import { ETimeTableStack, TimeTableStackParams } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';

const Stack = createStackNavigator<TimeTableStackParams>();

const TimetableNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ETimeTableStack.timeTable}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={ETimeTableStack.timeTable} component={TimeTable} />
      <Stack.Screen
        name={ETimeTableStack.createTimeTable}
        component={CreateTimeTable}
      />
    </Stack.Navigator>
  );
};

export default TimetableNavigator;
