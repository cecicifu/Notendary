import {createTable, getAllNotes} from './services/notes.service'
import {Note} from './models/Note'
import {SafeAreaView, ScrollView, StatusBar} from 'react-native'
import AppNavigation from './navigation/AppNavigation'
import React, {useCallback, useEffect, useState} from 'react'

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
        <AppNavigation />
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
