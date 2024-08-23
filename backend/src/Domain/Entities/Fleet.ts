import { FleetInterface } from "../Interfaces/FleetInterface";

/**
 * ! FLEET
 * * The fleet entity class
 */
export class Fleet implements FleetInterface {

  /**
   * @property {string} id
   * * The id of the fleet
   */
  readonly id: string

  /**
   * @property {string} userId
   * * The id of the user
   */
  readonly userId: string

  /**
   * @constructor
   * * Initializes a new instance of the Fleet class
   *
   * @param {string} id
   *  The id of the fleet
   * @param {string} userId
   *  The id of the user
   *
   * @returns {Fleet}
   *  The fleet
   */
  constructor(id: string, userId: string = '') {
    this.id     = id
    this.userId = userId
  }

  /**
   * ! GET ID
   * * Returns the id of the fleet
   *
   * @returns {string}
   *  The id of the fleet
   */
  public getId = (): string => {

    return this.id
  }
}
