import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Chat from '../Screens/Chat';
import CreateChat from '../Screens/Chat/CreateChat';
import { ChatStackParams, EChatStack } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';

const Stack = createStackNavigator<ChatStackParams>();

const ChatNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EChatStack.chat}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={EChatStack.chat} component={Chat} />
      <Stack.Screen name={EChatStack.createChat} component={CreateChat} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
