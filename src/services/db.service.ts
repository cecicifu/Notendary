import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage'
import type {Note} from '../models/note.type'

const TABLE_NAME = 'notes'

enablePromise(true)

export const getDBConnection = async () => {
  try {
    const db = await openDatabase({
      name: 'notendary-data.db',
      location: 'default',
    })
    console.log('Database connected')
    return db
  } catch (error) {
    console.error(error)
    throw Error("Error - Database can't connect")
  }
}

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
      title TEXT NOT NULL,
      description TEXT,
      datetime DATETIME NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME
    );`

  await db.executeSql(query)
}

export const getNotes = async (db: SQLiteDatabase): Promise<Note[]> => {
  try {
    const Notes: Note[] = []

    const query = await db.executeSql(
      `SELECT rowid as id, title, description, datetime, createdAt, updatedAt FROM ${TABLE_NAME}`,
    )

    query.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        Notes.push(result.rows.item(index))
      }
    })

    return Notes
  } catch (error) {
    console.error(error)
    throw Error('Failed to get notes!')
  }
}

export const saveNote = async (db: SQLiteDatabase, notes: Note[]) => {
  const query =
    `INSERT OR REPLACE INTO ${TABLE_NAME}(rowid, title, description, datetime, createdAt, updatedAt) values` +
    notes
      .map(
        note =>
          `(${note.id}, '${note.title}', '${note.description}', '${note.datetime}', '${note.createdAt}', '${note.updatedAt}')`,
      )
      .join(',')

  return db.executeSql(query)
}

export const deleteNote = async (db: SQLiteDatabase, id: number) => {
  const query = `DELETE from ${TABLE_NAME} where rowid = ${id}`

  await db.executeSql(query)
}

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${TABLE_NAME}`

  await db.executeSql(query)
}
