import crypto from 'crypto'
import { User } from '../../Domain/Entities/User'
import { UserModel } from '../../Infra/Models/UserModel'

/**
 * ! USER QUERY
 * * The user query class
 */
export class UserQuery {

  /**
   * @property {UserModel} userModel
   * * The user model instance
   */
  private userModel: UserModel

  /**
   * @property {User} user
   * * The user entity instance
   */
  private user: User

  /**
   * @constructor
   * * Initializes a new instance of the UserQuery class
   * 
   * @return {UserQuery}
   *  The newly created UserQuery instance
   */
  constructor() {
    this.userModel = new UserModel()
    this.user      = new User(crypto.randomUUID())
  }

  /**
   * ! SET USER
   * * Sets a new user with the given ID
   * 
   * @return {Promise<void>}
   *  A promise that resolves when the user is set
   */
  public setUser = async (): Promise<void> => {
    
    await this.userModel.createUser(this.user.getId())
  }

  /**
   * ! GET USER
   * * Gets a user with the given ID
   *
   * @return {Promise<User>}
   *  A promise that resolves to the retrieved user object
   */
  public getUser = (): Promise<User> => {

    return this.userModel.readUser(this.user.getId())
  }
}
