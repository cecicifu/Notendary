import {styles} from '../styles/global'
import {Text, Button} from '@rneui/themed'
import {View} from 'react-native'
import React from 'react'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {RoutesStackParamList} from '../navigation/AppNavigation'

const NoteForm = ({
  navigation,
}: NativeStackScreenProps<RoutesStackParamList>) => {
  return (
    <View style={styles.defaultView}>
      <Text>holaa</Text>
      <Button title="Ir atras" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default NoteForm
