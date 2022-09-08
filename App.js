import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from './screen/welcome';
import Home from './screen/home';
import Tasklist from './screen/task_List';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='welcome'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='welcome' component={Welcome} />
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='tasklist' component={Tasklist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
