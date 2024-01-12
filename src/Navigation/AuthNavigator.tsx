import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EmailVerification from '../Screens/Auth/EmailVerification';
import ResetPassword from '../Screens/Auth/ResetPassword';
import SignIn from '../Screens/Auth/SignIn';
import VerificationCode from '../Screens/Auth/VerificationCode';
import { AuthStackParams, EAuthStack } from '../Types/NavigationTypes';

const Stack = createStackNavigator<AuthStackParams>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EAuthStack.signIn}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={EAuthStack.signIn} component={SignIn} />
      <Stack.Screen
        name={EAuthStack.emailVerification}
        component={EmailVerification}
      />
      <Stack.Screen
        name={EAuthStack.verificaionCode}
        component={VerificationCode}
      />
      <Stack.Screen name={EAuthStack.resetPassword} component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
