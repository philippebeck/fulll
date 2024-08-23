import sqlite3 from 'sqlite3'

sqlite3.verbose()

/**
 * @var {sqlite3.Database} database
 * * The SQLite database instance
 */
let database: sqlite3.Database | undefined = undefined

/**
 * ! GET DATABASE
 * * Returns the SQLite database instance
 *
 * @return {sqlite3.Database}
 *  The SQLite database instance
 */
export const getDB = (): sqlite3.Database => {
  if (!database) throw new Error('No database available !')

  return database
}

/**
 * ! CREATE DATABASE
 * * Creates a new database connection at the specified path
 *
 * @param {string} path
 *  The path to the database file
 *
 * @return {Promise<void>}
 *  A promise that resolves when the database connection is established
 */
export const createDB = (path: string): Promise<void> => {
  if (database) throw new Error('Database already exists !')

  return new Promise<void>((resolve, reject) => {
    database = new sqlite3.Database(path, (err) => {

      if (err) reject(new Error(`Connection error to database: ${err} !`))
      else resolve(createTables())
    })
  })
}

/**
 * ! CLOSE DATABASE
 * * Closes the active database connection & resets the database instance
 */
export const closeDB = () => {

  if (database) database.close()
  database = undefined
}

/**
 * ! CREATE TABLES
 * * Creates the necessary database tables for the application
 *
 * @return {Promise<void>}
 *  A promise that resolves when the tables are created
 */
export const createTables = async (): Promise<void> => {
  const db = getDB()

  const userQuery = `CREATE TABLE IF NOT EXISTS User (id VARCHAR(64) PRIMARY KEY)`

  const fleetQuery = `CREATE TABLE IF NOT EXISTS Fleet (
    id VARCHAR(64) PRIMARY KEY,
    userId VARCHAR(64) NOT NULL,
    FOREIGN KEY(userId) REFERENCES User(id)
  )`

  const vehicleQuery = `CREATE TABLE IF NOT EXISTS Vehicle (
    id VARCHAR(64) PRIMARY KEY,
    fleetId VARCHAR(64) NOT NULL,
    plateNumber VARCHAR(64) NOT NULL,
    lat FLOAT,
    lng FLOAT,
    alt FLOAT,
    FOREIGN KEY(fleetId) REFERENCES Fleet(id)
  )`

  return new Promise<void>((resolve, reject) => {
    db.run(userQuery).run(fleetQuery).run(vehicleQuery, (err) => {

      if (err) reject(err)
      else resolve()
    })
  })
}

export default database
