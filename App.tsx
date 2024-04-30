import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/presentation/features/home/home_screen';
import CartScreen from './src/presentation/features/cart/cart_screen';
import PaymentScreen from './src/presentation/features/payment/payment_screen';
import TabNavigator from './src/presentation/components/navigation/tab_navigator';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen name='cart' component={CartScreen} options={{animation: 'slide_from_bottom'}}/>
        <Stack.Screen name='payment' component={PaymentScreen} options={{animation: 'slide_from_bottom'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})