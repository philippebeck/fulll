import { UserInterface } from '../../Domain/Interfaces/UserInterface'

/**
 * ! USER
 * * The user entity class
 */
export class User implements UserInterface {

  /**
   * @property {string} id
   * * The id of the user
   */
  readonly id: string

  /**
   * @constructor
   * * Initializes a new instance of the User class
   *
   * @param {string} id
   *  The id of the user
   *
   * @returns {User}
   *  The user
   */
  constructor(id: string) {
    this.id = id
  }

  /**
   * ! GET ID
   * * Returns the id of the user
   * 
   * @returns {string}
   *  The id of the user
   */
  public getId = (): string => {

    return this.id
  }
}
