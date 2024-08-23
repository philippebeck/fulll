/**
 * ! USER INTERFACE
 * * The user interface
 */
export interface UserInterface {

  /**
   * @property {string} id
   * * The id of the user
   */
  readonly id: string

  /**
   * ! GET ID
   * * Returns the id of the user
   * 
   * @returns {string}
   *  The id of the user
   */
  getId(): string
}
