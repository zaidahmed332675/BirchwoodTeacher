import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ERootStack, RootStackParams } from '../Types/NavigationTypes';
import AuthNavigator from './AuthNavigator';
import { NavigationOptions } from '../Utils/options';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator<RootStackParams>();

const AppRouting = () => {
  return (
    <NavigationContainer>
      {/* {loader && <Loader />} */}
      <Stack.Navigator
        initialRouteName={ERootStack.main}
        screenOptions={NavigationOptions}>
        {/* {!token ? ( */}
        <Stack.Screen name={ERootStack.auth} component={AuthNavigator} />
        {/* ) : ( */}
        <Stack.Screen name={ERootStack.main} component={AppNavigator} />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouting;
