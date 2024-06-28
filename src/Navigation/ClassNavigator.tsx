import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyClass from '../Screens/MyClass';
import ChildInfo from '../Screens/MyClass/ChildInfo';
import { ClassStackParams, EClassStack } from '../Types/NavigationTypes';
import { NavigationOptions } from '../Utils/options';

const Stack = createStackNavigator<ClassStackParams>();

const ClassNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={EClassStack.class}
            screenOptions={NavigationOptions}>
            <Stack.Screen name={EClassStack.class} component={MyClass} />
            <Stack.Screen name={EClassStack.childInfo} component={ChildInfo} />
        </Stack.Navigator>
    );
};

export default ClassNavigator;
