const fs = require('fs')
const path = require('path')
const keys = require('./keys')
class Configuration {
  constructor () {
    if (Configuration.instance) return Configuration.instance
    this.envConfig = {}
    const { NODE_ENV = 'development' } = process.env
    const envFileVersion = NODE_ENV === 'test' ? '.env.test' : '.env'
    if (NODE_ENV && NODE_ENV !== 'production') {
      const envFilePath = path.join(__dirname, `../../${envFileVersion}`)
      const existsPath = fs.existsSync(envFilePath)
      if (!existsPath) {
        console.error(`${envFileVersion} file not exists`)
        process.exit(0)
      }
      require('dotenv').config({ path: envFilePath })
    }
    Object.values(keys).forEach((value) => {
      this.envConfig[value] = process.env[value]
    })
    Configuration.instance = this
  }

  get (key) {
    return this.envConfig[key]
  }
}

const instance = new Configuration()
Object.freeze(instance)

module.exports = instance
