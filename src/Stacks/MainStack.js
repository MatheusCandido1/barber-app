import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../Screens/Preload';
import SignIn from '../Screens/SignIn';
import SignUp from '../Screens/SignUp';

import MainTab from '../Stacks/MainTab';

import Barber from '../Screens/Barber';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
    <Stack.Screen name="Preload" component={Preload} />
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="Barber" component={Barber} />
    </Stack.Navigator>
);