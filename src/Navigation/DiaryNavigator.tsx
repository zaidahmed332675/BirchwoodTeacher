import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Diary from '../Screens/Diary';
import CreateDiary from '../Screens/Diary/CreateDiary';
import { DiaryStackParams, EDiaryStack } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';

const Stack = createStackNavigator<DiaryStackParams>();

const DiaryNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EDiaryStack.diary}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={EDiaryStack.diary} component={Diary} />
      <Stack.Screen name={EDiaryStack.createDiary} component={CreateDiary} />
    </Stack.Navigator>
  );
};

export default DiaryNavigator;
