import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Chat from '../Screens/Chat';
import CreateChat from '../Screens/Chat/CreateChat';
import { ChatStackParams, EChatStack } from '../Types/NavigationTypes';
import { colors } from '../theme/colors';

const Stack = createStackNavigator<ChatStackParams>();

const ChatNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EChatStack.chat}
      screenOptions={{
        headerStyle: {
          borderTopWidth: 0,
          borderBottomWidth: 0,
          backgroundColor: colors.theme.primary,
        },
        headerTitleStyle: {
          color: colors.text.white,
          fontSize: 18,
        },
        headerTintColor: colors.theme.primary,
      }}>
      <Stack.Screen
        name={EChatStack.chat}
        options={{
          headerTitle: 'Chats',
        }}
        component={Chat}
      />
      <Stack.Screen name={EChatStack.createChat} component={CreateChat} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
