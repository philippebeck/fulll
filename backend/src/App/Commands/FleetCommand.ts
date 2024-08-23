import { FleetQuery } from '../Queries/FleetQuery'

/**
 * ! FLEET COMMAND
 * * The fleet command class
 */
export class FleetCommand {

  /**
   * @property {FleetQuery} fleetQuery
   * * The fleet query instance
   */
  private fleetQuery: FleetQuery

  /**
   * @constructor
   * * Initializes a new instance of the FleetCommand class
   *
   * @return {FleetCommand}
   *  The newly created FleetCommand instance
   */
  constructor() {
    this.fleetQuery = new FleetQuery()
  }

  /**
   * ! CREATE FLEET COMMAND
   * * Creates a new fleet for the specified user & returns the fleet ID
   *
   * @param {string | undefined} userId
   *  The ID of the user creating the fleet
   *
   * @return {string}
   *  A message indicating the fleet has been created,
   *  including the fleet ID & the associated user ID
   */
  public createFleetCmd = async (userId: string | undefined): Promise<string> => {
    if (!userId) return 'Provide a userId !'

    await this.fleetQuery.setFleet(userId)
    const fleet = await this.fleetQuery.getFleet()

    return `
      Fleet created with ID: ${fleet.id} \n
      associated with user ID: ${fleet.userId}
    `
  }
}
