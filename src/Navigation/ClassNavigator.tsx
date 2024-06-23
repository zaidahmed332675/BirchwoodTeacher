import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyClass from '../Screens/MyClass';
import StudentInfo from '../Screens/MyClass/StudentInfo';
import { ClassStackParams, EClassStack } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';

const Stack = createStackNavigator<ClassStackParams>();

const ClassNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={EClassStack.class}
            screenOptions={NavigationOptions}>
            <Stack.Screen name={EClassStack.class} component={MyClass} />
            <Stack.Screen name={EClassStack.studentInfo} component={StudentInfo} />
        </Stack.Navigator>
    );
};

export default ClassNavigator;
