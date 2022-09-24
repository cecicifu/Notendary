import {toIsoString} from '../utils/helpers'
import {FIELD_ERRORS} from '../utils/constants'
import {globalStyles} from '../styles/global'
import {saveNote} from '../services/notes.service'
import {StyleSheet, TextInput, View} from 'react-native'
import {Text, Button, Input} from '@rneui/themed'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import React, {createRef, useState} from 'react'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RoutesStackParamList} from '../navigation/AppNavigation'

type FormFields = {
  title: string
  description: string
  date: string
}

const NoteForm = ({
  navigation,
}: NativeStackScreenProps<RoutesStackParamList>) => {
  const [form, setForm] = useState<FormFields>({
    title: '',
    description: '',
    date: '',
  })

  const [error, setError] = useState('')
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
    setForm(prev => ({
      ...prev,
      date: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    }))
    hideDatePicker()
  }

  const handleSave = async () => {
    if (!form.title || !form.date) return setError(FIELD_ERRORS.FIELD_MANDATORY)

    const note = {
      title: form.title,
      description: form.description,
      datetime: toIsoString(new Date(form.date)),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    saveNote(note)

    navigation.goBack()
  }

  return (
    <View style={globalStyles.defaultView}>
      <Text
        h3
        h3Style={{fontFamily: 'sans-serif-thin'}}
        style={{marginTop: 10, textAlign: 'center'}}>
        New note
      </Text>
      <Input
        label="Title"
        errorMessage={!form.title ? error : ''}
        onChangeText={value => setForm(prev => ({...prev, title: value}))}
      />
      <Input
        label="Description"
        onChangeText={value => setForm(prev => ({...prev, description: value}))}
        numberOfLines={2}
        multiline
      />
      <Input
        label="Date"
        errorMessage={!form.date ? error : ''}
        ref={dateRef}
        onFocus={() => showDatePicker()}
        value={form.date}
        showSoftInputOnFocus={false}
        rightIcon={{
          name: 'calendar-today',
          color: '#000',
          onPress: () => setDatePickerVisibility(true),
        }}
      />
      <View style={styles.buttonsInline}>
        <Button
          icon={{name: 'save', color: '#fff'}}
          title="Save"
          color="#72B896"
          size="lg"
          onPress={() => handleSave()}
        />
        <Button
          icon={{name: 'chevron-left', color: '#fff'}}
          color="#FE4365"
          containerStyle={{marginLeft: 32}}
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

const styles = StyleSheet.create({
  buttonsInline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
})

export default NoteForm
