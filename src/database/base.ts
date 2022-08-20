import {SQLiteDatabase} from 'react-native-sqlite-storage'
import {
  DBConnection,
  executeSql,
  executeSqltoGetAll,
  executeSqltoGetOne,
} from './sqlite'

type SQLType = SQLiteDatabase

export const getDBConnection = () => DBConnection()

export const getAll = <T>(db: SQLType, query: string) =>
  executeSqltoGetAll<T>(db, query)

export const getById = <T>(db: SQLType, query: string) =>
  executeSqltoGetOne<T>(db, query)

export const execute = (db: SQLType, query: string) => executeSql(db, query)
