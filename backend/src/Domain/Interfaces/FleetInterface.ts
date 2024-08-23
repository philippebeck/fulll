/**
 * ! FLEET INTERFACE
 * * The fleet interface
 */
export interface FleetInterface {

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
   * ! GET ID
   * * Returns the id of the fleet
   *
   * @returns {string}
   *  The id of the fleet
   */
  getId(): string
}
