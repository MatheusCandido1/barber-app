import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './src/Contexts/UserContext';
import MainStack from './src/Stacks/MainStack';
import 'react-native-gesture-handler';

export default () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}