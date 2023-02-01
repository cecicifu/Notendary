import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage'

enablePromise(true)

export const DBConnection = async () =>
  openDatabase({
    name: 'notendary-data',
    location: 'default',
  })

export const executeSqltoGetAll = async <T>(
  db: SQLiteDatabase,
  query: string,
) => {
  try {
    const customResults: T[] = []

    const queryResults = await executeSql(db, query)

    queryResults.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        customResults.push(result.rows.item(index))
      }
    })

    return customResults
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get all')
  }
}

export const executeSqltoGetOne = async <T>(
  db: SQLiteDatabase,
  query: string,
) => {
  try {
    const queryResults = await executeSql(db, query)

    return queryResults[0].rows.item(0) as T
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get one')
  }
}

export const executeSql = async (db: SQLiteDatabase, query: string) => {
  try {
    return await db.executeSql(query)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to execute the query')
  }
}
