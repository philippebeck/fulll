import crypto from 'crypto'
import { Fleet } from '../../Domain/Entities/Fleet'
import { FleetModel } from '../../Infra/Models/FleetModel'

/**
 * ! FLEET QUERY
 * * The fleet query class
 */
export class FleetQuery {

  /**
   * @property {FleetModel} fleetModel
   * * The fleet model instance
   */
  private fleetModel: FleetModel

  /**
   * @property {Fleet} fleet
   * * The fleet entity instance
   */
  private fleet: Fleet

  /**
   * @constructor
   * * Initializes a new instance of the FleetQuery class
   * 
   * @return {FleetQuery}
   *  The newly created FleetQuery instance
   */
  constructor() {
    this.fleetModel = new FleetModel()
    this.fleet      = new Fleet(crypto.randomUUID())
  }

  /**
   * ! SET FLEET
   * * Sets a new fleet for the given user
   *
   * @param {string} userId
   *  The ID of the user who owns the fleet
   *
   * @return {Promise<void>}
   *  A promise that resolves when the fleet is set
   */
  public setFleet = async (userId: string): Promise<void> => {

    await this.fleetModel.createFleet(this.fleet.getId(), userId)
  }

  /**
   * ! GET FLEET
   * * Gets a fleet with the given ID
   *
   * @return {Promise<Fleet>}
   *  A promise that resolves to the retrieved fleet object
   */
  public getFleet = (): Promise<Fleet> => {

    return this.fleetModel.readFleet(this.fleet.getId())
  }
}
