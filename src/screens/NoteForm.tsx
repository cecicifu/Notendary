import {styles} from '../styles/global'
import {Text, Button, Input} from '@rneui/themed'
import {TextInput, View} from 'react-native'
import React, {createRef, useEffect, useState} from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RoutesStackParamList} from '../navigation/AppNavigation'

const NoteForm = ({
  navigation,
}: NativeStackScreenProps<RoutesStackParamList>) => {
  const [dateInput, setDateInput] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const dateRef = createRef<TextInput>()

  const showDatePicker = () => {
    dateRef.current?.blur()
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    setDateInput(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`)
    hideDatePicker()
  }

  const saveNote = () => {
    // save stuffs

    return navigation.goBack()
  }

  return (
    <View style={styles.defaultView}>
      <Text
        h3
        h3Style={{fontFamily: 'sans-serif-thin'}}
        style={{marginTop: 10, textAlign: 'center'}}>
        New note
      </Text>
      <Input placeholder="Title" />
      <Input numberOfLines={2} multiline placeholder="Description" />
      <Input
        ref={dateRef}
        onFocus={() => showDatePicker()}
        value={dateInput}
        showSoftInputOnFocus={false}
        rightIcon={{name: 'calendar-today', color: '#000'}}
        placeholder="Date"
      />
      <View style={styles.buttonsInline}>
        <Button
          icon={{name: 'save', color: '#fff'}}
          style={styles.button}
          title="Save"
          color="#83AF9B"
          size="lg"
          onPress={() => saveNote()}
        />
        <Button
          icon={{name: 'chevron-left', color: '#fff'}}
          style={styles.button}
          color="#FE4365"
          containerStyle={{marginLeft: 30}}
          size="lg"
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}

export default NoteForm
