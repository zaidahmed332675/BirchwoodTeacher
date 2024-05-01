import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Profile from '../Screens/Profile';
import EditEducation from '../Screens/Profile/EditEducation';
import EditExperience from '../Screens/Profile/EditExperience';
import EditPersonalInfo from '../Screens/Profile/EditPersonalInfo';
import { EProfileStack, ProfileStackParams } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';

const Stack = createStackNavigator<ProfileStackParams>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EProfileStack.profile}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={EProfileStack.profile} component={Profile} />
      <Stack.Screen
        name={EProfileStack.editPersonalInfo}
        component={EditPersonalInfo}
      />
      <Stack.Screen
        name={EProfileStack.editEducation}
        component={EditEducation}
      />
      <Stack.Screen
        name={EProfileStack.editExperience}
        component={EditExperience}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
