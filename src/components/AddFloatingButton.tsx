import {SpeedDial} from '@rneui/themed'
import {useFocusEffect} from '@react-navigation/native'
import React, {useCallback, useState} from 'react'

interface AddFloatingButtonProps {
  eventAction: () => void
  categoryAction: () => void
}

const AddFloatingButton = ({
  eventAction,
  categoryAction,
}: AddFloatingButtonProps) => {
  const [open, setOpen] = useState(false)

  useFocusEffect(
    useCallback(() => {
      setOpen(false)
    }, []),
  )

  return (
    <SpeedDial
      isOpen={open}
      icon={{name: 'add', color: '#fff'}}
      openIcon={{name: 'close', color: '#fff'}}
      iconContainerStyle={{backgroundColor: '#FE4365'}}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}>
      <SpeedDial.Action
        icon={{name: 'add', color: '#fff'}}
        iconContainerStyle={{backgroundColor: '#FE4365'}}
        title="Add event"
        onPress={eventAction}
      />
      <SpeedDial.Action
        icon={{name: 'add', color: '#fff'}}
        iconContainerStyle={{backgroundColor: '#FE4365'}}
        title="Add category"
        onPress={categoryAction}
      />
    </SpeedDial>
  )
}

export default AddFloatingButton
