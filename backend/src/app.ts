import { createDB } from './Infra'
import { UserCommand } from './App/Commands/UserCommand'
import { FleetCommand } from './App/Commands/FleetCommand'
import { VehicleCommand } from './App/Commands/VehicleCommand'

/**
 * ! RUN
 * * The main entry point of the application
 * * It initializes the database & processes the command
 *
 * @return {Promise<void>}
 *  A promise that resolves when the command has been processed
 */
const run = async (): Promise<void> => {
  const COMMAND = process.argv[2]
  const args    = process.argv.slice(3)

  await createDB('data.db')
  handleCommand(COMMAND, args).then((stdout) => console.log(stdout))
}

/**
 * ! HANDLE COMMAND
 * * Handles different commands related to fleet management
 *
 * @param {string | undefined} command
 *  The command to be executed
 * @param {string[]} args
 *  An array of arguments for the command
 *
 * @return {Promise<string | object>}
 *  A message or an object with the result of the command
 */
const handleCommand = async (command: string | undefined, args: string[]): Promise<string | object> => {
  const [ID, PLATE_NUM, LAT, LNG, ALT] = args

  const HELP = `
    This command does not exist! \n
    Type one of the following command to get a result : \n
    - "./fleet create-user" to create a user & to get a user ID \n
    - "./fleet create <userId>" or "./fleet create-fleet <userId>" to create a fleet & to get a fleet ID \n
    - "./fleet register-vehicle <fleetId> <plateNumber>" to register a vehicle in a fleet & to get a vehicle ID \n
    - "./fleet localize-vehicle <fleetId> <plateNumber> <lat> <lng> [alt]" to localize a vehicle & to get a localization confirmation \n
  `

  const userCommand    = new UserCommand()
  const fleetCommand   = new FleetCommand()
  const vehicleCommand = new VehicleCommand()

  switch (command) {
    case 'create-user': 
      return userCommand.createUserCmd()

    case 'create':
    case 'create-fleet':
      return fleetCommand.createFleetCmd(ID)

    case 'register-vehicle':
      return vehicleCommand.registerVehicleCmd(ID, PLATE_NUM)

    case 'localize-vehicle':
      return vehicleCommand.localizeVehicleCmd(ID, PLATE_NUM, LAT, LNG, ALT)

    default:
      return HELP
  }
}

run()
