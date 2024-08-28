import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
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
import { io } from "socket.io-client";

const Stack = createStackNavigator<RootStackParams>();

const socket = io("https://darkmodelabs.com:8201");

const AppRouting = () => {
  const token = useAppSelector(selectUserToken);
  const loader = useAppSelector(selectAppLoader);

  const handleNewMessage = (record: any) => {
    console.log(record, 'new message created')
  }

  useEffect(() => {
    console.log('working')
    socket.on('connection', (res) => {
      console.log(res, 'socket connection')
    })
    socket.on('connect', () => {
      console.log(true, 'connected');
    });
    socket.on('disconnect', () => {
      console.log(false, 'disconnected');
    });
    socket.on('message', handleNewMessage)
    return () => {
      socket.off('message', handleNewMessage)
      socket.disconnect();
    }
  }, [])

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
