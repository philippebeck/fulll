import { VehicleInterface } from '../Interfaces/VehicleInterface'

/**
 * ! VEHICLE
 * * The vehicle entity class
 */
export class Vehicle implements VehicleInterface {

  /**
   * @property {string} id
   * * The id of the vehicle
   */
  readonly id: string

  /**
   * @property {string} fleetId
   * * The id of the fleet
   */
  readonly fleetId: string

  /**
   * @property {string} plateNumber
   * * The plate number of the vehicle
   */
  readonly plateNumber: string

  /**
   * @property {number | undefined} lat
   * * The latitude of the vehicle
   */
  lat?: number | undefined

  /**
   * @property {number | undefined} lng
   * * The longitude of the vehicle
   */
  lng?: number | undefined

  /**
   * @property {number | undefined} alt
   * * The altitude of the vehicle
   */
  alt?: number | undefined

  /**
   * @constructor
   * * Initializes a new instance of the Vehicle class
   *
   * @param {string} id
   *  The id of the vehicle
   * @param {string} fleetId
   *  The id of the fleet
   * @param {string} plateNumber
   *  The plate number of the vehicle
   *
   * @returns {Vehicle}
   *  The vehicle
   */
  constructor(id: string, fleetId = '', plateNumber = '') {
    this.id          = id
    this.fleetId     = fleetId
    this.plateNumber = plateNumber
  }

  /**
   * ! GET ID
   * * Returns the id of the vehicle
   * 
   * @returns {string}
   *  The id of the vehicle
   */
  public getId = (): string => {

    return this.id
  }
}
