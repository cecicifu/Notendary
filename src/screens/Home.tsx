import {Avatar, Text} from '@rneui/themed'
import {Calendar} from 'react-native-calendars'
import {getAllNotes} from '../services/notes.service'
import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking'
import {styles} from '../styles/global'
import {useFocusEffect} from '@react-navigation/native'
import {View} from 'react-native'
import AddFloatingButton from '../components/AddFloatingButton'
import React, {useCallback, useState} from 'react'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RoutesStackParamList} from '../navigation/AppNavigation'

type NoteMap = {
  [key: string]: MarkingProps
}

const Home = ({navigation}: NativeStackScreenProps<RoutesStackParamList>) => {
  const [notes, setNotes] = useState<NoteMap | null>(null)

  useFocusEffect(
    useCallback(() => {
      getAllNotes().then(notes => {
        if (notes.length) {
          const noteMap: NoteMap = {}
          notes.forEach(note => {
            noteMap[note.datetime.split('T')[0]] = {
              dots: [
                {
                  color: 'black',
                },
              ],
            }
          })
          setNotes(noteMap)
        }
      })
    }, []),
  )

  return (
    <View style={styles.defaultView}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text
          h1
          h1Style={{fontFamily: 'sans-serif-thin'}}
          style={{marginLeft: 10}}>
          Notendary
        </Text>
        <Avatar
          size="medium"
          rounded
          title="CC"
          onPress={() => console.log('Profile')}
          containerStyle={{marginRight: 10, backgroundColor: '#83AF9B'}}
        />
      </View>

      <Calendar
        markingType="multi-dot"
        markedDates={notes as NoteMap}
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
        hideExtraDays
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
      />
      <Text style={styles.infoText}>
        You can add notes clicking on a day or using the + button
      </Text>
      <AddFloatingButton
        noteAction={() => navigation.navigate('NoteForm')}
        categoryAction={() => console.log('Add category')}
      />
    </View>
  )
}

export default Home
