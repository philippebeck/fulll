import { UserQuery } from '../Queries/UserQuery'

/**
 * ! USER COMMAND
 * * The user command class
 */
export class UserCommand {

  /**
   * @property {UserQuery} userQuery
   * * The user query instance
   */
  private userQuery: UserQuery

  /**
   * @constructor
   * * Initializes a new instance of the UserCommand class
   * 
   * @return {UserCommand}
   *  The newly created UserCommand instance
   */
  constructor() {
    this.userQuery = new UserQuery()
  }

  /**
   * ! CREATE USER COMMAND
   * * Creates a new user & returns the user ID
   *
   * @return {string}
   *  A message indicating the user has been created, including the user ID
   */
  public createUserCmd = async (): Promise<string> => {

    await this.userQuery.setUser()
    const user = await this.userQuery.getUser()

    return `User created with ID: ${user.id}`
  }
}


