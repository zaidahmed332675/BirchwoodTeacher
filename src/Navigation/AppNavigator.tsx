import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomBackground } from '../Components/BottomBackground';
import { Header } from '../Components/Header';
import { LeaveForm } from '../Components/LeaveForm';
import { MarkAttendanceBtn } from '../Components/MarkAttendanceBtn';
import ChangePassword from '../Screens/ChangePassword';
import HomeScreen from '../Screens/Home';
import MyClass from '../Screens/MyClass';
import { EMainStack, MainStackParams } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';
import ActivityNavigator from './ActivityNavigator';
import AttendanceNavigator from './AttendanceNavigator';
import ChatNavigator from './ChatNavigator';
import DiaryNavigator from './DiaryNavigator';
import ProfileNavigator from './ProfileNavigator';
import { appShadow, colors } from '../theme/colors';

const Stack = createStackNavigator<MainStackParams>();

const AppNavigator = () => {
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(true);
  const [isApplyingLeave, setIsApplyingLeave] = useState(false);

  const handleLeave = () => {
    setIsApplyingLeave(true);
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.theme.white },
    content: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 10,
    },
    card: {
      flex: 1,
      borderRadius: 20,
      paddingVertical: 30,
      marginBottom: 30,
      ...appShadow(4),
    },
  });

  if (!isAttendanceMarked) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          {isApplyingLeave ? (
            <View style={styles.card}>
              <LeaveForm />
            </View>
          ) : (
            <View style={styles.card}>
              <MarkAttendanceBtn
                onPress={() => setIsAttendanceMarked(true)}
                handleLeave={handleLeave}
              />
            </View>
          )}
        </View>
        <BottomBackground />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={EMainStack.activityRoutes}
      screenOptions={NavigationOptions}>
      <Stack.Screen name={EMainStack.home} component={HomeScreen} />
      <Stack.Screen
        name={EMainStack.profileRoutes}
        component={ProfileNavigator}
      />
      <Stack.Screen name={EMainStack.myClass} component={MyClass} />
      <Stack.Screen
        name={EMainStack.activityRoutes}
        component={ActivityNavigator}
      />
      <Stack.Screen name={EMainStack.diaryRoutes} component={DiaryNavigator} />
      <Stack.Screen name={EMainStack.chatRoutes} component={ChatNavigator} />
      <Stack.Screen
        name={EMainStack.attendanceRoutes}
        component={AttendanceNavigator}
      />
      <Stack.Screen
        name={EMainStack.changePassword}
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
