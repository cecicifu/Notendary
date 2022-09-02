import {MarkingProps} from 'react-native-calendars/src/calendar/day/marking'
import {Note} from '../models/Note'

export type CalendarMark = {
  [key: string]: MarkingProps
}

export const notesToCalendarMark = (notes: Note[]) => {
  const noteMap: CalendarMark = {}

  notes.forEach(note => {
    noteMap[note.datetime.split('T')[0]] = {
      dots: [
        {
          color: '#F9CDAD',
        },
      ],
    }
  })

  return noteMap
}
