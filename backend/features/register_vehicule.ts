import assert from 'assert'
import { Given, When, Then } from '@cucumber/cucumber'

//* Scenario 1: I can register a vehicle

When('I register this vehicle into my fleet', async function () {
  try {
    await this.vehicleQuery.setVehicle(this.fleet.id, this.plateNumber)

  } catch (err) {
    this.errMessage = err.message
  }
})

Then('this vehicle should be part of my vehicle fleet', async function () {
  const vehicle = await this.vehicleQuery.getVehicle(this.plateNumber)

  assert.strictEqual(!!vehicle, true)
})

//* Scenario 2: I can't register a vehicle

Given('I have registered this vehicle into my fleet', async function () {
  await this.vehicleQuery.setVehicle(this.fleet.id, this.plateNumber)
  this.vehicle = await this.vehicleQuery.getVehicle(this.plateNumber)
})

When('I try to register this vehicle into my fleet', async function () {
  try {
    this.result = await this.vehicleQuery.setVehicle(this.fleet.id, this.plateNumber)

  } catch (err) {
    this.errMessage = err.message
  }
})

Then('I should be informed this this vehicle has already been registered into my fleet', function () {
  assert.strictEqual(this.errMessage, 'Vehicle already in a fleet !')
})

//* Scenario 3: Same vehicle can belong to more than one fleet

Given('the fleet of another user', async function () {
  await this.anotherUserQuery.setUser()
  this.anotherUser  = await this.anotherUserQuery.getUser()

  await this.anotherFleetQuery.setFleet(this.anotherUser.id)
  this.anotherFleet = await this.anotherFleetQuery.getFleet()
})

Given("this vehicle has been registered into the other user's fleet", async function () {
  await this.anotherVehicleQuery.setVehicle(this.anotherFleet.id, this.plateNumber)
  this.anotherVehicle = await this.anotherVehicleQuery.getVehicle(this.plateNumber)
})

When('I try to register this vehicle into my fleet as a second fleet', async function () {
  try {
    await this.anotherVehicleQuery.setVehicle(this.fleet.id, this.plateNumber)

  } catch (err) {
    this.errMessage = err.message
  }
})

Then('I should be informed this this vehicle has already been registered into a fleet', function () {
  assert.strictEqual(this.errMessage, 'Vehicle already in a fleet !')
})
