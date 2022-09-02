import {Avatar, Text, Dialog, Button, Divider} from '@rneui/themed'
import {Calendar, DateData} from 'react-native-calendars'
import {CalendarMark, notesToCalendarMark} from '../mappers/noteMapper'
import {
  deleteNote,
  getAllNotes,
  getAllNotesByDate,
} from '../services/notes.service'
import {Modal, View} from 'react-native'
import {Note} from '../models/Note'
import {styles} from '../styles/global'
import {useFocusEffect} from '@react-navigation/native'
import AddFloatingButton from '../components/AddFloatingButton'
import React, {useCallback, useState} from 'react'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RoutesStackParamList} from '../navigation/AppNavigation'

const Home = ({navigation}: NativeStackScreenProps<RoutesStackParamList>) => {
  const [notes, setNotes] = useState<CalendarMark | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [notesFromSelectedDay, setNotesFromSelectedDay] = useState<
    Note[] | null
  >(null)

  useFocusEffect(
    useCallback(() => {
      getAllNotesHandler()
    }, []),
  )

  const getAllNotesHandler = async () => {
    const allNotes = await getAllNotes()
    if (allNotes.length) setNotes(notesToCalendarMark(allNotes))
  }

  const selectedDayHandler = async (day: DateData) => {
    const notes = await getAllNotesByDate(day.dateString)
    if (!notes.length) return

    setModalVisible(true)
    setNotesFromSelectedDay(notes)
  }

  const deleteNoteHandler = async (noteId: number) => {
    deleteNote(noteId)

    const newNotesFromSelectedDay = notesFromSelectedDay?.filter(
      noteFromSelectedDay => noteFromSelectedDay.id !== noteId,
    )

    setNotes(null)
    getAllNotesHandler()

    if (newNotesFromSelectedDay?.length)
      return setNotesFromSelectedDay(newNotesFromSelectedDay)

    setModalVisible(false)
  }

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
        markedDates={notes as CalendarMark}
        theme={{
          calendarBackground: '#ffffff',
          todayTextColor: '#FE4365',
          arrowColor: '#FE4365',
        }}
        onDayPress={day => selectedDayHandler(day)}
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
        You can add notes using the + button
      </Text>
      <AddFloatingButton
        noteAction={() => navigation.navigate('NoteForm')}
        categoryAction={() => console.log('Add category')}
      />
      <Dialog
        ModalComponent={Modal}
        isVisible={modalVisible}
        onPressOut={() => setModalVisible(false)}>
        {notesFromSelectedDay && (
          <>
            <View style={{marginBottom: 16}}>
              <Dialog.Title
                title={new Date(
                  notesFromSelectedDay[0].datetime,
                ).toLocaleDateString()}
              />
              <Divider />
            </View>
            {notesFromSelectedDay.map(note => {
              return (
                <View key={note.id} style={{marginBottom: 16}}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Text style={{fontWeight: 'bold'}}>
                        {new Date(note.datetime).toLocaleTimeString()}
                      </Text>
                      <Text style={{marginHorizontal: 8}}>|</Text>
                      <Text>{note.title}</Text>
                    </View>
                    <Button
                      size="sm"
                      type="outline"
                      titleStyle={{color: 'red'}}
                      buttonStyle={{borderColor: 'red'}}
                      onPress={() => deleteNoteHandler(note.id)}>
                      Delete
                    </Button>
                  </View>
                  <Text>{note.description}</Text>
                </View>
              )
            })}
          </>
        )}
      </Dialog>
    </View>
  )
}

export default Home
