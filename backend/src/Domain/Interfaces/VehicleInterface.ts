/**
 * ! VEHICLE INTERFACE
 * * The vehicle interface
 */
export interface VehicleInterface {

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
   * ! GET ID
   * * Returns the id of the vehicle
   * 
   * @returns {string}
   *  The id of the vehicle
   */
  getId(): string
}
