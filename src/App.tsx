import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createTable, getAllNotes} from './services/notes.service'
import {NavigationContainer} from '@react-navigation/native'
import {Note} from './models/note.type'
import {SafeAreaView, ScrollView, StatusBar} from 'react-native'
import Home from './screens/Home'
import NoteForm from './screens/NoteForm'
import React, {useCallback, useEffect, useState} from 'react'

export type RoutesStackParamList = {
  Home: undefined
  NoteForm: undefined
}

const Stack = createNativeStackNavigator()

const App = () => {
  const [notes, setNotes] = useState<Note[] | null>(null)

  const initDB = useCallback(async () => {
    await createTable()
    const storeNotes = await getAllNotes()

    if (storeNotes.length) return setNotes(storeNotes)
  }, [])

  useEffect(() => {
    initDB()
  }, [initDB])

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        contentContainerStyle={{height: '100%'}}
        contentInsetAdjustmentBehavior="automatic">
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="NoteForm" component={NoteForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
