import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppLoader } from '../Components/AppLoader';
import { useAppSelector } from '../Stores/hooks';
import { selectAppLoader } from '../Stores/slices/common.slice';
import {
  selectUserToken,
} from '../Stores/slices/user.slice';
import { ERootStack, RootStackParams } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator<RootStackParams>();

const AppRouting = () => {
  const token = useAppSelector(selectUserToken);
  const loader = useAppSelector(selectAppLoader);

  return (
    <NavigationContainer>
      {loader && <AppLoader />}
      <Stack.Navigator
        initialRouteName={ERootStack.auth}
        screenOptions={NavigationOptions}>
        {!token ? (
          <Stack.Screen name={ERootStack.auth} component={AuthNavigator} />
        ) : (
          <Stack.Screen name={ERootStack.main} component={AppNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouting;
