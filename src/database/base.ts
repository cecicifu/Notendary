import {SQLiteDatabase} from 'react-native-sqlite-storage'
import {
  DBConnection,
  executeSql,
  executeToGetAll,
  executeToGetOne,
} from './sqlite'

type SQLType = SQLiteDatabase

export const getDBConnection = () => DBConnection()

export const getAll = <T>(db: SQLType, query: string) =>
  executeToGetAll<T>(db, query)

export const getById = <T>(db: SQLType, query: string) =>
  executeToGetOne<T>(db, query)

export const execute = (db: SQLType, query: string) => executeSql(db, query)
