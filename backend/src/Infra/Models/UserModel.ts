import { MainModel } from './MainModel'
import { User } from '../../Domain/Entities/User'

/**
 * ! USER MODEL
 * * The user model class
 */
export class UserModel extends MainModel {

  /**
   * ! CREATE USER
   * * Creates a new user in the database
   *
   * @param {string} id
   *  The ID of the user to be created
   *
   * @return {Promise<void>}
   *  A promise that resolves when the user is created, or rejects with an error
   */
  public createUser = (id: string): Promise<void> => {
    this.query = `INSERT INTO User (id) VALUES ($id)`

    return new Promise<void>((resolve, reject) => {
      this.db.run(this.query, { $id: id }, (err) => {

        if (err) {
          reject(err)
          return
        }

        resolve()
      })
    })
  }

  /**
   * ! READ USER
   * * Reads a user from the database by its ID
   *
   * @param {string} id
   *  The ID of the user to be retrieved
   *
   * @return {Promise<User>}
   *  A promise that resolves with the user data, or rejects with an error
   */
  public readUser = (id: string): Promise<User> => {
    this.query = `SELECT * FROM User WHERE id='${id}'`

    return new Promise<User>((resolve, reject) => {
      this.db.get(this.query, (err, row: User) => {

        if (err) {
          reject(new Error(`${err}`))
          return
        }

        if (row === undefined) reject(new Error('User not found !'))

        resolve(row)
      })
    })
  }
}
