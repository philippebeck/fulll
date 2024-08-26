import { VehicleQuery } from '../Queries/VehicleQuery'

/**
 * ! VEHICLE COMMAND
 * * The vehicle command class
 */
export class VehicleCommand {

  /**
   * @property {VehicleQuery} vehicleQuery
   * * The vehicle query instance
   */
  private vehicleQuery: VehicleQuery

  /**
   * @constructor
   * * Initializes a new instance of the VehicleCommand class
   *
   * @return {VehicleCommand}
   *  The newly created VehicleCommand instance
   */
  constructor() {
    this.vehicleQuery = new VehicleQuery()
  }

  /**
   * ! REGISTER VEHICLE COMMAND
   * * Registers a new vehicle into the specified fleet & returns the vehicle ID
   *
   * @param {string | undefined} fleetId
   *  The ID of the fleet to register the vehicle into
   * @param {string | undefined} plateNumber
   *  The plate number of the vehicle to register
   *
   * @return {string}
   *  A message indicating the result of the registration, including the vehicle ID
   */
  public registerVehicleCmd = async (
    fleetId: string | undefined,
    plateNumber: string | undefined
  ): Promise<string> => {

    const plateRegex   = new RegExp(/^[A-Z0-9]{6,8}$/g)
    const plateMessage = 'The plate number must only contain alpha-numeric characters, between 6 & 8 length!'

    if (!fleetId || !plateNumber) return 'Please provide a fleetId & a vehicle plate number!'

    plateNumber = plateNumber.toUpperCase()

    if (!plateNumber.match(plateRegex)) return plateMessage

    await this.vehicleQuery.setVehicle(fleetId, plateNumber)
    const vehicle = await this.vehicleQuery.getVehicle(plateNumber)

    return `
      Vehicle: ${vehicle.plateNumber} \n 
      has been successfully registred to the fleet: ${vehicle.fleetId} \n 
      with ID: ${vehicle.id}
    `
  }

  /**
   * ! LOCALIZE VEHICLE COMMAND
   * * Localizes a vehicle in a fleet by its plate number & geographical coordinates
   *
   * @param {string | undefined} fleetId
   *  The ID of the fleet to localize the vehicle in
   * @param {string | undefined} plateNumber
   *  The plate number of the vehicle to localize
   * @param {string | undefined} lat
   *  The latitude of the vehicle's location
   * @param {string | undefined} lng
   *  The longitude of the vehicle's location
   *  @param {string | undefined} [alt="0"]
   *  The optional altitude of the vehicle's location, default is 0
   *
   * @return {string}
   *  A message indicating the result of the localization,
   *  including the vehicle ID, or an error message
   */
  public localizeVehicleCmd = async (
    fleetId: string | undefined, 
    plateNumber: string | undefined, 
    lat: string | undefined, 
    lng: string | undefined, 
    alt: string | undefined = "0"
  ): Promise<string> => {

    if (!fleetId || !plateNumber || !lat || !lng) {
      return 'Please provide a fleetId, a vehicle plate number, a latitude & a longitude!'
    }

    plateNumber = plateNumber.toUpperCase()

    const latitude  = parseFloat(lat.trim())
    const longitude = parseFloat(lng.trim())
    const altitude  = parseFloat(alt.trim())

    let message = ''

    if (latitude < -90   || latitude > 90)   message = 'Latitude must be between -90 & 90 degres!'
    if (longitude < -180 || longitude > 180) message = 'Longitude must be between -180 & 180 degres!'
    if (altitude < 0     || altitude > 6000) message = 'Altitude must be between 0 & 6000 meters!'

    if (message) return message

    const vehicle = await this.vehicleQuery.parkVehicle(plateNumber, latitude, longitude, altitude)

    return `
      Vehicle: ${vehicle.plateNumber} \n
      with ID: ${vehicle.id} \n
      has been localized @ => lat:${vehicle.lat}, lng:${vehicle.lng} & alt:${vehicle.alt}
    `
  }
}
