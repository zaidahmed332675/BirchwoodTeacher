import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ActivityStackParams, EActivityStack } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';
import ActivityList from '../Screens/Activity';
import Activity from '../Screens/Activity/Activity';
import CreateActivity from '../Screens/Activity/CreateActivity';

const Stack = createStackNavigator<ActivityStackParams>();

const ActivityNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EActivityStack.activities}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={EActivityStack.activities} component={ActivityList} />
      <Stack.Screen name={EActivityStack.activity} component={Activity} />
      <Stack.Screen
        name={EActivityStack.createActivity}
        component={CreateActivity}
      />
    </Stack.Navigator>
  );
};

export default ActivityNavigator;
