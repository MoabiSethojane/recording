import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import {Audio} from 'expo-av';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import {NavigationContainer} from '@react-navigation/native-stack'
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MyStack;