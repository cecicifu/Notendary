import {Note} from '../models/Note'
import {execute, getAll, getById, getDBConnection} from '../database/base'

const TABLE_NAME = 'notes'

export const createTable = async () => {
  const db = await getDBConnection()

  const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
    title TEXT NOT NULL,
    description TEXT,
    datetime DATETIME NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME
  );`

  await execute(db, query)
}

export const getAllNotes = async () => {
  const db = await getDBConnection()

  const query = `SELECT rowid as id, title, description, datetime, createdAt, updatedAt FROM ${TABLE_NAME}`

  return getAll<Note>(db, query)
}

export const getNoteById = async (noteId: number) => {
  const db = await getDBConnection()

  const query = `SELECT rowid as id, title, description, datetime, createdAt, updatedAt FROM ${TABLE_NAME} WHERE id = ${noteId} LIMIT 1`

  return getById<Note>(db, query)
}

export const saveNotes = async (notes: Note[]) => {
  const db = await getDBConnection()

  const query =
    `INSERT OR REPLACE INTO ${TABLE_NAME} (title, description, datetime, createdAt, updatedAt) VALUES` +
    notes
      .map(
        note =>
          `('${note.title}', '${note.description}', '${note.datetime}', '${note.createdAt}', '${note.updatedAt}')`,
      )
      .join(',')

  await execute(db, query)
}

export const saveNote = async (note: Note) => {
  const db = await getDBConnection()

  const query = `INSERT OR REPLACE INTO ${TABLE_NAME} (title, description, datetime, createdAt, updatedAt) VALUES ('${note.title}', '${note.description}', '${note.datetime}', '${note.createdAt}', '${note.updatedAt}')`

  await execute(db, query)
}

export const deleteNote = async (id: number) => {
  const db = await getDBConnection()

  const query = `DELETE from ${TABLE_NAME} WHERE rowid = ${id}`

  await execute(db, query)
}

export const deleteTable = async () => {
  const db = await getDBConnection()

  const query = `drop table ${TABLE_NAME}`

  await execute(db, query)
}
