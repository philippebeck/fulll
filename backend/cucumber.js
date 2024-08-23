module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['./features/*.ts'],
    worldParameters: {
      repository: 'default'
    }
  }
}
