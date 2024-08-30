import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useEffect } from 'react';
import { AppLoader } from '../Components/AppLoader';
import { useAppDispatch, useAppSelector } from '../Stores/hooks';
import { selectAppLoader } from '../Stores/slices/common.slice';
import {
  selectUserToken,
} from '../Stores/slices/user.slice';
import { ERootStack, RootStackParams } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { io } from "socket.io-client";
import { setChatRoomMessage } from '../Stores/slices/class.slice';

const Stack = createStackNavigator<RootStackParams>();

export const socket = io("https://darkmodelabs.com:8201");

const AppRouting = () => {
  const token = useAppSelector(selectUserToken);
  const loader = useAppSelector(selectAppLoader);

  const dispatch = useAppDispatch()

  const handleNewMessage = (record: any) => {
    let { sender, reciever, ...data } = record
    dispatch(setChatRoomMessage({
      chatRoomId: record?.chat,
      message: {
        sender: sender?._id,
        ...data
      }
    }))
  }

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('setup', { _id: '66607840143e17e55bc48d77' }); // Teacher
      socket.emit('join chat', '66c8a613d2d70bdd407d28f4'); // Chat Id
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection failed:', error);
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
