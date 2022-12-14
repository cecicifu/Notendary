import {Avatar, Text, Dialog, Button, Divider} from '@rneui/themed'
import {Calendar, DateData} from 'react-native-calendars'
import {CalendarMark, notesToCalendarMark} from '../mappers/noteMapper'
import {
  deleteNoteById,
  getAllNotes,
  getAllNotesByDate,
} from '../services/notes.service'
import {formatTimeForHumans} from '../utils/helpers'
import {globalStyles} from '../styles/global'
import {Modal, View} from 'react-native'
import {Note} from '../models/Note'
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
    setNotes(notesToCalendarMark(allNotes))
  }

  const selectedDayHandler = async (day: DateData) => {
    const notes = await getAllNotesByDate(day.dateString)
    if (!notes.length) return

    setModalVisible(true)
    setNotesFromSelectedDay(notes)
  }

  const deleteNoteHandler = async (noteId: Note['id']) => {
    deleteNoteById(noteId)

    const newNotesFromSelectedDay = notesFromSelectedDay?.filter(
      noteFromSelectedDay => noteFromSelectedDay.id !== noteId,
    )

    getAllNotesHandler()

    if (newNotesFromSelectedDay?.length)
      return setNotesFromSelectedDay(newNotesFromSelectedDay)

    setModalVisible(false)
  }

  return (
    <View style={globalStyles.defaultView}>
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
          containerStyle={{marginRight: 10, backgroundColor: '#DEB99D'}}
        />
      </View>

      <Calendar
        markingType="multi-dot"
        markedDates={notes as CalendarMark}
        theme={{
          calendarBackground: '#ffffff',
          todayTextColor: '#FE4365',
          arrowColor: '#FE4365',
          dotStyle: {width: 20, height: 2},
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
      <AddFloatingButton
        noteAction={() => navigation.navigate('NoteForm')}
        categoryAction={() => console.log('Add category')}
      />
      <Dialog
        ModalComponent={Modal}
        isVisible={modalVisible}
        onPressOut={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
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
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontWeight: 'bold'}}>
                        {formatTimeForHumans(note.datetime)}
                      </Text>
                      <Text style={{marginHorizontal: 8}}>|</Text>
                      <Text>{note.title}</Text>
                    </View>
                    <Button
                      size="sm"
                      buttonStyle={{backgroundColor: '#FE4365'}}
                      onPress={() => deleteNoteHandler(note.id)}>
                      Delete
                    </Button>
                  </View>
                  {Boolean(note.description) && <Text>{note.description}</Text>}
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
