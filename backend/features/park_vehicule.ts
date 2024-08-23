import assert from 'assert'
import { Given, When, Then } from '@cucumber/cucumber'

Given('a location', function () {
  this.location = { lat: 45, lng: 90, alt: 100 }
})

//* Scenario 1: Successfully park a vehicle

When('I park my vehicle at this location', async function () {
  try {
    this.result = await this.vehicleQuery.parkVehicle(this.plateNumber, this.location.lat, this.location.lng, this.location.alt)

  } catch (err) {
    this.errMessage = err.message
  }
})

Then('the known location of my vehicle should verify this location', async function () {
  this.result = await this.vehicleQuery.getVehicle(this.plateNumber)

  assert.strictEqual(this.result.lat, this.location.lat)
  assert.strictEqual(this.result.lng, this.location.lng)
  assert.strictEqual(this.result.alt, this.location.alt)
})

//* Scenario 2: Can't localize my vehicle to the same location two times in a row

Given('my vehicle has been parked into this location', async function () {
    await this.vehicleQuery.parkVehicle(this.plateNumber, this.location.lat, this.location.lng, this.location.alt)
    this.result = await this.vehicleQuery.getVehicle(this.plateNumber)

    assert.strictEqual(this.result.lat, this.location.lat)
    assert.strictEqual(this.result.lng, this.location.lng)
    assert.strictEqual(this.result.alt, this.location.alt)
})

When('I try to park my vehicle at this location', async function () {
  try {
    this.result = await this.vehicleQuery.parkVehicle(this.plateNumber, this.location.lat, this.location.lng, this.location.alt)

  } catch (err) {
    this.errMessage = err.message
  }
})

Then('I should be informed that my vehicle is already parked at this location', function () {
  assert.strictEqual(this.errMessage, 'Vehicle already parked at this location !')
})

