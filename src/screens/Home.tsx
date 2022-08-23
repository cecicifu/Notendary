import {Avatar, Text} from '@rneui/themed'
import {Calendar} from 'react-native-calendars'
import {styles} from '../styles/global'
import {View} from 'react-native'
import AddFloatingButton from '../components/AddFloatingButton'
import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RoutesStackParamList } from '../App'

const Home = ({navigation}: NativeStackScreenProps<RoutesStackParamList>) => {
  return (
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
        eventAction={() => navigation.navigate("NoteForm")}
        categoryAction={() => console.log('Add event')}
      />
    </View>
  )
}

export default Home
