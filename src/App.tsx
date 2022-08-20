import React, {useCallback, useEffect, useState} from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import {Calendar} from 'react-native-calendars'
import {Text, Avatar} from '@rneui/themed'
import AddFloatingButton from './components/AddFloatingButton'
import {createTable, getAllNotes, saveNotes} from './services/notes.service'
import {Note} from './models/note.type'

const App = () => {
  const [notes, setNotes] = useState<Note[]>()

  const initDB = useCallback(async () => {
    try {
      const initNotes: Note[] = [
        {
          id: 0,
          title: '0 note',
          description: 'the description',
          datetime: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 1,
          title: '1 note',
          description: 'the description',
          datetime: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: '2 note',
          description: 'the description',
          datetime: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 3,
          title: '3 note',
          description: 'the description',
          datetime: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
      await createTable()
      const storeNotes = await getAllNotes()

      if (storeNotes.length) return setNotes(storeNotes)

      await saveNotes(initNotes)
      setNotes(storeNotes)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    initDB()
  }, [initDB])

  useEffect(() => {
    console.log(notes)
  }, [notes])

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        contentContainerStyle={{height: '100%'}}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.defaultView}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 45, marginLeft: 10}}>Notendary</Text>
            <Avatar
              size="medium"
              rounded
              title="CC"
              onPress={() => console.log('Profile')}
              containerStyle={{marginRight: 10, backgroundColor: '#83AF9B'}}
            />
          </View>

          <Calendar
            theme={{
              calendarBackground: '#ffffff',
              todayTextColor: '#FE4365',
              arrowColor: '#FE4365',
            }}
            onDayPress={day => {
              console.log('selected day', day)
            }}
            monthFormat={'MMMM - yyyy'}
            onMonthChange={month => {
              console.log('month changed', month)
            }}
            firstDay={1}
            onPressArrowLeft={subtractMonth => subtractMonth()}
            onPressArrowRight={addMonth => addMonth()}
            disableAllTouchEventsForDisabledDays={true}
            enableSwipeMonths={true}
          />
          <Text style={styles.infoText}>
            You can add new events clicking on a day or using the "+" button
          </Text>
          <AddFloatingButton
            eventAction={() => console.log('Add event')}
            categoryAction={() => console.log('Add event')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  defaultView: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
    width: 300,
    display: 'flex',
    alignSelf: 'center',
  },
})

export default App
