import { MainModel } from './MainModel'
import { Vehicle } from '../../Domain/Entities/Vehicle'

/**
 * ! VEHICLE MODEL
 * * The vehicle model class
 */
export class VehicleModel extends MainModel {

  /**
   * ! CREATE VEHICLE
   * * Creates a new vehicle in the database
   *
   * @param {string} id
   *  The ID of the vehicle
   * @param {string} fleetId
   *  The ID of the fleet to which the vehicle belongs
   * @param {string} plateNumber
   *  The plate number of the vehicle to retrieve
   *
   * @return {Promise<void>}
   *  A promise that resolves when the vehicle entry is successfully created
   */
  public createVehicle = async (id: string, fleetId: string, plateNumber: string): Promise<void> => {

    this.query = `INSERT INTO Vehicle (id, fleetId, plateNumber) VALUES ($id, $fleetId, $plateNumber)`

    return new Promise<void>((resolve, reject) => {
      this.db.run(this.query, { $id: id, $fleetId: fleetId, $plateNumber: plateNumber }, (err) => {

        if (err) {
          reject(err)
          return
        }

        resolve()
      })
    })
  }

  /**
   * ! READ VEHICLE
   * * Reads a vehicle from the database by its fleet ID & plate number
   *
   * @param {string} plateNumber
   *  The plate number of the vehicle to retrieve
   *
   * @return {Promise<VehicleInterface>}
   *  A promise that resolves with the vehicle entry,
   *  or rejects with an error if the vehicle is not found
   */
  public readVehicle = async (plateNumber: string): Promise<Vehicle> => {

    this.query = `SELECT * FROM Vehicle WHERE plateNumber='${plateNumber}'`

    return new Promise<Vehicle>((resolve, reject) => {
      this.db.get(this.query, (err, row: Vehicle) => {

        if (err) {
          reject(err)
          return
        }

        if (row === undefined) {
          reject(new Error('Vehicle not found !'))
          return
        }

        resolve(row)
      })
    })
  }

  /**
   * ! UPDATE VEHICLE
   * * Updates a vehicle's location in the database
   *
   * @param {Vehicle} vehicle
   *  The vehicle object containing the vehicle's details
   *
   * @return {Promise<void>}
   *  A promise that resolves when the update is complete
   */
  public updateVehicle = async (vehicle: Vehicle): Promise<void> => {

    this.query = `UPDATE Vehicle SET
      lat='${vehicle.lat}',
      lng='${vehicle.lng}',
      alt='${vehicle.alt}'
      WHERE plateNumber='${vehicle.plateNumber}'
    `

    return new Promise<void>((resolve, reject) => {
      this.db.run(this.query, (err) => {

        if (err) {
          reject(err)
          return
        }

        resolve()
      })
    })
  }
}
