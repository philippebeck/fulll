import sqlite3 from 'sqlite3'
import { getDB } from '..'

/**
 * ! MAIN MODEL
 * * The main model class
 */
export abstract class MainModel {

  /**
   * @property {sqlite3.Database} db
   * * The SQLite database instance
   */
  protected db: sqlite3.Database

  /**
   * @property {string} query
   * * The SQL query
   */
  protected query: string

  /**
   * @constructor
   * * Initializes a new instance of the MainModel class
   */
  constructor() {
    this.query = ''
    
    try {
      this.db = getDB()

    } catch (err) {
      console.error(err)
    }
  }
}
