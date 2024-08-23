import { Given, Before } from '@cucumber/cucumber'

import { closeDB, createDB } from '../src/Infra/index'
import { FleetQuery } from '../src/App/Queries/FleetQuery'
import { UserQuery } from '../src/App/Queries/UserQuery'
import { VehicleQuery } from '../src/App/Queries/VehicleQuery'

Before(async function () {
  closeDB()
  await createDB(':memory:')

  this.fleetQuery   = new FleetQuery()
  this.userQuery    = new UserQuery()
  this.vehicleQuery = new VehicleQuery()

  this.anotherUserQuery    = new UserQuery()
  this.anotherFleetQuery   = new FleetQuery()
  this.anotherVehicleQuery = new VehicleQuery()

  await this.userQuery.setUser()
  this.user = await this.userQuery.getUser()
})

Given('my fleet', async function () {
  await this.fleetQuery.setFleet(this.user.id)
  this.fleet = await this.fleetQuery.getFleet()
})

Given('a vehicle', async function () {
  this.plateNumber = 'AA001AA'
})
