import crypto from 'crypto'
import { Vehicle } from '../../Domain/Entities/Vehicle'
import { VehicleModel } from '../../Infra/Models/VehicleModel'

/**
 * ! VEHICLE QUERY
 * * The vehicle query class
 */
export class VehicleQuery {

  /**
   * @property {VehicleModel} vehicleModel
   *  * The vehicle model instance
   */
  private vehicleModel: VehicleModel

  /**
   * @property {Vehicle} vehicle
   *  * The vehicle entity instance
   */
  private vehicle: Vehicle

  /**
   * @constructor
   * * Initializes a new instance of the VehicleQuery class
   *
   * @return {VehicleQuery}
   *  The newly created VehicleQuery instance
   */
  constructor() {
    this.vehicleModel = new VehicleModel()
    this.vehicle      = new Vehicle(crypto.randomUUID() as string)
  }

  /**
   * ! SET VEHICLE
   * * Sets a new vehicle & associates it with a fleet
   *
   * @param {string} fleetId
   *  The ID of the fleet the vehicle belongs to
   * @param {string} plateNumber
   *  The plate number of the vehicle
   *
   * @return {Promise<void>}
   *  A promise that resolves when the vehicle is created
   */
  public setVehicle = async (fleetId: string, plateNumber: string): Promise<void> => {
    try {
      const vehicleInFleet = await this.getVehicle(plateNumber)

      if (vehicleInFleet) throw new Error('Vehicle already in a fleet !')

    } catch (error) {
      if (error.message !== 'Vehicle not found !') throw error
    }

    await this.vehicleModel.createVehicle(this.vehicle.getId(), fleetId, plateNumber)
  }

  /**
   * ! GET VEHICLE
   * * Gets a vehicle with the given plate number
   *
   * @param {string} plateNumber
   *  The plate number of the vehicle
   *
   * @return {Promise<Vehicle>}
   *  The vehicle data
   */
  public getVehicle = async (plateNumber: string): Promise<Vehicle> => {
    const vehicle = await this.vehicleModel.readVehicle(plateNumber)

    return vehicle
  }

  /**
   * ! PARK VEHICLE
   * * Parks a vehicle in a specified location
   *
   * @param {string} plateNumber
   *  The plate number of the vehicle to localize
   * @param {number} lat
   *  The latitude of the vehicle's location
   * @param {number} lng
   *  The longitude of the vehicle's location
   *  @param {number} [alt=0]
   *  The optional altitude of the vehicle's location, default is 0
   *
   * @return {Vehicle}
   *  The updated vehicle data
   */
  public parkVehicle = async (
    plateNumber: string,
    lat: number,
    lng: number,
    alt = 0
  ): Promise<Vehicle> => {

    this.vehicle = await this.getVehicle(plateNumber)
    const error = new Error('Vehicle already parked at this location !')

    const IS_SAME_LAT = this.vehicle.lat === lat
    const IS_SAME_LNG = this.vehicle.lng === lng
    const IS_SAME_ALT = this.vehicle.alt === alt

    if (IS_SAME_LAT && IS_SAME_LNG && IS_SAME_ALT) throw error

    this.vehicle.lat = lat
    this.vehicle.lng = lng
    this.vehicle.alt = alt

    await this.vehicleModel.updateVehicle(this.vehicle)

    return this.vehicle
  }
}
