import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import MainStack from './MainStack';
import { createStackNavigator } from '@react-navigation/stack';
import { ERootStack, RootStackParams } from '../Types/NavigationTypes';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator<RootStackParams>();

const AppRouting = () => {
  return (
    <NavigationContainer>
      {/* {loader && <Loader />} */}
      <Stack.Navigator
        initialRouteName={ERootStack.auth}
        // screenOptions={{headerShown: false}}
      >
        {/* {!token ? ( */}
        <Stack.Screen name={ERootStack.auth} component={AuthNavigator} />
        {/* ) : ( */}
        {/* <Stack.Screen name={ERootStack.main} component={AppDrawer} /> */}
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouting;
