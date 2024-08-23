import { MainModel } from './MainModel'
import { Fleet } from '../../Domain/Entities/Fleet'

/**
 * ! FLEET MODEL
 * * The fleet model class
 */
export class FleetModel extends MainModel {

  /**
   * ! CREATE FLEET
   * * Creates a new fleet in the database
   *
   * @param {string} id
   *  The ID of the fleet to be created
   * @param {string} userId
   *  The ID of the user creating the fleet
   *
   * @return {Promise<void>}
   *  A promise that resolves when the fleet is created, or rejects with an error
   */
  public createFleet = async (id: string, userId: string): Promise<void> => {
    this.query = `INSERT INTO Fleet (id, userId) VALUES ($id, $userId)`

    return new Promise<void>((resolve, reject) => {
      this.db.run(this.query, { $id: id, $userId: userId }, (err) => {

        if (err) {
          reject(err)
          return
        }

        resolve()
      })
    })
  }

  /**
   * ! READ FLEET
   * * Reads a fleet from the database by its ID
   *
   * @param {string} id
   *  The ID of the fleet to be retrieved
   *
   * @return {Promise<Fleet>}
   *  A promise that resolves with the fleet data, or rejects with an error
   */
  public readFleet = async (id: string): Promise<Fleet> => {
    this.query = `SELECT * FROM Fleet WHERE id='${id}'`

    return new Promise<Fleet>((resolve, reject) => {
      this.db.get(this.query, (err, row: Fleet) => {

        if (err) {
          reject(err)
          return
        }

        if (row === undefined) reject(new Error('Fleet not found !'))

        resolve(row)
      })
    })
  }
}

