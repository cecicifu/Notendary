import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'
import Home from '../screens/Home'
import NoteForm from '../screens/NoteForm'
import React from 'react'

export type RoutesStackParamList = {
  Home: undefined
  NoteForm: undefined
}

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NoteForm" component={NoteForm} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
