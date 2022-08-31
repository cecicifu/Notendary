import {styles} from '../styles/global'
import {Text, Button, Input} from '@rneui/themed'
import {View} from 'react-native'
import React from 'react'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RoutesStackParamList} from '../navigation/AppNavigation'

const NoteForm = ({
  navigation,
}: NativeStackScreenProps<RoutesStackParamList>) => {
  return (
    <View style={styles.defaultView}>
      <Text h3 h3Style={{fontFamily: 'sans-serif-thin'}} style={{marginTop: 10, textAlign: 'center'}}>
        New note
      </Text>
      <Input placeholder="Title" />
      <Input numberOfLines={2} multiline placeholder="Description" />
      <Input placeholder="Date" />
      <View style={styles.buttonsInline}>
        <Button style={styles.button} title="Save" color="#83AF9B" size="lg" />
        <Button
          style={styles.button}
          color="#FE4365"
          containerStyle={{marginLeft: 30}}
          size="lg"
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  )
}

export default NoteForm
