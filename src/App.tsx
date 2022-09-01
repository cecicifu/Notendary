import {createTable} from './services/notes.service'
import {SafeAreaView, ScrollView, StatusBar} from 'react-native'
import AppNavigation from './navigation/AppNavigation'
import React, {useCallback, useEffect} from 'react'

const App = () => {
  useEffect(() => {
    initDB()
  }, [])

  const initDB = useCallback(async () => {
    await createTable()
  }, [])

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        contentContainerStyle={{height: '100%'}}
        contentInsetAdjustmentBehavior="automatic">
        <AppNavigation />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
